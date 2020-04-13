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
    name: '查看配置JSON',
    icon: '',
  },
  {
    name: '导出',
    icon: '',
  },
  {
    name: '导出',
    icon: '',
  },
];

export default props => {
  return <div className={styles['action-bar']}></div>;
};

{
  /* <div class="action-bar">
<el-button icon="el-icon-video-play" type="text" @click="run">
  运行
</el-button>
<el-button icon="el-icon-view" type="text" @click="showJson">
  查看json
</el-button>
<el-button icon="el-icon-download" type="text" @click="download">
  导出vue文件
</el-button>
<el-button class="copy-btn-main" icon="el-icon-document-copy" type="text" @click="copy">
  复制代码
</el-button>
<el-button class="delete-btn" icon="el-icon-delete" type="text" @click="empty">
  清空
</el-button>
</div> */
}
