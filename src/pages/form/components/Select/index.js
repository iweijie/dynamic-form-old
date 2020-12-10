import { useCallback, useMemo } from 'react';
import Select from './Select';
import { usePersistFn, useSetState } from 'ahooks';

// config
/**
{
    isAsync : Boolean ; 是否异步
    isPaging ：Boolean ;是否分页请求
    pageSize ：Number ; 分页数据大小，默认20，
    page：Number ；分页页面， 默认，1，
    url: String, 异步链接
    list: Array， 列表数据
    listConfig :  {
        label：label显示字段默认 "label",
        value: value 显示字段，默认 "value",
        _ref: Any， 原始值的 option 值，
        _disabled: Boolean， 当前选项是否可选，默认 true，
        _hide: Boolean, 当前选项是否显示， 默认 true
    }
}
 */

export default (props, ref) => {
    console.log('Select', props);
    const pageInfo = useSetState(() => {});
    const { action, form, onChange, id, ...other } = props;

    const handleChange = usePersistFn((_, value, { children: label }) => {
        onChange(value);
        form.setFieldsValue({
            [`${id}Label`]: label,
        });
    });

    const onSelect = useMemo(() => [handleChange, true], [handleChange]);

    return <Select id={id} {...other} onChange={onSelect} />;
};
