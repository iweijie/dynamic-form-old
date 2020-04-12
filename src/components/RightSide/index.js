import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';

const components = [
  {
    title: '表单容器',
    icon: 'form-container',
    childrens: [
      {
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
    ],
  },
  {
    title: '表单组件',
    icon: 'form-container',
    childrens: [
      {
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
    ],
  },
];
export default props => {
  return (
    <ul className={styles['side']}>
      {map(components, (com, key) => {
        const { childrens, title, icon } = com;
        return (
          <div key={key} className={styles['side-group']}>
            <div className={styles['side-group-title']}>{title}</div>
            <ul>
              {map(childrens, (child, index) => {
                return (
                  <li
                    key={index}
                    className={className(drag, styles['side-group-item'])}
                  >
                    {child.title}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </ul>
  );
};
