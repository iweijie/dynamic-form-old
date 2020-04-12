import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';

const links = [
  { name: '表单生成器', path: '/dynamicForm' },
  { name: '表单列表', path: '/dynamicFormList' },
  { name: '界面生成器', path: '/webList' },
];
export default props => {
  return (
    <nav className={styles['nav']}>
      <h1>Generator</h1>
      <Menu mode="horizontal" defaultSelectedKeys="0">
        {map(links, (link, key) => (
          <Menu.Item key={key}>
            <Link to={link.path}>{link.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </nav>
  );
};
