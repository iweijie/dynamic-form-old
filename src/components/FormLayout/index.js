import React, { useState } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import { Form } from 'antd';

const { Item } = Form;

class GetFormInstance {
    constructor() {
        this.stroe = {};
    }
    getForm(id) {
        return this.stroe[id];
    }
    setForm(id, formInstance) {
        this.stroe[id] = formInstance;
    }
}

const FormLayout = props => {
    console.log('props:', props);
    const { children } = props;
    const [form] = Form.useForm();

    return (
        <Form name="test" form={form}>
            {children}
        </Form>
    );
};

FormLayout.propTypes = {
    // size: PropTypes.number,
    // type: PropTypes.string.isRequired,
};

export default FormLayout;
