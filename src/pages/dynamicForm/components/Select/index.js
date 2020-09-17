import { useCallback, useMemo } from 'react';
import Select from './Select';
import { usePersistFn } from 'ahooks';

export default (props, ref) => {
    const { action, $listen, $trigger, ...other } = props;

    const handleChange = usePersistFn((_, value) => {
        $trigger('onSelect', { value });
        props.onChange(value);
    });

    const onChange = useMemo(() => [handleChange, true], [handleChange]);

    return <Select {...other} onChange={onChange} />;
};
