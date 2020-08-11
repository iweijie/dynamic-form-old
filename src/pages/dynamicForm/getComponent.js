import react, { forwardRef } from 'react';
import {
    AutoComplete,
    Checkbox,
    Cascader,
    DatePicker,
    Form,
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
} from 'antd';

const components = {};

const ATest = forwardRef((props, ref) => {
    console.log('----', props);
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
        console.log(123);
        const { pickFormItemProps, componentProps } = props;
        return (
            <Form.Item {...pickFormItemProps}>
                <Com {...componentProps} />
            </Form.Item>
        );
    };
});

export default components;
