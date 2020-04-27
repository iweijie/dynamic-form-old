import React from 'react';
import Nav from '../Nav';
import '@/styles/index.less';
import styles from './index.less';

export default props => {
    return (
        <div className={styles['layout']}>
            <Nav />
            <div className={styles['layout-content']}>
                {React.Children.only(props.children)}
            </div>
        </div>
    );
};
