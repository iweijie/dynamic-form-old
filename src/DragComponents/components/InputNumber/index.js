import React, { useCallback, useEffect, useState } from 'react';

import { ContainerType, uuid } from '../../constant';

import { InputNumber } from 'antd';

export default {
    title: '数字文本框',
    code: 'InputNumber',
    icon: 'iconinput',
    ponput: [ContainerType.Form, ContainerType.Component],
    template: () => {},
    render: ({ form, config, linkage }) => {
        return <InputNumber />;
    },
};
