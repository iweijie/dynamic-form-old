import React from 'react';
import { isFn } from '@formily/shared';
import { useForm } from '../hooks/useForm';
import FormContext from '../context';

export const Form = (props = {}) => {
    const form = useForm(props);
    return (
        <FormContext.Provider value={form}>
            {isFn(props.children)
                ? props.children(form)
                : React.Children.map(props.children, node => {
                      return React.cloneElement(node);
                  })}
        </FormContext.Provider>
    );
};

Form.displayName = 'ReactInternalForm';
