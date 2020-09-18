import { useMemo } from 'react';
import FormItemFieldsJSON from './FormItemFields.json';
import { rewriteFormItemLayoutProps } from '../../utils';
import { pick, omit } from 'lodash';

const getFormItemProps = props => {
    return useMemo(() => {
        const { visible = true, ...itemProps } = props;
        const formItemFields = FormItemFieldsJSON.body.map(v => v.field);

        const pickFormItemProps = rewriteFormItemLayoutProps(
            pick(itemProps, formItemFields),
        );
        const componentProps = omit(itemProps, formItemFields);
        return { pickFormItemProps, componentProps, visible };
    }, [props]);
};
export default getFormItemProps;
