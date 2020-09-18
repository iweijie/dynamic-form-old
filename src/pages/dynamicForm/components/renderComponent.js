import React, {
    forwardRef,
    useState,
    useMemo,
    useContext,
    Component,
} from 'react';
import { isFristCapitalized } from '@/utils';
import EmptyComponent from './EmptyComponent';
import { get, map, size } from 'lodash';
import getContext from '../context/index';
import { isArray, isEmpty, merge } from 'lodash';
import components from './index';
import Monitor from '../hoc/Monitor';

const getParentContextValues = paths => {
    const topContexts = useMemo(() => {
        /** 由于Paths是固定的， 所以此处 判断不会影响 useContext  */
        if (isEmpty(paths) || !isArray(paths)) return [];
        /** paths 的优先级由里及外，即里面的属性会覆盖外层的同属性值  */
        return paths
            .map(uuid => {
                return getContext(uuid);
            })
            .filter(Boolean);
    }, [paths]);
    return merge({}, ...map(topContexts, topContext => useContext(topContext)));
};

const createControl = () => {
    return {
        /** 是否必填 */
        required: false,
        /** 是否显示 */
        visible: true,
        /** 是否禁用 */
        disable: false,
        /** 下拉，单选，多选 列表 */
        options: [],
        optionParams: {},
        /** 子元素禁用 */
        disableOptions: [],
        /** 子元素隐藏、显示 */
        visibleOptions: [],
    };
};

const renderComponent = (configurable, injectProps) => {
    const {
        type,
        paths,
        actions,
        config,
        props,
        uuid,
        subCollection,
    } = configurable;

    // const [control, changeControl] = useState(createControl);
    // TODO 获取父级传递的数据有疑问
    const contextValues = {} || getParentContextValues(paths);

    const mergeProps = merge(
        { uuid, actions },
        contextValues,
        config,
        props,
        injectProps,
    );

    const Component = get(components, type, EmptyComponent);
    if (size(subCollection)) {
        return (
            <Monitor key={uuid} {...mergeProps}>
                <Component>
                    {map(subCollection, sub => renderComponent(sub))}
                </Component>
            </Monitor>
        );
    } else {
        return (
            <Monitor key={uuid} {...mergeProps}>
                <Component />
            </Monitor>
        );
    }
};

export default renderComponent;
