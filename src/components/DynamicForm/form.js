/**
 * created by simon on 2019/12/11
 * 动态表单
 * 上层传入表单基础数据和回填值，内部进行管理状态，onSubmit时，返回最终数据出去
 * 页面所有数据都在state.formFields进行内部管理，包括填充的值，请求接口返回的数据列表，操作formFields是关键
 * @props
 * formFields       [<Object>]      required
 * formValues      [<String>]
 * onSubmit         <Function>
 * customOnChange   <Object>
 * onValidateError  <Function>
 * */

import React, { useEffect, useReducer, useCallback } from 'react';
import { List, Toast, Checkbox, Radio, Modal, Calendar } from 'antd-mobile';
import { createForm } from 'rc-form';
import apis from './util/apis';
import {
    noop,
    getAsyncData,
    formatIt,
    handleChange,
    mergeLinkages,
    removeLinkages,
    getRelateOptions,
    isMultiSelectDate,
    getMultiDateValue,
    getDate,
    isEmptyObject,
} from './util/index';
import {
    reducer,
    initState,
    propTypes,
    defaultProps,
    getInitLinkagesData,
    refresh,
} from './util/data';
import formFieldsItem from './fieldsItem/form';
import linkagesFunc from './util/linkages';
import RefreshForm from './components/RefreshForm';

const alert = Modal.alert;
const { CheckboxItem } = Checkbox;
const { RadioItem } = Radio;
/**
 * 渲染表单项
 * @param options <Object> 数据
 * @param handler <Object> 回调函数集合
 */
function renderFieldItem(options, handler, form) {
    const { field, showOptionList } = options;
    const { fieldKey, fieldType, _config } = field;
    const Com = formFieldsItem[fieldType];
    if (fieldType === 3) {
        field._selectList =
            getRelateOptions(fieldKey, showOptionList, form) ||
            _config.selectList ||
            [];
    }
    return Com ? (
        <Com key={fieldKey} options={options} handler={handler} form={form} />
    ) : null;
}

function getModalTitle(text, confirm, close) {
    return (
        <div className="dynamic-form-modal-title">
            <span className="close-icon" onClick={close}></span>
            <p>{text}</p>
            <span className="confirm-icon" onClick={confirm}></span>
        </div>
    );
}

/**
 * 处理选择项的数据
 * @params payload <Object> 包含list / mode / modalContext / initialValue
 */

function changeSelectItems(payload) {
    const { list = [], mode, modalContext, initialValue } = payload;

    return list.map(item => ({
        ...item,
        mode,
        checked:
            mode === 'multiple'
                ? modalContext.value
                    ? modalContext.value.includes(item.value)
                    : false
                : item.value === initialValue,
    }));
}

// 弹出框滚动时 阻止 外层容器滚动
const handleStopRolling = event => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
};

/**
 * 动态表单
 * @param props
 * @returns {*}
 * @constructor
 */
// let a;

// const diff = (a, b) => {
//     if (!a || !b) return;
//     const c = [];
//     Object.keys(a).forEach(key => {
//         if (a[key] !== b[key]) {
//             c.push(key);
//         }
//     });
//     console.log(c);
// };

// let uid = 0;

