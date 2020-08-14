import React, {
    useRef,
    useMemo,
    createContext,
    useContext,
    useCallback,
    Children,
} from 'react';
import { Form as AForm } from 'antd';
import MixLayoutItem from './FormItem';
import FormFieldsJSON from './FormFields.json';
import { rewriteFormItemLayoutProps } from '../utils';
import getContext from '@/context/index';
import { pick, map } from 'lodash';
const { useForm } = AForm;

const FormProviderFields = [
    'prefixCls',
    'labelAlign',
    'labelCol',
    'wrapperCol',
    'inline',
    'size',
];

const Form = topProps => {
    const [form] = useForm();
    const { type, uuid, actions, props, config, subCollection } = topProps;
    const { FormItemProvider } = getContext(uuid, 'form');
    const getValue = (window.getValue = () => {
        console.log(form);
        return form.getFieldsValue();
    });
    const { pickProviderItem, pickItem } = useMemo(() => {
        const FormFields = FormFieldsJSON.body.map(v => v.field);
        const mergeProps = Object.assign({}, config, props);
        const pickItem = pick(mergeProps, FormFields);
        const pickProviderItem = rewriteFormItemLayoutProps(
            pick(mergeProps, FormProviderFields),
        );

        pickItem.layout = pickItem.inline
            ? 'inline'
            : pickItem.layout || 'horizontal';

        return {
            pickProviderItem: {
                ...pickProviderItem,
                labelCol: pickItem.labelCol,
                wrapperCol: pickItem.wrapperCol,
            },
            pickItem,
        };
    }, [actions, props]);

    const onSubmit = e => {};
    const onReset = () => {};

    const renderChildren = useCallback(subCollection => {
        return map(subCollection, sub => {
            return <MixLayoutItem key={sub.uuid} data={sub} />;
        });
    }, []);

    console.log('pickItem', pickItem);

    return (
        <FormItemProvider {...pickProviderItem} form={form}>
            <AForm
                {...pickItem}
                form={form}
                onSubmit={onSubmit}
                onReset={onReset}
            >
                {children}
            </AForm>
        </FormItemProvider>
    );
};

export default Form;
// {renderChildren(subCollection)}
