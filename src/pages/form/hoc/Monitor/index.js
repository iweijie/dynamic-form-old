import React, { useCallback, useRef } from 'react';
import { usePersistFn, useSetState, useMount, useUnmount } from 'ahooks';
import observer from '../../utils/observer';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { isArray } from 'lodash';

/**
 *  预想的 actions 的数据格式
 * 
    [
        {
            id: '组件实例ID',
            // 可触发的机制都是在组件上配置的函数
            trigger: 'onChange',
            // 配置携带参数, 可配置上下文中的属性值
            params :{ }
        },
    ];
    触发会携带  value 与 oldValue ，后续自定义数据
 */

// 现在的做法是  每一个组件只有一个触发和监听的端口，也就是只有一个输入和输出， 感觉这样够了
// TODO 是否需要拆分每一个组件的事件

const Monitor = props => {
    const { children, uuid, actions, name, ...other } = props;
    // 不变的监听事件
    const handleListen = usePersistFn(value => {
        console.log('handleListen', value);
        if (Array.isArray(actions)) {
            actions.forEach(item => {
                const { actionType, toName } = item;
            });
        }
    });

    const $trigger = useCallback(
        params => {
            actions.forEach(item => {
                observer.emit(item.uuid, {
                    // TODO 模板配置,用于获取当前环境可以使用的传入的值, 当前只是设想...
                    // ...getParams(item.params),
                    source: uuid,
                    payload: params,
                });
            });
        },
        [uuid, actions],
    );

    // 用户主动注册监听事件， 后续 $trigger触发的时候分发触发
    const $listen = useCallback(
        (type, handle) => {
            // if (isFunction(handle)) {
            //     handleListenRef.current = {
            //         [`${uuid}_${type}`]: handle,
            //         ...handleListenRef.current,
            //     };
            // }
        },
        [uuid, actions],
    );

    // 组件挂载监听
    useMount(() => {
        observer.on(name || uuid, handleListen);
    });

    // 组件卸载移除监听
    useUnmount(() => {
        observer.remove(name || uuid);
    });

    return React.cloneElement(children, {
        ...other,
        name,
        // $trigger,
        // $listen,
    });
};

export default Monitor;
