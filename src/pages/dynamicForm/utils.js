const merge = (...rest) => {
    return Object.assign({}, ...rest);
};

const defaultFormItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
export const normalizeCol = function(col, defaultValue) {
    if (!col) {
        return defaultValue;
    } else {
        return typeof col === 'object' ? col : { span: Number(col) };
    }
};
/**
 * 改写 FormItem 的 labelCol 与 wrapperCol
 */
export const rewriteFormItemLayoutProps = props => {
    props.labelCol = normalizeCol(
        props.labelCol,
        defaultFormItemLayout.labelCol,
    );
    props.wrapperCol = normalizeCol(
        props.wrapperCol,
        defaultFormItemLayout.wrapperCol,
    );
    return props;
};
