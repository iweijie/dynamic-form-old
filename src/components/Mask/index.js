/**
 * 遮罩： 用于触发每项的配置弹窗
 */

import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';

export default props => {
    const { item } = props;
    return <div className={styles['mask']}></div>;
};
