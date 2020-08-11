import React, {
    useRef,
    useMemo,
    createContext,
    useContext,
    useCallback,
} from 'react';
import { Form as AForm } from 'antd';
import MixLayoutItem from './FormItem';
import map from 'lodash/map';
import { normalizeCol, log } from './shared';
import { FormItemProvider } from './context';
const { useForm } = AForm;

const FormContext = createContext({});

export const Form = props => {
    const {
        actions,
        props: configProps,
        config,
        type,
        subCollection,
        prefixCls,
        labelAlign,
        labelCol,
        wrapperCol,
        inline,
        size,
        ...rest
    } = props;
    const [form] = useForm();

    const onSubmit = e => {
        if (e && e.preventDefault) e.preventDefault();
        form.submit().catch(e => log.warn(e));
    };
    const onReset = () => {
        form.reset({ validate: false, forceClear: false });
    };

    const renderChildren = useCallback(subCollection => {
        return map(subCollection, sub => {
            return <MixLayoutItem key={sub.uuid} data={sub} />;
        });
    }, []);

    return (
        <FormItemProvider
            {...{
                prefixCls,
                labelAlign,
                labelCol,
                wrapperCol,
                inline,
                size,
                form,
            }}
        >
            <AForm
                {...rest}
                form={form}
                onSubmit={onSubmit}
                onReset={onReset}
                labelCol={normalizeCol(props.labelCol)}
                wrapperCol={normalizeCol(props.wrapperCol)}
                layout={inline ? 'inline' : props.layout}
            >
                {renderChildren(subCollection)}
            </AForm>
        </FormItemProvider>
    );
};
