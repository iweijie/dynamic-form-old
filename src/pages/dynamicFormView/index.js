import React from 'react';
import styles from './index.less';
import { useModel } from 'umi';

export default () => {
    return (
        <div className={styles['wrap']}>
            <div className={styles['left']}>1</div>
            <div className={styles['content']}>2</div>
            <div className={styles['right']}>3</div>
        </div>
    );
};
