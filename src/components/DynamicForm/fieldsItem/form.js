/* eslint-disable */
import React, { useState, useCallback } from 'react';
import {
    List,
    InputItem,
    DatePicker,
    TextareaItem,
    Button,
    Toast,
} from 'antd-mobile';
import Upload from '../components/Upload/index';
import svg from '../util/svg';
// import zTool from 'zerod/components/zTool';
import SelectPerson from '../components/SelectPerson/index';
import SelectDepartment from '../components/SelectDepartment/index';
import Map from '../components/Map/index';
import CommonComment from '../components/CommonComment/index';
import {
    getDateMode,
    formatIt,
    handleChange,
    isMultiSelectDate,
    getMultiDateValue,
    getTimeInit,
    getClassName,
    requireSpan,
    getTimeRange,
} from '../util/index';

const { Item } = List;

const numReg = /^[0-9]+\.?[0-9]*$/;
const numReplaceReg = /^[0-9]+\.?[0-9]*/;

const timerIdObj = {};
const timeRange = getTimeRange(40);

const getSelectPlacehoder = (text = '请选择') => (
    <span className="dynamic-form-select-placehoder">{text}</span>
);

// const validatorHandle = (reg, msg) => {
//     return (rule, value, callback) => {
//         if (!str) return callback()
//         reg = new RegExp(reg)
//         if (reg.test(value)) return callback()
//         callback(new Error(msg))
//     }
// }
//   const validateTel = (rule, value, callback) => {
//     if (value && value.length===13) {
//         callback();
//     } else if(value.length===0){
//         callback(new Error('请输入电话号码'));
//     } else {
//         callback(new Error('电话号码不合法'));
//     }
// }
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
 *            13 地图选点
 *            14 自定义
 *            21 选人
 *
 */
