import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import { id, noop, findIdentifierChildren } from '@/wrap/common';

const config = [
    {
        field: 'addonAfter',
        explain: '带标签的 input，设置后置标签',
        type: 'string | ReactNode',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'addonBefore',
        explain: '带标签的 input，设置前置标签',
        type: 'string | ReactNode',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'defaultValue',
        explain: '输入框默认内容',
        type: 'string',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'disabled',
        explain: '是否禁用状态，默认为 false',
        type: 'boolean',
        defaultValue: 'false',
        version: '',
    },
    {
        field: 'id',
        explain: '输入框的 id',
        type: 'string',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'maxLength',
        explain: '最大长度',
        type: 'number',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'prefix',
        explain: '带有前缀图标的 input',
        type: 'string | ReactNode',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'size',
        explain: '控件大小。注：标准表单内的输入框大小限制为 large',
        type: 'large | middle | small',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'suffix',
        explain: '带有后缀图标的 input',
        type: 'string | ReactNode',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'type',
        explain:
            '声明 input 类型，同原生 input 标签的 type 属性，见：MDN(请直接使用 Input.TextArea 代替 type="textarea")',
        type: 'string',
        defaultValue: 'text',
        version: '',
    },
    {
        field: 'value',
        explain: '输入框内容',
        type: 'string',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'onChange',
        explain: '输入框内容变化时的回调',
        type: 'function(e)',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'onPressEnter',
        explain: '按下回车的回调',
        type: 'function(e)',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'allowClear',
        explain: '可以点击清除图标删除内容',
        type: 'boolean',
        defaultValue: '-',
        version: '',
    },
    {
        field: 'bordered',
        explain: '是否有边框',
        type: 'boolean',
        defaultValue: 'true',
        version: '4.5.0',
    },
];

export const defaultStateTypes = {
    value: PropTypes.string,
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    onPressEnter: PropTypes.func,
    disabled: PropTypes.bool,
    allowClear: PropTypes.bool,
    bordered: PropTypes.bool,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    size: PropTypes.oneOf(['large', 'middle', 'small']),
};

export const displayName = 'Input';

export const getDefaultState = () => ({
    value: undefined,
    disabled: false,
    allowClear: true,
    bordered: true,
    size: 'middle',
});

export const identifiers = ['Prefix', 'Suffix'];

export const defaultListeners = {
    onChange(_, e) {
        return {
            value: e.target.value,
        };
    },
    onPressEnter(_, e) {
        return {
            value: e.target.value,
        };
    },
};

export function render({ data, listeners, identifiers, children }) {
    // console.log('identifiers', identifiers);
    return (
        <Input
            {...data}
            onChange={listeners.onChange}
            prefix={identifiers.Prefix}
            suffix={identifiers.Suffix}
        />
    );
}
