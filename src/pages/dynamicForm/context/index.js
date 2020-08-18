import React, { createContext, useContext } from 'react';
import { isEmpty } from 'lodash';

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

export const getContext = ({ uuid, type }) => {
    if (type === 'form') return getFormContext(uuid);

    return {};
};

const getParentContext = paths => {
    const empty = {};
    if (isEmpty(paths) || !Array.isArray(paths)) return empty;
    return paths
        .reverse()
        .map(path => getContext(path))
        .reduce((obj, context) => ({ ...obj, ...context }), empty);
};

export default getParentContext;
