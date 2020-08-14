import React, { createContext, useContext } from 'react';

export const context = {};

/**
 * Form 表单 上下文
 */
const createFormItemContext = FormItemContext => {
    const FormItemProvider = ({
        children,
        prefixCls,
        labelAlign,
        labelCol,
        inline,
        wrapperCol,
        size,
        form,
    }) => (
        <FormItemContext.Provider
            value={{
                prefixCls,
                labelAlign,
                labelCol,
                wrapperCol,
                inline,
                size,
                form,
            }}
        >
            {children}
        </FormItemContext.Provider>
    );

    FormItemProvider.displayName = 'FormItemProvider';

    return FormItemProvider;
};

const useFormItem = () => {
    return useContext(FormItemContext);
};

export const getFormContext = uuid => {
    if (!context[uuid]) {
        const Context = createContext(null);
        context[uuid] = {
            Context,
            Provider: createFormItemContext(Context),
            useCustomContext: () => {
                return useContext(Context);
            },
        };
    }
    return context[uuid];
};

const getContext = (uuid, type) => {
    if (type === 'form') return getFormContext(uuid);
};

export default getContext;
