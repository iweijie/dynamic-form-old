import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const defaultStateTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
};

export const getDefaultState = () => ({
    name: '',
    age: 0,
});

export const defaultWrappers = {
    Root: styled.div`
        border: 1px solid gray;
        width: 250px;
        border-radius: 3px;
        padding: 10px;
    `,
    Text: styled.span`
        font-size: 14px;
        color: #666;
        display: inline-block;
        margin-right: 10px;
    `,
};

export const componentDidMount = (...ret) => {
    console.log(ret);
};

export const componentWillUnmount = (...ret) => {
    console.log('componentWillUnmount');
};

export const componentDidUpdate = (...ret) => {
    console.log('componentDidUpdate');
};
export function render({ state, wrappers }) {
    const { Root, Text } = wrappers;
    return (
        <Root>
            <Text role="name">name: {state.name}</Text>
            <Text role="age">age: {state.age}</Text>
        </Root>
    );
}
