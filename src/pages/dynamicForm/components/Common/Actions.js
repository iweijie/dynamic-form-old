import React, { useCallback } from 'react';
import { useUpdateEffect, useSetState } from 'ahooks';
import pubsub from '../../communicate/pubsub';
// import { watch } from 'chokidar';

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

// const instance = function findComponentInstance(uuid) {
//     return instance;
// };

export default props => {
    const { children, uuid, actions, ...other } = props;

    const $trigger = useCallback(
        (handleType, params) => {
            // params = { values, oldValues, ...other }
            const finds = actions.filter(item => {
                return item.trigger === handleType;
            });

            finds.forEach(item => {
                pubsub.publish(uuid, handleType, {
                    // TODO 模板配置,用于获取当前环境可以使用的传入的值
                    // 当前只是设想
                    // ...getParams(item.params),
                    params,
                });
            });
        },
        [uuid, actions],
    );

    const $listen = useCallback(
        (handleType, handle) => {
            // TODO 需要注册 ， 后续 trigger 的时候 触发
            pubsub.subscribe(uuid, handleType, handle);
        },
        [uuid, actions],
    );

    return React.cloneElement(children, { ...other, $trigger, $listen });
};
