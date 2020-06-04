import React, { useCallback, useEffect, useState } from 'react';
import { v1 as uuid } from 'uuid';
import { ContainerType } from '../../constant';
import { Input, Form } from 'antd';
import weijie from 'antd';
import Test from './test';
const { Item } = Form;
/**
 * Form.Item 会注入  value  onChange  id
 */

// console.log(name);

export default {
    title: '单行文本框',
    code: 'Input',
    icon: 'iconinput',
    ponput: [ContainerType.Form, ContainerType.Component],
    template: () => {},
    render: () => <Input />,
    trigger: ['onChange', 'onBlur', 'onFocus'],
    linkage: {},
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
    panel: [
        {
            title: '配置',
            placeholde: {
                type: 'input',
                rule: [],
            },
        },
    ],
};
