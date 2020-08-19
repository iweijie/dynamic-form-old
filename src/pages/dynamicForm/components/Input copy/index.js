import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Input as AInput } from 'antd';
import Icon from '../Icon';

const { Group } = AInput;

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

Input.propTypes = {
    optionalArray: PropTypes.array,
    optionalBool: PropTypes.bool,
    optionalEnum: PropTypes.oneOf(['News', 'Photos']),
};

export const configurations = {
    actions: {},
    type: 'Input',
    ref: Input,
};

export default Input;
