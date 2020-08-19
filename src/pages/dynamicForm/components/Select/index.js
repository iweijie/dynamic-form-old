import react, { forwardRef } from 'react';
import { Select as ASelect } from 'antd';
import Fields from './Fields.json';
import { map } from 'lodash';

const { Option, OptGroup } = ASelect;

const Select = forwardRef((props, ref) => {
    console.log('Select: ', props);
    const { options = [], ...other } = props;
    return (
        <ASelect ref={ref} {...other}>
            {map(options, option => {
                return (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                );
            })}
        </ASelect>
    );
});

export default Select;
