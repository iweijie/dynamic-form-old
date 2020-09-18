import React, { useCallback, useRef } from 'react';
import { useUpdateEffect, useSetState, useMount, useUnmount } from 'ahooks';
import observer from './observer';
import isFunction from 'lodash/isFunction';

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

export default props => {
    const { children, uuid, actions, ...other } = props;
    const handleListenRef = useRef();
    // 不变的监听事件
    const handleListen = useCallback(
        params => {
            if (isFunction(handleListenRef.current)) {
                handleListenRef.current(params);
            }
        },
        [handleListenRef],
    );

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
        handle => {
            if (isFunction(handle)) {
                handleListenRef.current = handle;
            } else {
                handleListenRef.current = null;
            }
        },
        [uuid, actions],
    );

    useMount(() => {
        observer.on(uuid, handleListen);
    });

    // 组件卸载移除监听
    useUnmount(() => {
        observer.remove(uuid);
    });

    return React.cloneElement(children, { ...other, $trigger, $listen });
};
