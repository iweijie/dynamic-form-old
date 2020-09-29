import { useCallback, useMemo } from 'react';
import Input from './Input';
import { usePersistFn } from 'ahooks';

export default props => {
    const { prefix, suffix, action, onChange, $listen, ...other } = props;
    const handleChange = usePersistFn((_, e) => {
        onChange(e);
    });

    $listen(params => {
        const { payload = {} } = params;
        onChange(payload.value);
    });

    const onChangeCustom = useMemo(() => [handleChange, true], [handleChange]);

    return (
        <Input {...other} onChange={onChangeCustom}>
            {/* {prefix ? ( */}
            <Input.Prefix>{/* <Icon type={prefix} /> */} Prefix</Input.Prefix>
            {/* ) : null}
            {suffix ? ( */}
            <Input.Suffix>
                Suffix
                {/* <Icon type={suffix} /> */}
            </Input.Suffix>
            {/* ) : null} */}
        </Input>
    );
};
