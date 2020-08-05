import React, { createContext, useContext } from 'react';

//递归控制
const FormItemContext = createContext(null);

export const FormItemProvider = ({
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

export const useFormItem = () => {
    return useContext(FormItemContext);
};
