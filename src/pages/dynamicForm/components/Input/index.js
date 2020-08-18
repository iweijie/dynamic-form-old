import react, { forwardRef } from 'react';
import { Input } from 'antd';
import Fields from './Fields.json';
import { find } from 'lodash';
import Icon from '../Icon';

const InputFields = find(Fields, field => field.title === 'Input');

const getAddon = (type, str) => {
    if (!str || !type) return null;
    return type === 'ReactNode' ? <Icon type={str} /> : str;
};
// React.forwardRef()
export default forwardRef((props, ref) => {
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
        <Input
            ref={ref}
            addonAfter={addonAfter}
            addonBefore={addonBefore}
            prefix={prefix}
            suffix={suffix}
            {...other}
        />
    );
});
