import react, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input as AInput } from 'antd';
import Fields from './Fields.json';
import { find } from 'lodash';
import Icon from '../Icon';

const { Group } = AInput;

const InputFields = find(Fields, field => field.title === 'Input');
const InputGroupFields = find(Fields, field => field.title === 'Input.Group');

const getAddon = (type, str) => {
    if (!str || !type) return null;
    return type === 'ReactNode' ? <Icon type={str} /> : str;
};

export const InputGroup = props => {
    const { children, compact, size } = props;
    return (
        <Group compact={compact} size={size}>
            {children}
        </Group>
    );
};

const Input = forwardRef((props, ref) => {
    const {
        addonAfter: addonAfterValue,
        addonBefore: addonBeforeValue,
        addonAfterNodeOrStr,
        addonBeforeNodeOrStr,
        suffix: suffixValue,
        prefix: prefixValue,
        suffixNodeOrStr,
        prefixNodeOrStr,
        ...other
    } = props;

    const addonAfter = getAddon(addonAfterNodeOrStr, addonAfterValue);
    const addonBefore = getAddon(addonBeforeNodeOrStr, addonBeforeValue);
    const suffix = getAddon(suffixNodeOrStr, suffixValue);
    const prefix = getAddon(prefixNodeOrStr, prefixValue);

    return (
        <AInput
            ref={ref}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            prefix={prefix}
            suffix={suffix}
            {...other}
        />
    );
});

const addonOptions = [
    { value: 'ReactNode', label: 'ReactNode' },
    { value: 'string', label: 'string' },
];

export const configurable = [
    {
        name: '字段',
        field: 'addonAfterNodeOrStr',
        type: 'select',
        options: addonOptions,
    },
    {
        name: '字段',
        field: 'addonAfter',
        type: 'string',
    },
];

export default Input;
