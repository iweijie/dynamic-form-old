import react, { forwardRef } from 'react';
import { isFristCapitalized } from '@/utils';
import EmptyComponent from './EmptyComponent';
import { get, map, size } from 'lodash';
import { IS_CONTAINER_COMPONENT } from '../constant/index';
import { isArray } from 'lodash';

const getEmptyObj = () => {};

const getParentContext = paths => {
    return useMemo(() => {
        const empty = {};
        if (isEmpty(paths) || !Array.isArray(paths)) return empty;
        return paths
            .reverse()
            .map(path =>
                get(getContext(path), 'useCustomContext', getEmptyObj)(),
            )
            .reduce((obj, context) => ({ ...obj, ...context }), empty);
    }, [paths]);
};
const renderComponent = (configurations, injectProps) => {
    const { default: components } = require('./index');
    const {
        type,
        paths,
        actions,
        config,
        props,
        uuid,
        subCollection,
    } = configurations;
    const topContextProps = getParentContext(paths);
    const mergeProps = Object.assign(
        {},
        topContextProps,
        config,
        props,
        injectProps,
    );
    const Component = get(components, type, EmptyComponent);
    if (size(subCollection)) {
        return (
            <Component key={uuid} {...mergeProps}>
                {map(subCollection, sub => renderComponent(sub))}
            </Component>
        );
    } else {
        return <Component key={uuid} {...props} {...topProps} />;
    }
};

export default renderComponent;
