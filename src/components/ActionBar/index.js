import React from 'react';
import { map } from 'lodash';
import styles from './index.less';
import Icon from '../Icon';

const list = [
  {
    name: '导出',
    icon: 'iconicon-test4',
  },
  {
    name: '预览',
    icon: 'iconicon-test5',
  },
  {
    name: '查看配置JSON',
    icon: 'iconicon-test',
  },
  {
    name: '清除',
    icon: 'iconshanchu',
  },
];

export default props => {
  return (
    <div className={styles['action-bar']}>
      {map(list, (item, index) => {
        return (
          <div key={index} className={styles['bar-btn']}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
