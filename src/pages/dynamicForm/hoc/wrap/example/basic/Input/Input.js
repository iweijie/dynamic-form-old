import React from 'react';
import PropTypes from 'prop-types';
import { id, noop, findIdentifierChildren } from '../../common';

export const defaultStateTypes = {
    value: PropTypes.string,
};

export const getDefaultState = () => ({
    value: '',
    test: 'test',
});

export const identifiers = {
    Prefix: id(noop),
};

export const defaultListeners = {
    onChange(_, e) {
        return {
            value: e.target.value,
        };
    },
};

// export const componentDidMount = (...ret) => {
//   console.log('componentDidMount', ret);
// };

// export const componentWillUnmount = (...ret) => {
//   console.log('componentWillUnmount', ret);
// };

// export const componentDidUpdate = (...ret) => {
//   console.log('componentDidUpdate', ret);
// };

export function render({ data, state, listeners, children }) {
    console.log(data);
    const prefix = findIdentifierChildren(children, identifiers.Prefix);
    return (
        <div>
            {prefix}
            <input value={data.value} onChange={listeners.onChange} />
        </div>
    );
}
