import React from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { Form } from 'antd';
const { Item } = Form;

const formItemField = [
    'colon',
    'dependencies',
    'extra',
    'getValueFromEvent',
    'getValueProps',
    'hasFeedback',
    'help',
    'htmlFor',
    'initialValue',
    'noStyle',
    'label',
    'labelAlign',
    'labelCol',
    'help',
    'name',
    'preserve',
    'normalize',
    'required',
    'rules',
    'shouldUpdate',
    'trigger',
    'validateFirst',
    'validateStatus',
    'validateTrigger',
    'valuePropName',
    'wrapperCol',
    'hidden',
];

export const FormItemHoc = component => {
    return props => {
        const pickData = pick(props, formItemField);
        const omitData = omit(props, formItemField);
        return (
            <Item {...pickData}>{React.cloneElement(component, omitData)}</Item>
        );
    };
};
