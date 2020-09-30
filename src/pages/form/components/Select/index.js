import { useCallback, useMemo } from 'react';
import Select from './Select';
import { usePersistFn } from 'ahooks';

export default (props, ref) => {
    // console.log('props', props);
    // $trigger({ value });
    const { action, $listen, $trigger, ...other } = props;

    const handleChange = usePersistFn((_, value) => {
        props.onChange(value);
    });

    const onSelect = useMemo(() => [handleChange, true], [handleChange]);

    return <Select {...other} onSelect={onSelect} />;
};
