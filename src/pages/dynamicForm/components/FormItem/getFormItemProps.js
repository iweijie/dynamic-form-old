import { useMemo } from 'react';
import FormItemFieldsJSON from './FormItemFields.json';
import { rewriteFormItemLayoutProps } from '../../utils';
import getParentContext from '../../context/index';
import { pick, omit } from 'lodash';

const getFormItemProps = topProps => {
    const { config, props, paths = [{ uuid: 1, type: 'form' }] } = topProps;

    const topContext = getParentContext(paths);
    /** 数据合并操作， 优先级 ： props > config > topContext */
    return useMemo(() => {
        const mergeProps = Object.assign({}, topContext, config, props);
        const { visible = true, ...itemProps } = mergeProps;
        const formItemFields = FormItemFieldsJSON.body.map(v => v.field);

        const pickFormItemProps = rewriteFormItemLayoutProps(
            pick(itemProps, formItemFields),
        );
        console.log(pickFormItemProps, componentProps, visible);
        const componentProps = omit(itemProps, formItemFields);
        return { pickFormItemProps, componentProps, visible };
    }, [config, props, topContext]);
};
export default getFormItemProps;
