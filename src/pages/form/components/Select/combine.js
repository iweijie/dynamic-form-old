import React from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import { id, noop, findIdentifierChildren } from '@/wrap/common';
import { map } from 'lodash';

const { Option } = Select;

export const defaultStateTypes = {
    options: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    onSelect: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
    disabled: PropTypes.bool,
    allowClear: PropTypes.bool,
    bordered: PropTypes.bool,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    size: PropTypes.oneOf(['large', 'middle', 'small']),
};

export const displayName = 'Select';

export const getDefaultState = () => ({
    value: undefined,
});

export const identifiers = {
    Prefix: id(noop),
    Suffix: id(noop),
};

export const defaultListeners = {
    onChange(_, value) {
        return {
            value,
        };
    },
    // onSelect(_, value) {
    //     return {
    //         value,
    //     };
    // },
};

export function render({ data, listeners }) {
    const { options = [], ...other } = data;
    return (
        <Select
            {...other}
            onChange={listeners.onChange}
            onSelect={listeners.onSelect}
        >
            {map(options, option => {
                return (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                );
            })}
        </Select>
    );
}
