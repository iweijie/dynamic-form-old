import React from 'react';
import styles from './index.less';
import { Input } from 'antd';
import { times, map } from 'lodash';

export default props => {
    console.log(props);
    return <Input {...props} />;
};
