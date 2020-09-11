/* eslint-disable no-param-reassign */
import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    useSetState,
    usePersistFn,
    useUpdateEffect,
    useMount,
    useUnmount,
} from 'ahooks';
import { noop, map } from 'lodash';
import { pick, mapValues, inject } from './utils';

export const ReactComponentFunctionNames = [
    'componentDidMount',
    'componentWillUnmount',
    'componentDidUpdate',
    //   'shouldComponentUpdate',
];

function normalizeListener(listener) {
    if (listener === undefined) return;
    return Array.isArray(listener) ? listener : [listener];
}

function normalizeListenerResult(result) {
    return Array.isArray(result) ? result : [result];
}

export const hooksWrap = DeclarativeComponent => {
    const {
        // 组件名称
        displayName,
        // 默认state 类型
        defaultStateTypes = {},
        // 默认state
        getDefaultState = () => ({}),
        // 默认监听事件
        defaultListeners = {},
        // 拦截器
        defaultIntercepters = {},
        // 包装子组件
        defaultWrappers = {},
        // 初始化数据,用于用户自定义常量值数据挂载
        initialize = () => ({}),
        // 渲染函数
        render,
    } = DeclarativeComponent;

    const ReactFnComponent = props => {
        const instance = useMemo(initialize);
        // 默认 state
        const [state, setState] = useSetState(() => {
            const stateValueNames = Object.keys(defaultStateTypes);
            return {
                ...getDefaultState(),
                ...pick(props, (_, name) => stateValueNames.includes(name)),
            };
        });

        // 挑选出来的数据
        const pickListenerArg = usePersistFn(() => {
            return { state, instance };
        });

        // 挑选 渲染数据
        const intercepters = useMemo(
            () =>
                mapValues(defaultIntercepters, (defaultIntercepter, name) =>
                    inject(
                        props[name] === undefined
                            ? defaultIntercepter
                            : props[name],
                        pickListenerArg,
                    ),
                ),
            [defaultIntercepters],
        );
        // 挑选渲染数据
        const pickRenderArg = usePersistFn(() => {
            return { state, instance, intercepters, listeners };
        });

        // 获取生命周期函数
        const lifeCycles = useMemo(() => {
            const lifeCycles = {};
            ReactComponentFunctionNames.forEach(name => {
                if (DeclarativeComponent[name] !== undefined) {
                    lifeCycles[name] = inject(
                        DeclarativeComponent[name],
                        pickRenderArg,
                    );
                } else {
                    lifeCycles[name] = noop;
                }
            });
            return lifeCycles;
        }, [ReactComponentFunctionNames]);
        // 挂载
        useMount(lifeCycles.componentDidMount);
        // 卸载
        useUnmount(lifeCycles.componentWillUnmount);
        // 更新
        useUpdateEffect(lifeCycles.componentDidUpdate);
        const handleListenerResult = useCallback(
            result => {
                if (typeof result === 'object') {
                    setState(result);
                }
            },
            [setState],
        );

        // 设置监听器
        const listeners = useMemo(() => {
            return mapValues(defaultListeners, (defaultListener, name) => {
                return (...runtimeArgs) => {
                    const listenerArg = pickListenerArg();
                    const normalizedResult = normalizeListener(props[name]);

                    if (normalizedResult === undefined)
                        return handleListenerResult(
                            defaultListener(listenerArg, ...runtimeArgs),
                        );

                    const [
                        listener,
                        preventDefault = false,
                        before = false,
                    ] = normalizedResult;
                    if (preventDefault === true)
                        return listener !== undefined
                            ? handleListenerResult(
                                  listener(listenerArg, ...runtimeArgs),
                              )
                            : undefined;

                    if (before === false) {
                        const nextState = defaultListener(
                            listenerArg,
                            ...runtimeArgs,
                        );
                        const nextArg = {
                            ...listenerArg,
                            state: {
                                ...listenerArg.state,
                                ...nextState,
                            },
                        };

                        const listenerResult = listener(
                            nextArg,
                            ...runtimeArgs,
                        );

                        return handleListenerResult(
                            listenerResult === undefined
                                ? nextState
                                : listenerResult,
                        );
                    }

                    const listenerResult = normalizeListenerResult(
                        listener(listenerArg, ...runtimeArgs),
                    );
                    if (listenerResult === undefined) return;

                    const [
                        nextState = {},
                        preventDefaultOnFly = false,
                    ] = listenerResult;
                    if (preventDefaultOnFly)
                        return handleListenerResult(nextState);

                    const nextArg = {
                        ...listenerArg,
                        state: {
                            ...listenerArg.state,
                            ...nextState,
                        },
                    };

                    const defaultListenerResult = defaultListener(
                        nextArg,
                        ...runtimeArgs,
                    );
                    return handleListenerResult(
                        defaultListenerResult === undefined
                            ? nextState
                            : defaultListenerResult,
                    );
                };
            });
        });

        const wrappers = useMemo(() => {
            return mapValues(defaultWrappers, (wrapper, name) =>
                props[name] === undefined ? wrapper : props[name],
            );
        }, [defaultWrappers]);

        // 可以由外界控制
        const getCurrentData = usePersistFn(() => {
            const data = {
                ...state,
            };
            if (!defaultStateTypes || typeof defaultStateTypes !== 'object')
                return data;
            for (let key in defaultStateTypes) {
                data[key] = props[key] === undefined ? state[key] : props[key];
            }
            return data;
        });

        return render({
            data: getCurrentData(),
            state,
            instance,
            intercepters,
            listeners,
            children: props.children,
            wrappers,
        });
    };

    ReactFnComponent.propTypes = defaultStateTypes;
    ReactFnComponent.displayName = displayName;

    return ReactFnComponent;
};
