import react, { forwardRef } from 'react';
import { IS_FORM_COMPONENT } from '@/constant/index';
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
import Form from '@/components/Antd/Form/index';
import FormItem from '@/components/Antd/FormItem/index';

const components = { Form };

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

export default components;
