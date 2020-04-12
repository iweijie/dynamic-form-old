import React from 'react';
import { IndexModelState, ConnectRC, Loading, connect } from 'umi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map } from 'lodash';
// import LeftSide from '@/components/LeftSide';
import LeftSide from '@/components/LeftSide/test';
import RightSide from '@/components/RightSide';
import Container from '@/components/Container';
import styles from './index.less';
import { Input } from 'antd';
import { drag } from '@/constant/className';
import { className } from '@/utils';

let state = {
  todos: [
    {
      id: 1,
      text: 'A',
    },
    {
      id: 2,
      text: 'B',
    },
    {
      id: 3,
      text: 'C',
    },
    {
      id: 4,
      text: 'D',
    },
    {
      id: 5,
      text: 'E',
    },
    {
      id: 6,
      text: 'F',
    },
  ],
  todos2: [
    {
      id: 'A',
      text: '1',
    },
    {
      id: 'B',
      text: '2',
    },
    {
      id: 'C',
      text: '3',
    },
    {
      id: 'D',
      text: '4',
    },
  ],
};
const components = [
  {
    title: '表单容器',
    icon: 'form-container',
    childrens: [
      {
        id: 1,
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 2,
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 3,
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
        id: 4,
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 5,
        title: '容器',
        icon: '',
        render: () => {
          return <Input />;
        },
      },
    ],
  },
];

const handleDragEnd = result => {
  console.log(result);
};
const IndexPage = ({ index, dispatch }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles['dynamic-form']}>
        <LeftSide />
        <Container />
      </div>
    </DragDropContext>
  );
};

export default connect(({ index, loading }) => ({
  index,
  loading: loading.models.index,
}))(IndexPage);
