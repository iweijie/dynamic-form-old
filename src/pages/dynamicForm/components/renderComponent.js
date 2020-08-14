import react, { forwardRef } from 'react';
import { isFristCapitalized } from '@/utils';

// // 表单组件 （就）
// export const IS_FORM_COMPONENT = Symbol('is_form_component');
// // 容器组件：可提供 context ， 可嵌套
// export const IS_CONTAINER_COMPONENT = Symbol('is_container_component');
// // 布局组件：可嵌套
// export const IS_LAYOUT_COMPONENT = Symbol('is_layout_component');
import {
    IS_FORM_COMPONENT,
    IS_CONTAINER_COMPONENT,
    IS_LAYOUT_COMPONENT,
} from '@/constant/index';

import {
    AutoComplete,
    Checkbox,
    Cascader,
    DatePicker,
    InputNumber,
    Input,
    Mentions,
    Rate,
    Radio,
    Switch,
    Slider,
    Select,
    TreeSelect,
    Transfer,
    TimePicker,
    Upload,
    Button as AntdButton,
} from 'antd';
import { Form as AntdForm } from 'antd';
import Form from './components/Form/Form';
import getContext from '@/context/inex';
import create from '@/context';
import { map } from 'lodash';

const EmptyComponent = () => null;

const Button = props => {
    const { text, ...other } = props;
    return <AntdButton {...other}>{text}</AntdButton>;
};

export const components = { Form, Button };

const ATest = forwardRef((props, ref) => {
    const { id, value = '', onChange } = props;
    return (
        <input
            ref={ref}
            id={id}
            type="text"
            value={value}
            onChange={onChange}
        />
    );
});

const FormComponent = {
    AutoComplete,
    Checkbox,
    Cascader,
    DatePicker,
    InputNumber,
    Input,
    Mentions,
    Rate,
    Radio,
    Switch,
    Slider,
    Select,
    TreeSelect,
    Transfer,
    TimePicker,
    Upload,
    ATest,
};

Object.keys(FormComponent).map(key => {
    const Com = FormComponent[key];
    components[key] = props => {
        const { pickFormItemProps, componentProps } = props;
        return (
            <AntdForm.Item {...pickFormItemProps}>
                <Com {...componentProps} />
            </AntdForm.Item>
        );
    };
    components[key][IS_FORM_COMPONENT] = true;
});

console.log(components);

// export default ( data) => {
//     const { type, uuid, actions, props, config, subCollection } = data;
//     const Component = components[type] || EmptyComponent;
//     return <Component key={uuid} {...data} />;
// };

const renderComponent = props => {
    const { type, uuid, contextType, actions, config, subCollection } = props;
    // const isReactElement = type && isFristCapitalized(type);
    const Component = components[type] || EmptyComponent;
    if (Component[IS_CONTAINER_COMPONENT] || Component[IS_LAYOUT_COMPONENT]) {
        return (
            <Component {...props}>
                {map(subCollection, sub => renderComponent(sub))}
            </Component>
        );
    } else {
        return <Component {...props} />;
    }
};
