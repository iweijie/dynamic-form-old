import PropTypes from 'prop-types';
import React, { useMemo, useCallback } from 'react';
import { Form as AForm, Button } from 'antd';
import FormFieldsJSON from './FormFields.json';
import { rewriteFormItemLayoutProps } from '../../utils';
import { IS_CONTAINER_COMPONENT } from '../../constant/index';
import { isEmpty, pick, get, noop } from 'lodash';
import FormItemProvider from './FormItemProvider';
const { useForm } = AForm;

const FormProviderFields = [
    'prefixCls',
    'labelAlign',
    'labelCol',
    'wrapperCol',
    'inline',
    'size',
];

const Form = props => {
    const [form] = useForm();
    const { uuid, actions, children, ...other } = props;
    const { pickProviderValue, pickItem } = useMemo(() => {
        const FormFields = FormFieldsJSON.body.map(v => v.field);
        const pickItem = pick(other, FormFields);
        const pickProviderValue = rewriteFormItemLayoutProps(
            pick(other, FormProviderFields),
        );

        pickItem.layout = pickItem.inline
            ? 'inline'
            : pickItem.layout || 'horizontal';

        return {
            pickProviderValue: {
                ...pickProviderValue,
                labelCol: pickItem.labelCol,
                wrapperCol: pickItem.wrapperCol,
            },
            pickItem,
        };
    }, [props]);
    const handleGetValue = () => {
        console.log(form.getFieldsValue());
    };
    const onFinish = useCallback(value => {
        console.log(value);
    }, []);
    const onReset = useCallback(() => {
        const { resetFields } = form;
        resetFields();
    }, [form]);
    const onFinishFailed = useCallback(
        ({ values, errorFields, outOfDate }) => {
            console.log(values, errorFields, outOfDate);
        },
        [form],
    );

    const onValuesChange = useCallback((changedValues, allValues) => {}, []);

    return (
        <FormItemProvider {...pickProviderValue} form={form} uuid={uuid}>
            <AForm
                {...pickItem}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                onValuesChange={onValuesChange}
            >
                {children}
            </AForm>
            <Button onClick={handleGetValue}>点我获取值</Button>
        </FormItemProvider>
    );
};

Form[IS_CONTAINER_COMPONENT] = true;
Form.contextType = 'form';

Form.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
};

Form.defaultProps = {};

window.a = Form;

export default Form;
