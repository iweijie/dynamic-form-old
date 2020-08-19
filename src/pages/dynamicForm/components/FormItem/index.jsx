import React, { useMemo } from 'react';
import { Form as AForm } from 'antd';
import { map } from 'lodash';
import { InputGroup } from '../Input';
import getFormItemProps from './getFormItemProps';
const { Item: AFormItem } = AForm;

const LayoutFormItem = props => {
    const { children, compact, ...other } = props;
    const { pickFormItemProps } = getFormItemProps(other);

    return (
        <AFormItem {...pickFormItemProps}>
            <InputGroup compact={compact}>
                {React.Children.map(children, child => {
                    return React.cloneElement(child, { noStyle: true });
                })}
            </InputGroup>
        </AFormItem>
    );
};

export default LayoutFormItem;