function DynamicForm(props) {
    const {
        formRef,
        formFields,
        formValues,
        form,
        onSubmit = noop,
        onValidateError,
        observer,
        customControlRender,
        submitBtnRender,
        fieldsType,
        closePopUp,
    } = props;

    form.getFieldProps(refresh);
    const [state, dispatch] = useReducer(reducer, initState());
    const modalContext = state.modalContext;
    const reducerDataSource = state.dataSource || {};
    const calendar = state.calendar;
    const { expressionValue } = state;
    // 监测props传入的formFields变化时的处理
    // 用于初始化 数据， 包括：异步数据获取， 列表初始值设置，表达式联动配置项，
    useEffect(() => {
        let payload = formFields;
        const expression = {
            10.1: {},
            10.2: {},
        };
        try {
            const asyncList = [];
            payload._linkages = payload._linkages
                ? JSON.parse(payload.linkages)
                : [];

            payload._linkages.forEach(linkage => {
                const { linkageType, src, dist = [] } = linkage;
                const { fieldKey } = src;
                if (expression[linkageType]) {
                    if (!expression[linkageType][fieldKey]) {
                        expression[linkageType][fieldKey] = [];
                    }
                    expression[linkageType][fieldKey].push(...dist);
                }
            });

            if (payload.sectionList) {
                payload.sectionList = payload.sectionList.map(section => {
                    const { formFieldInfoList = [] } = section;
                    if (
                        section.labelShowTag === null ||
                        section.labelShowTag === undefined
                    ) {
                        section.labelShowTag = 1;
                    }
                    formFieldInfoList.forEach(item => {
                        item._config =
                            item._config || JSON.parse(item.config) || {};
                        const { fieldKey, _config = {} } = item;
                        const {
                            selectList,
                            selectListFieldNames = {},
                        } = _config;
                        const { value, label } = selectListFieldNames;
                        if (formValues && formValues[fieldKey] !== undefined) {
                            item.initialValue = formValues[fieldKey];
                            if (fieldsType[fieldKey] === 3) {
                                item._labelInitialValue =
                                    formValues[`${fieldKey}Label`];
                            }
                        }
                        // 下拉列表时候  添加 label 值
                        if (
                            fieldsType[fieldKey] === 3 &&
                            item._labelInitialValue === undefined &&
                            item.initialValue !== undefined &&
                            selectList &&
                            selectList.length
                        ) {
                            for (let i = 0; i < selectList.length; i++) {
                                if (
                                    selectList[i][value] === item.initialValue
                                ) {
                                    item._labelInitialValue =
                                        selectList[i][label];
                                }
                            }
                        }

                        if (item.initialValue === null) {
                            item.initialValue = undefined;
                        }
                        if (
                            item.labelShowTag === null ||
                            item.labelShowTag === undefined
                        ) {
                            item.labelShowTag = 1;
                        }
                        const { selectionsType } = item._config;
                        if (
                            +selectionsType === 2 &&
                            !isEmptyObject(fieldsType)
                        ) {
                            asyncList.push(
                                getAsyncData(item._config).then(list => ({
                                    list,
                                    item,
                                })),
                            );
                        }
                    });
                    return section;
                });
            } else {
                payload.sectionList = [];
            }
            // 异步列表所有数据返回后  刷新
            if (asyncList && asyncList.length) {
                Promise.all(asyncList).finally(() => {
                    dispatch({ type: 'refresh' });
                });
            }
        } catch (err) {
            payload = formFields;
        }
        dispatch({
            type: 'setDataSource',
            payload: {
                ...payload,
            },
        });
        dispatch({
            type: 'setExpression',
            payload: expression,
        });
    }, [fieldsType, formFields, formValues]);

    // 获取可显示 字段对象
    const getShowFields = useCallback(() => {
        const { hiddenList, hiddenGroupNameList } = state.linkagesData;
        const { sectionList = [] } = reducerDataSource;
        const fields = {};
        sectionList.forEach(section => {
            const { formFieldInfoList = [], name } = section;
            if (hiddenGroupNameList.includes(name)) return;
            formFieldInfoList.forEach(formFieldInfo => {
                const isHiddenRendering =
                    formFieldInfo._config &&
                    formFieldInfo._config.hiddenRendering;

                if (
                    hiddenList.includes(formFieldInfo.fieldKey) &&
                    !isHiddenRendering
                )
                    return;
                fields[formFieldInfo.fieldKey] = formFieldInfo;
            });
        });
        return fields;
        // setShowFields;
    }, [reducerDataSource, state.linkagesData]);

    // 数据格式化
    const getFormatValue = useCallback(
        (values, isFilterNo = true) => {
            const fields = getShowFields();
            return Object.keys(values)
                .map(key => {
                    const labelKey = `${key}Label`;
                    const item = fields[key];
                    if (!item) return undefined;
                    // 是否过滤空值
                    if (
                        isFilterNo &&
                        (values[key] === undefined || values[key] === null)
                    )
                        return undefined;
                    let value = values[key];
                    const { fieldType, _config = {} } = item;
                    const { format = 'YYYY-MM-DD' } = _config;
                    /**
                     * fieldType :
                     *             1 Input框
                     *             2 文本域
                     *             3 单选|多选|单选异步|多选异步|关联异步
                     *             4 数字输入框
                     *             5 时间日期选择
                     *             8 多选框 (checkbox)
                     *             9 单选(radio)
                     *            11 图片上传
                     *
                     */

                    if (fieldType === 4) {
                        value = values[key] ? Number(values[key]) : undefined;
                    } else if (fieldType === 5) {
                        const bool = isMultiSelectDate(format);
                        if (bool) {
                            value = getMultiDateValue(
                                values[key],
                                format,
                                false,
                            );
                        } else {
                            value = formatIt(values[key], format);
                        }
                    } else if ([3, 8, 9].includes(fieldType)) {
                        return {
                            [key]: value,
                            [labelKey]: values[labelKey],
                        };
                    }
                    const params = { [key]: value };
                    if (labelKey && values[labelKey]) {
                        params[labelKey] = values[labelKey];
                    }
                    return params;
                })
                .filter(value => value)
                .reduce(
                    (obj, item) => ({
                        ...obj,
                        ...item,
                    }),
                    {},
                );
        },
        [getShowFields],
    );

    // 获取所有 field 类型 （ fieldKey：fieldType）
    const getFormFieldType = useCallback(() => {
        const fieldKey = {};
        const { sectionList = [] } = reducerDataSource;
        sectionList.forEach(item => {
            const formFieldInfoList = item.formFieldInfoList || [];
            formFieldInfoList.forEach(formField => {
                fieldKey[formField.fieldKey] = formField;
            });
        });
        return fieldKey;
    }, [reducerDataSource]);

    // 校验表达式 与  运算表达式
    useEffect(() => {
        observer.on('form-change-expression', ({ changed, formValue }) => {
            const expressionObj = {};
            const formFieldType = getFormFieldType();
            const { setFieldsValue } = form;
            const expression = state.expression;
            const context = getFormatValue(formValue, false);

            Object.keys(expression['10.1'] || {}).forEach(key => {
                if (changed[key]) {
                    const list = expression['10.1'][key];
                    list.forEach(item => {
                        const { expressionContent, fields = [] } = item;
                        const { apiUrl, expression } = expressionContent;
                        apis.fetchDynamicUri({
                            url: apiUrl,
                            params: {
                                context,
                                exp: expression,
                            },
                        }).then(response => {
                            if (!response || response.code !== 0) return;
                            const data = response.data;
                            if (data === undefined || data === null) return;
                            if (typeof data === 'object') {
                                const setValue = {};
                                Object.keys(data).forEach(key => {
                                    // 时间选择格式化
                                    const value =
                                        formFieldType[key].fieldType === 5
                                            ? Array.isArray(data[key])
                                                ? data[key].length >= 2
                                                    ? [
                                                          getDate(data[key][0]),
                                                          getDate(data[key][1]),
                                                      ]
                                                    : []
                                                : getDate(data[key])
                                            : data[key];
                                    // eslint-disable-next-line no-prototype-builtins
                                    if (context.hasOwnProperty(key)) {
                                        setValue[key] = value;
                                    }
                                    expressionObj[key] = value;
                                });
                                setFieldsValue(setValue);
                                dispatch({
                                    type: 'setExpressionValue',
                                    payload: {
                                        ...expressionValue,
                                        ...expressionObj,
                                    },
                                });
                                return;
                            }
                            if (fields && fields.length) {
                                const params = {};
                                fields.forEach(field => {
                                    params[field.fieldKey] = data;
                                });
                                setFieldsValue(params);
                            }
                        });
                    });
                }
            });
            // Object.keys(expression['10.2']).forEach((key) => {
            //     if (changed[key]) {
            //         const list = expression['10.2'][key];
            //         list.forEach((item) => {
            //             const { expressionContent, fields } = item;
            //             const { apiUrl, expression } = expressionContent;
            //             apis.fetchDynamicUri('POST', apiUrl, {
            //                 context,
            //                 expression,
            //             }).then((data) => {});
            //         });
            //     }
            // });
        });
    }, [
        state.expression,
        form,
        observer,
        getFormatValue,
        getFormFieldType,
        expressionValue,
    ]);

    // 设置联动配置项函数
    const getLinkagesData = useCallback(
        (formValue, type) => {
            // const { getFieldsValue } = form;
            const linkages = reducerDataSource._linkages || [];
            const values = formValue;
            const initLinkages = getInitLinkagesData();
            const { sectionList = [] } = reducerDataSource;
            // 默认隐藏 加入隐藏列表
            sectionList.forEach(item => {
                const formFieldInfoList = item.formFieldInfoList || [];
                if (item.hidden) {
                    initLinkages.hiddenGroupNameList.push(item.name);
                }
                formFieldInfoList.forEach(formField => {
                    if (formField.hidden) {
                        initLinkages.hiddenList.push(formField.fieldKey);
                    }
                });
            });
            linkages.forEach(item => {
                const { linkageType, src } = item;
                const value = values[src.fieldKey];
                if (!linkagesFunc[linkageType]) return;
                const list = linkagesFunc[linkageType](
                    src.fieldKey,
                    value,
                    item.dist || [],
                );
                // 5.4 ， 5.3 标识联动显示， 在隐藏列表移除
                if (['5.4', '5.3'].includes(linkageType)) {
                    removeLinkages(initLinkages, list, linkageType);
                } else {
                    mergeLinkages(initLinkages, list, linkageType);
                }
            });
            if (linkages) {
                dispatch({
                    type: 'setLinkagesData',
                    payload: initLinkages,
                });
            }
        },
        [reducerDataSource],
    );

    // 表单变化更新联动配置信息
    useEffect(
        preState => {
            // 表单值修改后触发
            // observer.on('form-change', ({ changed, formValue }) => {
            getLinkagesData(form.getFieldsValue(), 'form-change');
            // });
        },
        [form, getLinkagesData],
    );

    // 获取表单值(不校验)
    const getFormData = useCallback(() => {
        const { getFieldsValue } = form;
        return getFormatValue(getFieldsValue());
    }, [form, getFormatValue]);

    // 获取表单值(校验)
    const getValidateFormData = useCallback(() => {
        const { validateFields } = form;
        let data;
        validateFields((errors, values) => {
            if (errors) {
                let errMessage;
                try {
                    // TODO 暂时未用到多层级嵌套，先这么取错误信息
                    errMessage = errors[Object.keys(errors)[0]].errors[0];
                } catch (err) {
                    errMessage = { field: '', message: '错误' };
                }
                if (onValidateError && typeof onValidateError === 'function') {
                    onValidateError(errMessage);
                } else {
                    Toast.fail(errMessage.message, 1.5);
                }
                return;
            }
            data = getFormatValue(values);
        });
        return data;
    }, [form, getFormatValue, onValidateError]);

    // 默认提交动作
    const handleSubmit = useCallback(
        submitValue => {
            submitValue = submitValue || getValidateFormData();
            if (!submitValue) return;
            onSubmit(submitValue, reducerDataSource);
        },
        [getValidateFormData, onSubmit, reducerDataSource],
    );

    // 提交确认弹窗
    const handleAffirmSubmit = useCallback(() => {
        const data = getValidateFormData();
        if (!data) return;
        alert('请仔细核对信息', '', [
            { text: '重填', style: 'default' },
            {
                text: '确认提交',
                onPress: () => {
                    handleSubmit(data);
                },
            },
        ]);
    }, [handleSubmit, getValidateFormData]);

    // modal框 关闭
    const handleModalToggle = () => {
        const modalContext = {
            modalVisible: false,
        };
        dispatch({
            type: 'modalContext',
            payload: { modalContext },
        });
    };

    // modal框确认回调
    const handleModalOk = () => {
        const { value, _label, key } = state.modalContext;
        // handleSelectFormChange(value, key, _label, field);
        handleChange(value, key, form);
        handleChange(_label, `${key}Label`, form);
        handleModalToggle();
    };

    // modal框中，选择项点击选择的回调
    // @param index <Number> 选中那一项的下标
    // @param type <String> 类型：单选还是多选 single | multiple
    const handleModalItemSelect = useCallback(
        (index, type) => {
            const modalContext = state.modalContext
                ? { ...state.modalContext }
                : {};
            const { content } = modalContext;
            if (type === 'multiple') {
                content[index].checked = !content[index].checked;
                modalContext.value = content
                    .filter(item => item.checked)
                    .map(item => item.value);
                modalContext._label = content
                    .filter(item => item.checked)
                    .map(item => item.label);
            } else {
                const isSame = modalContext.value === content[index].value;
                modalContext.value = isSame ? undefined : content[index].value;
                modalContext._label = isSame ? undefined : content[index].label;
            }
            dispatch({
                type: 'modalContext',
                payload: { modalContext },
            });
        },
        [state, dispatch],
    );

    // 表单中选择类型的出发回调
    // @param options <Object> 包含字段的一些信息
    // @param payload <Object> 参数
    const handleSelect = useCallback(
        (options, form) => {
            const { getFieldValue } = form;
            const { field, showOptionList } = options;
            const currentValue = getFieldValue(field.fieldKey);
            const currentValueLabel = getFieldValue(`${field.fieldKey}Label`);
            const config = field._config;
            const { mode } = config;

            const selectList =
                getRelateOptions(field.fieldKey, showOptionList, form) ||
                config.selectList;
            const modalContext = {
                key: field.fieldKey,
                modalVisible: true,
                value: currentValue,
                mode: mode || 'single',
                header: field.label,
                field,
                _label: currentValueLabel,
            };
            const params = {
                mode: modalContext.mode,
                initialValue: getFieldValue(field.fieldKey),
                modalContext,
            };
            modalContext.content = changeSelectItems(
                Object.assign(params, {
                    list: selectList,
                }),
            );
            dispatch({
                type: 'modalContext',
                payload: { modalContext },
            });
        },
        [dispatch],
    );
    // 日期隐藏
    const handleCalendarCancel = useCallback(() => {
        dispatch({
            type: 'setCalendar',
            payload: {
                visible: false,
            },
        });
    }, [dispatch]);

    // 日期显示
    const handleCalendarVisible = useCallback(
        payload => {
            dispatch({
                type: 'setCalendar',
                payload: {
                    ...payload,
                    visible: true,
                },
            });
        },
        [dispatch],
    );

    // 设置时间
    const handleCalendarConfirm = useCallback(
        (start, end) => {
            const { fieldKey } = calendar;
            const { setFieldsValue } = form;
            setFieldsValue({
                [fieldKey]: [start, end],
            });
            handleCalendarCancel();
        },
        [calendar, form, handleCalendarCancel],
    );

    // 组装回调对象
    const handler = {
        handleModalToggle,
        handleModalOk,
        handleModalItemSelect,
        handleSelect,
        handleCalendarConfirm,
        handleCalendarVisible,
    };
    const { sectionList = [] } = reducerDataSource;
    const {
        disabledList,
        requiredList,
        notRequiredList,
        hiddenList,
        usableList,
        showOptionList,
        hiddenGroupNameList,
    } = state.linkagesData;

    formRef.current = {
        form,
        // 获取校验后 格式化的值
        getValidateFormData,
    };

    return (
        <div className="dynamic-form-module-wrap">
            {sectionList.map((item, parentIndex) => {
                const { id, name, labelShowTag, formFieldInfoList = [] } = item;
                if (hiddenGroupNameList.includes(name)) return null;

                const showList = formFieldInfoList
                    .map(field => {
                        const { fieldKey } = field;
                        field._isHiddenRendering = false;
                        const isInclude = hiddenList.includes(fieldKey);
                        const isHiddenRendering =
                            field._config && field._config.hiddenRendering;
                        if (isHiddenRendering && isInclude) {
                            field._isHiddenRendering = true;
                        }
                        // 返回项 为 强制渲染的  或者非隐藏的
                        return isHiddenRendering || !isInclude
                            ? field
                            : undefined;
                    })
                    .filter(Boolean);

                return showList && showList.length ? (
                    <div key={id} className={'dynamic-form-list'}>
                        {labelShowTag ? (
                            <div className="dynamic-form-list-title">
                                <span className="important-title">{name}</span>
                            </div>
                        ) : null}
                        <List key={id}>
                            {showList.map((field, index) => {
                                const {
                                    fieldKey,
                                    disabled,
                                    required,
                                    _isHiddenRendering,
                                } = field;
                                // 先判断是否为 联动禁用
                                // 再判断是否为 联动不禁用
                                // 最后是自身携带的 是否禁用
                                field._disabled = disabledList.includes(
                                    fieldKey,
                                )
                                    ? true
                                    : usableList.includes(fieldKey)
                                    ? false
                                    : !!disabled;
                                field._required = requiredList.includes(
                                    fieldKey,
                                )
                                    ? true
                                    : notRequiredList.includes(fieldKey)
                                    ? false
                                    : !!required;
                                return (
                                    <div
                                        key={fieldKey}
                                        className={
                                            _isHiddenRendering
                                                ? 'dynamic-form-list-item-none'
                                                : ''
                                        }
                                    >
                                        {renderFieldItem(
                                            {
                                                field,
                                                formValues,
                                                parentIndex,
                                                index,
                                                requiredList,
                                                usableList,
                                                customControlRender,
                                                showOptionList,
                                                expressionValue,
                                                formField: reducerDataSource,
                                                closePopUp,
                                            },
                                            handler,
                                            form,
                                        )}
                                    </div>
                                );
                            })}
                        </List>
                    </div>
                ) : null;
            })}
            {sectionList && sectionList.length ? (
                submitBtnRender && typeof submitBtnRender === 'function' ? (
                    submitBtnRender(onSubmit, getValidateFormData, getFormData)
                ) : (
                    <footer className="dynamic-form-module-submit">
                        {/* () => handleSubmit() */}
                        <button onClick={handleAffirmSubmit}>提交</button>
                    </footer>
                )
            ) : null}
            <Modal
                className="dynamic-form-modal"
                key={modalContext.key}
                popup
                maskClosable={true}
                visible={modalContext && modalContext.modalVisible}
                onClose={handleModalToggle}
                animationType="slide-up"
                afterClose={modalContext && modalContext.afterClose}
            >
                <List
                    renderHeader={() =>
                        getModalTitle(
                            modalContext.header,
                            handleModalOk.bind(null, state),
                            handleModalToggle,
                        )
                    }
                    onScroll={handleStopRolling}
                    className="popup-list"
                >
                    {modalContext.content && modalContext.content.length ? (
                        modalContext.content.map((item, index) => {
                            const { mode, id, label, value } = item;
                            return mode === 'multiple' ? (
                                <CheckboxItem
                                    key={id}
                                    checked={
                                        modalContext.value &&
                                        modalContext.value.includes(value)
                                    }
                                    onChange={handler.handleModalItemSelect.bind(
                                        null,
                                        index,
                                        'multiple',
                                    )}
                                >
                                    {label}
                                </CheckboxItem>
                            ) : (
                                <RadioItem
                                    key={id}
                                    checked={value === modalContext.value}
                                    onClick={
                                        () => {
                                            const { key } = state.modalContext;
                                            handleChange(value, key, form);
                                            handleChange(
                                                label,
                                                `${key}Label`,
                                                form,
                                            );
                                            handleModalToggle();
                                        }
                                        // handler.handleModalItemSelect.bind(null, index, 'single')
                                    }
                                >
                                    <p className="text-center">{label}</p>
                                </RadioItem>
                            );
                        })
                    ) : (
                        <div className="no-select">当前无选项</div>
                    )}
                </List>
            </Modal>
            <Calendar
                type="range"
                visible={calendar.visible}
                pickTime={calendar.pickTime}
                // locale={true}
                // defaultTimeValue={calendar.initialValue}
                defaultValue={calendar.initialValue}
                onConfirm={handleCalendarConfirm}
                onCancel={handleCalendarCancel}
                // onSelect={handleCalendarSelect}
                defaultTimeValue={calendar.startTime}
                // defaultTimeValue={new Date('2010-01-01 16:00:00')}
            />
            <RefreshForm form={form} />
        </div>
    );
}

