import React, {
    useRef,
    useMemo,
    createContext,
    useContext,
    useCallback,
} from 'react';
import { Form as AForm } from 'antd';
import FormItem from './FormItem';
import { normalizeCol, log } from './shared';
import { FormItemProvider } from './context';
const { useForm } = AForm;

const FormContext = createContext({});

export const Form = props => {
    const {
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
            return <FormItem data={sub} />;
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
            <Form
                {...rest}
                form={form}
                onSubmit={onSubmit}
                onReset={onReset}
                labelCol={normalizeCol(props.labelCol)}
                wrapperCol={normalizeCol(props.wrapperCol)}
                layout={inline ? 'inline' : props.layout}
            >
                {renderChildren(subCollection)}
            </Form>
        </FormItemProvider>
    );
};
