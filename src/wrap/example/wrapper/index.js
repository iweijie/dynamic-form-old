import React from 'react';
import styled from 'styled-components';
import Case from '../Case';
import Card from './Card';

const Root = styled(Card.Root)`
    border: 1px dashed black;
`;

const Text = ({ children }) => {
    return (
        <div>
            {children.map(child => {
                if (/^name:/.test(child)) return '姓名: ';
                if (/^age:/.test(child)) return '年龄: ';
                return child;
            })}
        </div>
    );
};

export default () => {
    return (
        <div>
            <Case title="普通 Card">
                <Card name="jim" age={11} />
            </Case>
            <Case title="传入了 Root， 简单演示替换样式">
                <Card name="jim" age={11} Root={Root} />
            </Case>
            <Case title="传入了 Text， 简单演示替换文案">
                <Card name="jim" age={11} Text={Text} />
            </Case>
        </div>
    );
};
