import react, { forwardRef } from 'react';
import getFormItemProps from '../components/FormItem/getFormItemProps';
import OriginalLabel from './OriginalLabel';
import Input from './Input';
import Select from './Select';

import { Form as AForm } from 'antd';
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
    Input,
    Select,
    ATest,
};

Object.keys(FormComponent).map(key => {
    const Com = FormComponent[key];
    components[key] = props => {
        const { pickFormItemProps, componentProps, visible } = getFormItemProps(
            props,
        );
        if (!visible) return null;
        // console.log('pickFormItemProps', pickFormItemProps);
        return (
            <AForm.Item {...pickFormItemProps} initialValue="test">
                <Com {...componentProps} />
            </AForm.Item>
        );
    };
});

export default components;
