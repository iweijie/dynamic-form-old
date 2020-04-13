import React from 'react';
import styles from './index.less';
import { className } from '@/utils';

const getClassName = type => {
  switch (type) {
    case 'small':
      return styles['small'];
    case 'normal':
      return styles['normal'];
    case 'large':
      return styles['large'];
    default:
      return styles['normal'];
  }
};

export const IconFont = props => {
  const { size = 'normal', type } = props;
  return <i className={className(getClassName(size), type, 'iconfont')} />;
};

export const Icon = props => {
  const { size = 'normal', type } = props;
  return <i className={className(getClassName(size), type, 'iconfont')} />;
};
