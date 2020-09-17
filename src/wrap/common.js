import React from 'react';

export function noop() {
    return null;
}

export function id(fn) {
    return (...args) => fn(...args);
}

export function findIdentifierChildren(children, identifier) {
    const foundIdentifier = React.Children.toArray(children).find(
        child => child.type === identifier,
    );
    return foundIdentifier ? foundIdentifier.props.children : null;
}

const action = [
    {
        id: '组件实例ID',
        value: '变动的值',
        // 可触发的机制都是在组件上配置的函数
        trigger: 'onChange',
        oldValue: '变动之前的值',
    },
];