DynamicForm.propTypes = propTypes;
DynamicForm.defaultProps = defaultProps;
/**
 * fieldType :
 *             1 Input框
 *             2 文本域
 *             3 单选|多选|单选异步|多选异步|关联异步
 *             4 数字输入框
 *             5 时间日期选择
 *             8 多选框 (checkbox)
 *             9 单选(radio)
 *            11 图片上传
 *            21 选人
 *
 */
let timerId;
export default createForm({
    onValuesChange: (props, changed = {}, formValue) => {
        const keys = Object.keys(changed);
        const {
            observer,
            fieldsType,
            customOnChange,
            form,
            formFieldMap,
        } = props;
        console.log(props);
        if (observer) {
            let isEmitExpression = false;
            keys.forEach(key => {
                // Input框 文本域 数字输入框 ;  触发表达式改成延时触发
                if (
                    fieldsType[key] !== 1 &&
                    fieldsType[key] !== 2 &&
                    fieldsType[key] !== 4
                ) {
                    isEmitExpression = true;
                }
            });
            if (isEmitExpression) {
                observer.emit('form-change-expression', { changed, formValue });
            } else {
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    observer.emit('form-change-expression', {
                        changed,
                        formValue,
                    });
                }, 1000);
            }
        }
        customOnChange &&
            keys.forEach(key => {
                if (
                    customOnChange[key] &&
                    typeof customOnChange[key] === 'function'
                ) {
                    const field = formFieldMap[key];
                    const isList = field.fieldType === 3;
                    const selectList =
                        (field._config && field._config.selectList) || [];
                    customOnChange[key](changed[key], formValue, form, {
                        selectList: isList ? selectList : undefined,
                    });
                }
            });
    },
})(DynamicForm);
