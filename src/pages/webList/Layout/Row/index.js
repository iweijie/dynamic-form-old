import React from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import { times, map } from 'lodash';

export default ({ children, ...other }) => {
    return <Row {...other}>{children}</Row>;
};
