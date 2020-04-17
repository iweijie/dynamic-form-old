import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import ActionBar from '../ActionBar';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default ({ fileds, linkge, children }) => {
  return (
    <div className={styles['container-wrap']}>
      <ActionBar />
      {React.Children.only(children)}
    </div>
  );
};
