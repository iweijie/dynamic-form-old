import react, { forwardRef, useMemo, useContext } from 'react';
import { isFristCapitalized } from '@/utils';
import EmptyComponent from './EmptyComponent';
import { get, map, size } from 'lodash';
import getContext from '../context/index';
import { isArray, isEmpty, merge } from 'lodash';
import components from './index';

// const getParentContextValues = paths => {
//     const topContexts = useMemo(() => {
//         /** 由于Paths是固定的， 所以此处 判断不会影响 useContext  */
//         if (isEmpty(paths) || !isArray(paths)) return [];
//         /** paths 的优先级由里及外，即里面的属性会覆盖外层的同属性值  */
//         return paths
//             .map(uuid => {
//                 return getContext(uuid);
//             })
//             .filter(Boolean);
//     }, [paths]);
//     return merge({}, ...map(topContexts, topContext => useContext(topContext)));
// };

/** paths  由里到外  */

const getParentContextCom = paths => {
    return useMemo(() => {
        /** 由于Paths是固定的， 所以此处 判断不会影响 useContext  */
        if (isEmpty(paths) || !isArray(paths)) return EmptyComponent;
        /** paths 的优先级由里及外，即里面的属性会覆盖外层的同属性值  */
        const Contexts = paths
            .reverse()
            .map(uuid => {
                return getContext(uuid);
            })
            .filter(Boolean);

        return ({ children, ...other }) => {
            let topProps = {};
            Contexts.reduce((Empty, Contexts) => {
                const { Consumer } = Contexts;
                <Consumer>
                    {values => {
                        topProps = merge(topProps, values);
                        return null;
                    }}
                </Consumer>;
                return null;
            }, null);

            console.log('topProps', topProps);

            return React.Children.map(children, child =>
                React.cloneElement(child, { topProps, ...other }),
            );
        };
    }, [paths]);
};

const renderComponent = (configurations, injectProps) => {
    const {
        type,
        paths,
        actions,
        config,
        props,
        uuid,
        subCollection,
    } = configurations;

    const ContextCom = getParentContextCom(paths);
    const mergeProps = merge({ uuid, actions }, config, props, injectProps);

    const Component = get(components, type, EmptyComponent);
    if (size(subCollection)) {
        return (
            <ContextCom key={uuid} {...mergeProps}>
                <Component>
                    {map(subCollection, sub => renderComponent(sub))}
                </Component>
            </ContextCom>
        );
    } else {
        return (
            <ContextCom key={uuid} {...mergeProps}>
                <Component />
            </ContextCom>
        );
    }
};

export default renderComponent;
