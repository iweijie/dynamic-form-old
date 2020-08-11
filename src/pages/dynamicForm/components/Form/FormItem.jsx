import React, { useMemo } from 'react';
import { Form as AntdForm } from 'antd';
import FormItemFieldJson from './FormItemField.json';
import { rewriteFormItemLayoutProps } from './util';
import { useFormItem } from './context';
import { size, map, first, pick, omit, isObject, isArray, get } from 'lodash';
const { FormItem: AntdFormItem } = AntdForm;

export const FormItem = topProps => {
    // TODO 循环引用的问题  getComponent --> Form --> FormItem ; 后续看怎么解决
    const Components = require('../../getComponent');
    const { default: getComponent, components, IS_FORM_COMPONENT } = Components;

    const {
        type,
        config,
        props,
        actions,
        subCollection,
        uuid,
        noStyle,
    } = topProps;
    const topFormItemProps = useFormItem();
    /** 数据合并操作， 优先级 ： props > config > topFormItemProps */
    const { pickFormItemProps, componentProps, visible } = useMemo(() => {
        const mergeProps = Object.assign({}, topFormItemProps, config, props);
        // TODO 暂时只有 visible(显示隐藏)
        const { visible = true, ...itemProps } = mergeProps;
        const formItemFields = FormItemFieldJson.body.map(v => v.field);

        const pickFormItemProps = rewriteFormItemLayoutProps(
            pick(itemProps, formItemFields),
        );
        const componentProps = omit(itemProps, formItemFields);
        return { pickFormItemProps, componentProps, visible };
    }, [config, props, topFormItemProps]);
    if (!visible) return null;

    const Component = components[type];
    // 存在 IS_FORM_COMPONENT 属性的 为表单容器
    if (Component[IS_FORM_COMPONENT]) {
        return getComponent(type, {
            pickFormItemProps,
            componentProps,
        });
    }
    return <Component {...config} {...props} />;
};

export const a = () => {};

const MixLayoutItem = props => {
    const { data } = props;
    if (isObject(data)) return <FormItem {...data} />;
    if (isArray(data) && size(data) === 1) return <FormItem {...first(data)} />;
    return (
        <AntdFormItem label={get(data, 'config.label', '')}>
            {map(data, sub => (
                <FormItem {...sub} noStyle />
            ))}
        </AntdFormItem>
    );
};

export default MixLayoutItem;
