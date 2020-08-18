import react, { forwardRef } from 'react';
import { IS_FORM_COMPONENT } from '../constant/index';
import getFormItemProps from '../components/FormItem/getFormItemProps';
import OriginalLabel from './OriginalLabel';
import Input from './Input';
import {
    AutoComplete,
    Checkbox,
    Cascader,
    DatePicker,
    InputNumber,
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
import Form from './Form/index';
import FormItem from './FormItem/index';

const components = { Form, FormItem, OriginalLabel };

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
        const { subCollection, actions, props: configProps } = props;
        const { pickFormItemProps, componentProps, visible } = getFormItemProps(
            props,
        );
        if (!visible) return null;
        return (
            <AntdForm.Item {...pickFormItemProps}>
                <Com {...componentProps} />
            </AntdForm.Item>
        );
    };
    components[key][IS_FORM_COMPONENT] = true;
});

export default components;
