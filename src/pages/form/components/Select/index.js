import { useCallback, useMemo } from 'react';
import Select from './Select';
import { usePersistFn } from 'ahooks';

export default (props, ref) => {
    console.log('Select', props);
    // $trigger({ value });
    const { action, form, onChange, $listen, $trigger, id, ...other } = props;

    const handleChange = usePersistFn((_, value, { children: label }) => {
        console.log(label);
        onChange(value);
        form.setFieldsValue({
            [`${id}Label`]: label,
        });
    });

    const onSelect = useMemo(() => [handleChange, true], [handleChange]);

    return <Select id={id} {...other} onChange={onSelect} />;
};
