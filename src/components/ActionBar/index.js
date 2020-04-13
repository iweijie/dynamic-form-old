import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const list = [
  {
    name: '导出',
    icon: '',
  },
  {
    name: '预览',
    icon: '',
  },
  {
    name: '查看配置JSON',
    icon: '',
  },
  {
    name: '清除',
    icon: '',
  },
];

export default props => {
  return (
    <div className={styles['action-bar']}>
      {map(list, item => {
        return (
          <div className={styles['bar-btn']}>
            {/* <span>{item.name}</span> */}
            <span>{item.name}</span>
          </div>
        );
      })}
    </div>
  );
};
