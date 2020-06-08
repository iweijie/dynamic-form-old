import React from 'react';
import styles from './index.less';
import { useModel } from 'umi';
import Layout from './Layout/index';

export default () => {
    return (
        <div className={styles['wrap']}>
            <Layout />
        </div>
    );
};
