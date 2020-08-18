import react, { forwardRef } from 'react';
import { isFristCapitalized } from '@/utils';
import EmptyComponent from './EmptyComponent';
import { get, map } from 'lodash';
import getParentContext from '../context/index';
import { IS_CONTAINER_COMPONENT } from '../constant/index';
const renderComponent = props => {
    const { default: components } = require('./index');
    const { type, paths, uuid, subCollection } = props;
    const topProps = getParentContext(paths);
    const Component = get(components, type, EmptyComponent);
    if (Component[IS_CONTAINER_COMPONENT]) {
        return (
            <Component key={uuid} {...props} {...topProps}>
                {map(subCollection, sub => renderComponent(sub))}
            </Component>
        );
    } else {
        return <Component key={uuid} {...props} {...topProps} />;
    }
};

export default renderComponent;
