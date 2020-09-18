import React, { useMemo, createContext, useContext } from 'react';
import { isEmpty, get, noop } from 'lodash';
import getContext from '../../context/index';

// prefixCls,
// labelAlign,
// labelCol,
// inline,
// wrapperCol,
// size,
// form,
const FormItemProvider = ({ uuid, children, ...other }) => {
    const Context = getContext(uuid);
    return <Context.Provider value={other}>{children}</Context.Provider>;
};

FormItemProvider.displayName = 'FormItemProvider';

export default FormItemProvider;
