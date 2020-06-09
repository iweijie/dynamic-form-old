import React from 'react';
import styles from './index.less';
import { useModel } from 'umi';
import Layout from './Layout/index';
import FormLayout from '../../components/FormLayout';
import Test from './Layout/Test';

export default () => {
    return (
        <div className={styles['wrap']}>
            <Layout />
        </div>
    );
};
