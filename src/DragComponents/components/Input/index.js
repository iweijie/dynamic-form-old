import React, { useCallback, useEffect, useState } from 'react';
import uuid from 'uuid';
import { ContainerType } from '../../constant';
import { Input, Form } from 'antd';
const { Item } = Form;

export default {
    title: '单行文本框',
    code: 'Input',
    icon: 'iconinput',
    ponput: [ContainerType.Form, ContainerType.Component],
    template: () => {},
    render: ({ form, config, linkage }) => {
        return (
            <Item name={config.field} {...config}>
                <Input />
            </Item>
        );
    },
    config: {
        field: uuid(),
        label: '单行文本框',
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
            offset: 0,
        },
    },
};
