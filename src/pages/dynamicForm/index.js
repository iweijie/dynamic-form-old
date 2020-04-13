import React from 'react';
import { IndexModelState, ConnectRC, Loading, connect } from 'umi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map } from 'lodash';
import LeftSide from '@/components/LeftSide';
import RightSide from '@/components/RightSide';
import Container from '@/components/Container';
import styles from './index.less';

const handleDragEnd = result => {
  console.log(result);
};
const IndexPage = ({ index, dispatch }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles['dynamic-form']}>
        <LeftSide />
        <Container />
        <RightSide />
      </div>
    </DragDropContext>
  );
};

export default connect(({ index, loading }) => ({
  index,
  loading: loading.models.index,
}))(IndexPage);
