import React, { Fragment } from 'react';
import { Form as AntdForm } from 'antd';
import FormItemFieldJson from '../../FormItemField.json';
import {
    normalizeCol,
    pickFormItemProps,
    pickNotFormItemProps,
} from './shared';
import { useFormItem } from './context';
import { size, map, first, pick, omit } from 'lodash';
const { Item: AntdFormItem } = AntdForm;

const computeStatus = props => {
    if (props.loading) {
        return 'validating';
    }
    if (props.invalid) {
        return 'error';
    }
    if (props.warnings && props.warnings.length) {
        return 'warning';
    }
    return '';
};

const computeMessage = (errors, warnings) => {
    const messages = [].concat(errors || [], warnings || []);
    return messages.length
        ? messages.map((message, index) =>
              React.createElement(
                  'span',
                  { key: index },
                  message,
                  messages.length - 1 > index ? ' ,' : '',
              ),
          )
        : undefined;
};

const ConnectedComponent = Symbol('connected');

export const FormItem = topProps => {
    const topFormItemProps = useFormItem();
    topProps = { ...topFormItemProps, ...topProps };

    const {
        name,
        initialValue,
        value,
        visible,
        display,
        required,
        editable,
        triggerType,
        unmountRemoveValue,
        valueName,
        eventName,
        getValueFromEvent,
        rules,
        children,
        component,
        props,
        ...itemProps
    } = topProps || {};

    const pickItem = pick(props);
    const omitItem = omit(props);

    const renderComponent = ({ props, state, mutators, form }) => {
        if (!component) {
            if (children) return <Fragment>{children}</Fragment>;
            log.error(`Can't fount the component. Its key is ${name}.`);
            return null;
        }
        if (!component['__ALREADY_CONNECTED__']) {
            component[ConnectedComponent] =
                component[ConnectedComponent] ||
                connect({
                    eventName,
                    valueName,
                    getValueFromEvent,
                })(component);
        }
        return React.createElement(
            component['__ALREADY_CONNECTED__']
                ? component
                : component[ConnectedComponent],
            {
                ...state,
                props: {
                    ['x-component-props']: props,
                },
                form,
                mutators,
            },
            children,
        );
    };

    const renderField = fieldProps => {
        const { form, state, mutators } = fieldProps;
        const { props, errors, warnings, editable, required } = state;
        const { labelCol, wrapperCol, help } = props;
        const formItemProps = pickFormItemProps(props);
        const { inline, ...componentProps } = pickNotFormItemProps(props);

        const { size } = topFormItemProps;
        const itemProps = {
            ...formItemProps,
            required: editable === false ? undefined : required,
            labelCol: formItemProps.label ? normalizeCol(labelCol) : {},
            wrapperCol: formItemProps.label ? normalizeCol(wrapperCol) : {},
            validateStatus: computeStatus(state),
            help: computeMessage(errors, warnings) || help,
        };

        return (
            <MegaLayoutItem itemProps={{ ...itemProps, size }} {...props}>
                {megaComponentProps => {
                    if (megaComponentProps) {
                        return renderComponent({
                            props: megaComponentProps,
                            state,
                            mutators,
                            form,
                        });
                    }

                    return (
                        <AntdFormItem {...itemProps}>
                            {renderComponent({
                                props: componentProps,
                                state,
                                mutators,
                                form,
                            })}
                        </AntdFormItem>
                    );
                }}
            </MegaLayoutItem>
        );
    };

    return (
        <InternalField
            name={name}
            initialValue={initialValue}
            // unmountRemoveValue={unmountRemoveValue}
            value={value}
            visible={visible}
            display={display}
            required={required}
            rules={rules}
            editable={editable}
            triggerType={triggerType}
            props={{ ...topFormItemProps, ...itemProps, ...props }}
        >
            {renderField}
        </InternalField>
    );
};

const MixLayoutItem = props => {
    const {
        type,
        config,
        props: itemProps,
        actions,
        subCollection,
    } = props.data;
    const { label } = config;
    if (size(subCollection) === 0) return null;
    if (size(subCollection) === 1)
        return <FormItem>{renderComponent(first(subCollection))}</FormItem>;
    return (
        <FormItem name={label}>
            {map(subCollection, sub => renderComponent(sub, notStyle))}
        </FormItem>
    );
};

export default MixLayoutItem;
