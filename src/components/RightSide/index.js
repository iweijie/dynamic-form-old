import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Tabs } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';
const { TabPane } = Tabs;

const text = text => <div className={styles['tabs-title']}>{text}</div>;

const tabList = [
  { name: '配置', key: '1' },
  { name: '交互', key: '2' },
  { name: '样式', key: '3' },
];

export default props => {
  return (
    <div className={styles['attr-wrap']}>
      <div className={styles['tabs']}>
        <Tabs
          defaultActiveKey={
            tabList && tabList.length ? tabList[0].key : undefined
          }
        >
          {map(tabList, item => {
            return <TabPane tab={text(item.name)} key={item.key}></TabPane>;
          })}
        </Tabs>
      </div>
      <div className={styles['content']}></div>
    </div>
  );
};
