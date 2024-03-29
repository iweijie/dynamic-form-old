import react, { forwardRef } from 'react';

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
import Form from './components/Form/index';
import FormItem from './components/FormItem/index';
import { IS_FORM_COMPONENT } from '@/constant/Form';

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

export default (type, data) => {
    const Component = components[type] || EmptyComponent;
    const { uuid, props, actions } = data;
    return <Component key={uuid} {...data} />;
};
