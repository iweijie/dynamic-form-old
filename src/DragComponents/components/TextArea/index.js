import React, { useCallback, useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';
import { ContainerType } from '../../constant';
import { Input, Form } from 'antd';
const { Item } = Form;
const { TextArea } = Input;

export default {
    title: '多行文本框',
    code: 'TextArea',
    icon: 'iconinput',
    ponput: [ContainerType.Form, ContainerType.Component],
    template: () => {},
    render: ({ form, config, linkage }) => {
        return (
            <Item name={config.field} {...config}>
                <TextArea />
            </Item>
        );
    },
    config: {
        field: uuid(),
        label: '多行文本框',
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
            offset: 0,
        },
    },
};
