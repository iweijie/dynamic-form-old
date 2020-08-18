import { useMemo } from 'react';
import FormItemFieldsJSON from './FormItemFields.json';
import { rewriteFormItemLayoutProps } from '../../utils';
import getParentContext from '../../context/index';
import { size, map, first, pick, omit, isObject, isArray, get } from 'lodash';

const getFormItemProps = topProps => {
    const { config, props, paths = [{ uuid: 1, type: 'form' }] } = topProps;

    const topContext = getParentContext(paths);
    /** 数据合并操作， 优先级 ： props > config > topContext */
    return useMemo(() => {
        const mergeProps = Object.assign({}, config, props, topContext);
        const { visible = true, ...itemProps } = mergeProps;
        console.log(FormItemFieldsJSON);
        const formItemFields = FormItemFieldsJSON.body.map(v => v.field);

        const pickFormItemProps = rewriteFormItemLayoutProps(
            pick(itemProps, formItemFields),
        );
        const componentProps = omit(itemProps, formItemFields);
        return { pickFormItemProps, componentProps, visible };
    }, [config, props, topContext]);
};
export default getFormItemProps;
