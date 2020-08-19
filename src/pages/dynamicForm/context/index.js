import React, { useMemo, createContext, useContext } from 'react';
import { isEmpty, get, noop } from 'lodash';

const context = {};

export const getContext = uuid => {
    if (!context[uuid]) {
        context[uuid] = createContext(null);
    }
    return context[uuid];
};

export default uuid => {
    return getContext(uuid);
};
