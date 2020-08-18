import React, { useMemo } from 'react';
import { Form as AntdForm } from 'antd';
import { map } from 'lodash';
const { FormItem: AntdFormItem } = AntdForm;

export const LayoutFormItem = topProps => {
    const { type, config, actions, subCollection, uuid } = topProps;

    const pickConfig = useMemo(() => {
        config;
    }, [config]);

    return (
        <AntdFormItem {...pickConfig}>
            {map(data, sub => (
                // 可以传入改写
                <FormItem noStyle {...sub} />
            ))}
        </AntdFormItem>
    );
};

export default LayoutFormItem;
