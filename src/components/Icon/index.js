import React from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import { className } from '@/utils';

// const getClassName = type => {
//   switch (type) {
//     case 'small':
//       return styles['small'];
//     case 'normal':
//       return styles['normal'];
//     case 'large':
//       return styles['large'];
//     default:
//       return styles['normal'];
//   }
// };

// export const IconFont = props => {
//   const { size = 'normal', type } = props;
//   return <i className={className(getClassName(size), type, 'iconfont')} />;
// };
const IconCom = props => {
  const { size = 18, type } = props;
  return (
    <i
      style={{ fontSize: size }}
      className={className(type, 'iconfont', styles['icon'])}
    />
  );
};

IconCom.propTypes = {
  size: PropTypes.number,
  type: PropTypes.string.isRequired,
};

export default IconCom;
