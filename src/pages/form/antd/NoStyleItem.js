import React from 'react';
import { Form } from 'antd';
const { Item } = Form;

export default ({ children }) => {
    return (
        <Item noStyle>
            {React.children.map(children, child => {
                React.cloneElement(child, { noStyle: true });
            })}
        </Item>
    );
};