export default {
    1: ({ options, handler, form }) => {
        // 单行文本
        const { getFieldProps, setFieldsValue, getFieldValue } = form;
        const { field, expressionValue, formField } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            label,
            placeholder,
            _disabled,
            _required,
            _config,
            regularExpression,
            errorMsg,
        } = field;
        const {
            maxLength = 50,
            minLength = 0,
            type = 'text',
            frequentWordKey,
        } = _config;

        const rules = [{ required: !!_required, message: `${label}为必填` }];

        if (minLength > 0) {
            rules.push({
                min: minLength,
                message: `请输入至少${minLength}个字`,
            });
        }

        const [commentFlag, setFlag] = useState(false);
        const handleConfirmCommentClick = useCallback(
            value => {
                const d = getFieldValue(fieldKey);
                setFieldsValue({
                    [fieldKey]: d ? `${d}\n${value}` : value,
                });
            },
            [setFieldsValue, getFieldValue, fieldKey],
        );
        const toggle = useCallback(() => {
            setFlag(!commentFlag);
        }, [setFlag, commentFlag]);

        const onBlur = useCallback(() => {
            const { getFieldValue, setFieldsValue } = form;
            let value = getFieldValue(fieldKey);
            if (value === '' || value === undefined) return;

            if (regularExpression) {
                const reg = new RegExp(regularExpression);

                if (!reg.test(value)) {
                    Toast.fail(errorMsg || '数据格式不正确');
                    setFieldsValue({
                        [fieldKey]: undefined,
                    });
                }
            }
        }, [fieldKey, form]);

        return (
            <div
                className={`${
                    frequentWordKey ? 'frequent-word-input-key' : ''
                } ${_disabled ? 'dynamic-form-disable' : ''} pr`}
            >
                <InputItem
                    key={fieldKey}
                    disabled={_disabled}
                    type={type}
                    maxLength={maxLength}
                    onBlur={onBlur}
                    placeholder={_disabled ? '' : placeholder || '请输入'}
                    {...getFieldProps(fieldKey, {
                        initialValue: expressionValue[fieldKey] || initialValue,
                        rules,
                    })}
                >
                    <span className={getClassName(labelShowTag)}>
                        {_required ? requireSpan : null}
                        {labelShowTag ? label : null}
                    </span>
                </InputItem>
                {frequentWordKey ? (
                    <div className={'input-btns'}>
                        <Button
                            className={'input-btn'}
                            type="button"
                            onClick={toggle}
                        >
                            常用语
                        </Button>
                        <CommonComment
                            formFieldName={formField.name}
                            fieldKey={fieldKey}
                            presetKey={frequentWordKey}
                            show={commentFlag}
                            onCancel={toggle}
                            onConfirm={handleConfirmCommentClick}
                        />
                    </div>
                ) : null}
            </div>
        );
    },
    2: ({ options, handler, form }) => {
        // 多行文本
        const { getFieldProps, setFieldsValue, getFieldValue } = form;
        const { field, expressionValue, formField, closePopUp } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            label,
            placeholder,
            _disabled,
            _required,
            _config,
        } = field;
        const { maxLength = 0, frequentWordKey } = _config;
        const title = (
            <span className={getClassName(labelShowTag, 'color555')}>
                {_required ? requireSpan : null}
                {labelShowTag ? label : null}
            </span>
        );
        const [commentFlag, setFlag] = useState(false);
        const handleConfirmCommentClick = useCallback(
            value => {
                const d = getFieldValue(fieldKey);
                setFieldsValue({
                    [fieldKey]: d ? `${d}\n${value}` : value,
                });
            },
            [setFieldsValue, getFieldValue, fieldKey],
        );
        const toggle = useCallback(() => {
            setFlag(!commentFlag);
        }, [setFlag, commentFlag]);
        return (
            <div
                className={`${frequentWordKey ? 'frequent-word-key' : ''} ${
                    _disabled ? 'dynamic-form-disable' : ''
                } pr`}
            >
                <TextareaItem
                    key={fieldKey}
                    disabled={_disabled}
                    autoHeight
                    // rows={5}
                    title={title}
                    count={maxLength}
                    placeholder={placeholder}
                    {...getFieldProps(fieldKey, {
                        initialValue: expressionValue[fieldKey] || initialValue,
                        rules: [
                            { required: _required, message: `${label}为必填` },
                        ],
                    })}
                ></TextareaItem>
                {frequentWordKey ? (
                    <div className={'textarea-btns'}>
                        <Button
                            className={'textarea-btn'}
                            type="button"
                            onClick={toggle}
                        >
                            常用语
                        </Button>
                        <CommonComment
                            formFieldName={formField.name}
                            fieldKey={fieldKey}
                            presetKey={frequentWordKey}
                            show={commentFlag}
                            onCancel={toggle}
                            onConfirm={handleConfirmCommentClick}
                        />
                    </div>
                ) : null}
            </div>
        );
    },
    3: ({ options, handler, form }) => {
        // 单选|多选|单选异步|多选异步|关联异步
        const { getFieldProps, getFieldValue, setFieldsValue } = form;
        const { field, expressionValue } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            _labelInitialValue,
            label,
            _required,
            _config,
            _disabled,
            _selectList,
        } = field;
        const { mode, selectionsType, notFoundContent } = _config;
        const labelKey = `${fieldKey}Label`;

        const findIndex = _selectList.findIndex(
            data => data.value === (expressionValue[fieldKey] || initialValue),
        );

        getFieldProps(fieldKey, {
            initialValue:
                findIndex !== -1
                    ? expressionValue[fieldKey] || initialValue
                    : undefined,
            rules: [{ required: _required, message: `${label}为必填` }],
        });
        getFieldProps(labelKey, {
            initialValue: _labelInitialValue,
        });
        let labelValue = getFieldValue(labelKey);
        const value = getFieldValue(fieldKey);
        if (
            value &&
            _selectList &&
            _selectList.length &&
            !labelValue &&
            !timerIdObj[labelKey]
        ) {
            clearTimeout(timerIdObj[labelKey]);
            // 初次 设置默认显示的label
            let initialValues;
            let initialLabelValue;
            if (mode === 'multiple') {
                initialValues = initialValue || [];
                initialLabelValue = _selectList
                    .filter(data => initialValues.includes(data.value))
                    .map(data => data.label);
            } else {
                initialValues = initialValue;
                initialLabelValue = _selectList
                    .filter(data => initialValues === data.value)
                    .map(data => data.label)
                    .join('，');
            }

            timerIdObj[labelKey] = setTimeout(() => {
                delete timerIdObj[labelKey];
                setFieldsValue({
                    [labelKey]: initialLabelValue,
                });
            });
        }

        if (
            +selectionsType === 2 &&
            _required &&
            !value &&
            _selectList &&
            _selectList.length
        ) {
            let initialValues;
            let initialLabelValue;
            const selectListItem = _selectList[0];
            if (mode === 'multiple') {
                initialValues = [selectListItem.value];
                initialLabelValue = [selectListItem.label];
            } else {
                initialValues = selectListItem.value;
                initialLabelValue = selectListItem.label;
            }

            timerIdObj[labelKey] = setTimeout(() => {
                delete timerIdObj[labelKey];
                setFieldsValue({
                    [fieldKey]: initialValues,
                    [labelKey]: initialLabelValue,
                });
            });
        }
        if (mode === 'multiple') {
            if (!labelValue) {
                labelValue = [];
            }
            labelValue = labelValue.join('，');
        }
        return (
            <Item
                key={fieldKey}
                extra={labelValue || getSelectPlacehoder()}
                arrow={_disabled ? 'empty' : 'horizontal'}
                onClick={() =>
                    _disabled ? null : handler.handleSelect(options, form)
                }
            >
                <span className={getClassName(labelShowTag)}>
                    {_required ? requireSpan : null}
                    {labelShowTag ? label : null}
                </span>
            </Item>
        );
    },
    4: ({ options, handler, form }) => {
        // 数字输入框
        const { getFieldProps, getFieldValue, setFieldsValue } = form;
        const { field, expressionValue } = options;
        const {
            labelShowTag,
            fieldKey,
            placeholder,
            initialValue,
            errorMsg,
            label,
            regularExpression,
            _disabled,
            _required,
            _config,
        } = field;
        const { min, max } = _config;
        const rules = [{ required: _required, message: `${label}为必填` }];

        const formData = getFieldProps(fieldKey, {
            initialValue: expressionValue[fieldKey] || initialValue,
            rules,
        });

        const onBlur = useCallback(() => {
            const { getFieldValue, setFieldsValue } = form;
            let value = getFieldValue(fieldKey);
            if (value === '' || value === undefined) return;

            if (!numReg.test(value)) {
                value = (numReplaceReg.exec(value) || [0])[0];
                setFieldsValue({
                    [fieldKey]: value,
                });
            }

            if (
                (max !== undefined && value > max) ||
                (min !== undefined && value < min)
            ) {
                setFieldsValue({
                    [fieldKey]: undefined,
                });
                return;
            }
            if (regularExpression) {
                const reg = new RegExp(regularExpression);

                if (!reg.test(value)) {
                    Toast.fail(errorMsg || '数据格式不正确');
                    setFieldsValue({
                        [fieldKey]: undefined,
                    });
                }
            }
        }, [fieldKey, form]);
        return (
            <div className={`${_disabled ? 'dynamic-form-disable' : ''}`}>
                <InputItem
                    // type="digit"
                    key={fieldKey}
                    value={initialValue}
                    placeholder={_disabled ? '' : placeholder || '请输入'}
                    disabled={_disabled}
                    onBlur={onBlur}
                    {...formData}
                >
                    <span className={getClassName(labelShowTag)}>
                        {_required ? requireSpan : null}
                        {labelShowTag ? label : null}
                    </span>
                </InputItem>
            </div>
        );
    },
    5: ({ options, handler, form }) => {
        // 时间控件
        // format: "YYYY-MM-DD"
        const { getFieldProps, getFieldValue } = form;
        const { field, expressionValue } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            label,
            _required,
            _disabled,
            _config = {},
        } = field;
        const { format = 'YYYY-MM-DD HH:MM:SS' } = _config;
        // 1：日期；2：日期时间； 其他单选
        const isMulti = isMultiSelectDate(format);
        const { handleCalendarVisible } = handler;
        const time = getTimeInit(
            expressionValue[fieldKey] || initialValue,
            isMulti,
        );
        const formData = getFieldProps(fieldKey, {
            initialValue: time,
            rules: [{ required: !!_required, message: `${label}为必填项` }],
        });
        const value = getFieldValue(fieldKey);
        return isMulti ? (
            <div
                key={fieldKey}
                onClick={() => {
                    !_disabled &&
                        handleCalendarVisible({
                            pickTime: isMulti === 2,
                            fieldKey,
                            initialValue: value,
                        });
                }}
                className={`${
                    _disabled ? 'dynamic-form-disable' : ''
                } dynamic-form-view-item`}
            >
                <div className={getClassName(labelShowTag, 'left color555')}>
                    {_required ? requireSpan : null}
                    {labelShowTag ? label : null}
                </div>
                <div className="right">
                    {getMultiDateValue(value, format) || (
                        <span style={{ color: 'rgb(187, 187, 187)' }}>
                            {_disabled ? '自动填充' : '请选择'}
                        </span>
                    )}
                </div>
            </div>
        ) : (
            <DatePicker
                className="dynamic-form-date-wrap"
                key={fieldKey}
                disabled={_disabled}
                format={value => (value ? formatIt(value, format) : '')}
                mode={getDateMode(format)}
                maxDate={timeRange.maxDate}
                minDate={timeRange.minDate}
                {...formData}
            >
                <List.Item arrow="horizontal">
                    <span className={getClassName(labelShowTag)}>
                        {_required ? requireSpan : null}
                        {labelShowTag ? label : null}
                    </span>
                </List.Item>
            </DatePicker>
        );
    },

    8: ({ options, handler, form }) => {
        // 多选框
        const { field, expressionValue } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            _required,
            label,
            _disabled,
            _config = {},
        } = field;
        const { selectList = [] } = _config;
        const { getFieldValue, getFieldProps, setFieldsValue } = form;
        getFieldProps(fieldKey, {
            initialValue: expressionValue[fieldKey] || initialValue,
            rules: [{ required: !!_required, message: `${label}为必填项` }],
        });
        const labelKey = `${fieldKey}Label`;
        const value = getFieldValue(fieldKey) || [];
        getFieldProps(labelKey);
        let labelValue = getFieldValue(labelKey);
        if (value && !labelValue && !timerIdObj[labelKey]) {
            clearTimeout(timerIdObj[labelKey]);
            // 初次 设置默认显示的label
            labelValue = [];
            timerIdObj[labelKey] = setTimeout(() => {
                delete timerIdObj[labelKey];
                value.forEach(val => {
                    const data = selectList.find(data => data.value === value);
                    data && labelValue.push(data.label);
                });
                setFieldsValue({
                    [labelKey]: labelValue,
                });
            }, 100);
        }

        return (
            <div key={fieldKey} className="dynamic-form-radio-wrap">
                <div className="item-title item-radio-title">
                    <div className={getClassName(labelShowTag)}>
                        {_required ? requireSpan : null}
                        {labelShowTag ? label : null}
                    </div>
                    <ul>
                        {selectList &&
                            selectList.map(data => {
                                const hasValue = value.includes(data.value);
                                const className = hasValue
                                    ? 'checkbox-icon-wrap-active'
                                    : 'checkbox-icon-wrap';
                                const onClick = () => {
                                    if (hasValue) {
                                        const index = value.findIndex(
                                            val => val === data.value,
                                        );
                                        value.splice(index, 1);
                                        labelValue.splice(index, 1);
                                    } else {
                                        value.push(data.value);
                                        labelValue.push(data.label);
                                    }
                                    handleChange(value, fieldKey, form);
                                };
                                return (
                                    <li
                                        key={data.id}
                                        onClick={_disabled ? null : onClick}
                                        className={'item-radio-label'}
                                    >
                                        <div className={className}>
                                            <span></span>
                                        </div>
                                        <div>{data.label}</div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        );
    },
    9: ({ options, handler, form }) => {
        // 单选框
        const { field, expressionValue } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            _required,
            label,
            _disabled,
            _config = {},
        } = field;
        const { selectList = [] } = _config;
        const { getFieldValue, getFieldProps, setFieldsValue } = form;
        getFieldProps(fieldKey, {
            initialValue: expressionValue[fieldKey] || initialValue,
            rules: [{ required: !!_required, message: `${label}为必填项` }],
        });
        const labelKey = `${fieldKey}Label`;
        getFieldProps(labelKey);

        const labelValue = getFieldValue(labelKey);
        const value = getFieldValue(fieldKey);
        if (value && !labelValue && !timerIdObj[labelKey]) {
            clearTimeout(timerIdObj[labelKey]);
            // 初次 设置默认显示的label
            const initialLabelValue =
                selectList.find(data => initialValue === data.value) || {};
            if (!initialLabelValue) return;
            timerIdObj[labelKey] = setTimeout(() => {
                delete timerIdObj[labelKey];
                setFieldsValue({
                    [labelKey]: initialLabelValue.label,
                });
            }, 100);
        }

        return (
            <div key={fieldKey} className="dynamic-form-radio-wrap">
                <div className="item-title item-radio-title">
                    <div className={getClassName(labelShowTag)}>
                        {_required ? requireSpan : null}
                        {labelShowTag ? label : null}
                    </div>
                    <ul>
                        {selectList &&
                            selectList.map(data => {
                                const className =
                                    value && value === data.value
                                        ? 'radio-icon-wrap-active'
                                        : 'radio-icon-wrap';
                                const checkedSvg =
                                    value && value === data.value
                                        ? svg.checked
                                        : svg.circle;
                                const onClick = () => {
                                    handleChange(data.value, fieldKey, form);
                                    handleChange(data.label, labelKey, form);
                                };
                                return (
                                    <li
                                        key={data.id}
                                        onClick={_disabled ? null : onClick}
                                        className={'item-radio-label'}
                                    >
                                        <div className={className}>
                                            {checkedSvg}
                                        </div>
                                        <div>{data.label}</div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        );
    },
    11: ({ options, handler, form }) => {
        // 图片上传
        const { fieldKey } = options.field;
        return (
            <Upload
                // disabled={_disabled}
                // required={_required}
                key={fieldKey}
                options={options}
                handler={handler}
                form={form}
            />
        );
    },
    13: ({ options, handler, form }) => {
        const { field, closePopUp, expressionValue } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            _required,
            label,
            _disabled,
            _config = {},
        } = options.field;
        return (
            <Map
                key={fieldKey}
                closePopUp={closePopUp}
                isView={false}
                form={form}
                expressionValue={expressionValue}
                field={options.field}
            />
        );
    },
    14: ({ options, handler, form }) => {
        const { customControlRender, field, expressionValue } = options;
        const { labelShowTag, fieldKey } = field;
        // return <Upload key={fieldKey} options={options} handler={handler} form={form} />;
        if (
            customControlRender &&
            customControlRender[fieldKey] &&
            typeof customControlRender[fieldKey] === 'function'
        ) {
            return customControlRender[fieldKey](
                getCustomField(field, expressionValue),
                form,
                options,
            );
        }
        return <div className="dynamic-form-view-item">自定义占位符</div>;
    },
    21: ({ options, handler, form }) => {
        // 选人
        const { field, expressionValue, closePopUp } = options;
        const {
            labelShowTag,
            fieldKey,
            initialValue,
            _required,
            label,
            _disabled,
            _config = {},
        } = options.field;

        const isSelectPerson = _config.selectionClassify !== 'organization';
        // getFieldProps(fieldKey, {
        //     initialValue,
        //     rules: [{ required: !!_required, message: `${label}为必填项` }],
        // });
        return isSelectPerson ? (
            <SelectPerson
                key={fieldKey}
                isView={false}
                form={form}
                expressionValue={expressionValue}
                closePopUp={closePopUp}
                field={options.field}
            />
        ) : (
            <SelectDepartment
                key={fieldKey}
                isView={false}
                form={form}
                expressionValue={expressionValue}
                closePopUp={closePopUp}
                field={options.field}
            />
        );
    },
};

const getCustomField = (field, expressionValue) => {
    const { fieldKey, initialValue } = field;
    return {
        ...field,
        initialValue: expressionValue[fieldKey] || initialValue,
        fieldKey: field.fieldKey,
        disabled: field._disabled,
        require: field._require,
        config: field._config,
        label: field.label,
    };
};
