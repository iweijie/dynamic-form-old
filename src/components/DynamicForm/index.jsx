import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import Observer from './util/Observer';
import Form from './form';
import './index.less';
import { randomName, observer } from './util/index';
import ClosePopUp from './util/closePopUp';

// 暴露一个全局的属性
export const VARIABLE_NAME = randomName('_dynamic_form');
window[VARIABLE_NAME] = observer;
/**
 * 选择人物组件
 * onSelected
 * onCancel
 * initValue
 */

export { default as SelectPerson } from './components/SelectPerson/modal';
/**
 * 表单展示组件
 * @props
 * formFields Object 动态表单数据
 * formValue  Object 关联的key 值 对象
 */
export { default as FormView } from './fromView';

const DynamicForm = (props, ref) => {
    const formRef = useRef(null);
    const { formFields = {}, getInteriorHandle } = props;
    // const [observer] = useState(new Observer());
    const [fieldsType, setFieldsType] = useState({});
    const [formFieldMap, setFormFieldMap] = useState({});
    // 由于有些弹窗是挂在到 其他dom上的，所以加个方法用于统一处理
    // 也即路由变化的时候；关闭当前表单内的弹窗
    // 用于统一关闭弹窗列表
    const [closePopUp] = useState(new ClosePopUp());

    useEffect(() => {
        // 获取所有 field 类型 （ fieldKey：fieldType）
        const fieldKey = {};
        const formFieldMap = {};
        const { sectionList = [] } = formFields;
        sectionList.forEach(item => {
            const formFieldInfoList = item.formFieldInfoList || [];
            formFieldInfoList.forEach(formField => {
                fieldKey[formField.fieldKey] = formField.fieldType;
                formFieldMap[formField.fieldKey] = formField;
                // fieldKey[formField.fieldKey] = formField;
            });
        });
        setFieldsType(fieldKey);
        setFormFieldMap(formFieldMap);
    }, [formFields]);

    useEffect(() => {
        observer.on('dynamic-form-router-change', () => {
            closePopUp.call();
            closePopUp.reset();
        });
    }, [closePopUp]);

    if (typeof getInteriorHandle === 'function') {
        getInteriorHandle(formRef.current);
    }

    return (
        <Form
            key={formFields.code}
            {...props}
            formRef={formRef}
            fieldsType={fieldsType}
            formFieldMap={formFieldMap}
            closePopUp={closePopUp}
            observer={observer}
        />
    );
};

DynamicForm.propTypes = {
    formFields: PropTypes.object,
    getInteriorHandle: PropTypes.func,
};

export default React.forwardRef(DynamicForm);
