import React, { useMemo } from 'react';
import { Form as AntdForm } from 'antd';
import { map } from 'lodash';
import getFormItemProps from './getFormItemProps';
import renderComponent from '../renderComponent';
const { FormItem: AntdFormItem } = AntdForm;

export const LayoutFormItem = topProps => {
    const { type, config, actions, subCollection, uuid } = topProps;

    const { pickFormItemProps } = getFormItemProps(topProps);

    return (
        <AntdFormItem {...pickFormItemProps}>
            {map(subCollection, sub =>
                // 可以传入改写
                renderComponent(sub, { noStyle }),
            )}
        </AntdFormItem>
    );
};

export default LayoutFormItem;
