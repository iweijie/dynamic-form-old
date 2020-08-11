import React, { Fragment, useMemo, useCallback } from 'react';
import { Form as AntdForm } from 'antd';
import FormItemFieldJson from '../../FormItemField.json';
import getComponent from '../../getComponent';
import { useFormItem } from './context';
import {
    size,
    map,
    first,
    pick,
    omit,
    isObject,
    isFunction,
    isArray,
    get,
} from 'lodash';
const { FormItem: AntdFormItem } = AntdForm;
const EmptyComponent = () => null;

export const FormItem = topProps => {
    const { type, config, props, actions, subCollection, uuid } = topProps;
    const topFormItemProps = useFormItem();
    /** 数据合并操作， 优先级 ： props > config > topFormItemProps */
    const { pickFormItemProps, componentProps, visible } = useMemo(() => {
        const mergeProps = Object.assign({}, topFormItemProps, config, props);
        // TODO 暂时只有 visible(显示隐藏)
        const { visible = true, ...itemProps } = mergeProps;
        const formItemFields = FormItemFieldJson.body.map(v => v.field);

        const pickFormItemProps = pick(itemProps, formItemFields);
        const componentProps = omit(itemProps, formItemFields);
        return { pickFormItemProps, componentProps, visible };
    }, [config, props, topFormItemProps]);
    if (!visible) return null;
    const Component = getComponent[type] || EmptyComponent;

    return (
        <Component
            key={uuid}
            pickFormItemProps={pickFormItemProps}
            componentProps={componentProps}
        />
    );
};

const MixLayoutItem = props => {
    const { data } = props;
    console.log('MixLayoutItem:', data);
    if (isObject(data)) return <FormItem {...data} />;
    if (isArray(data) && size(data) === 1) return <FormItem {...first(data)} />;
    return (
        <AntdFormItem label={get(data, 'config.label', '')}>
            {map(data, sub => (
                <FormItem {...sub} />
            ))}
        </AntdFormItem>
    );
};

export default MixLayoutItem;
