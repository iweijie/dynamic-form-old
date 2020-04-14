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
  debugger;
};
const DynamicFormConfig = ({ components, dispatch }) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles['dynamic-form']}>
        <LeftSide components={components} />
        <Container />
        <RightSide />
      </div>
    </DragDropContext>
  );
};

export default connect(({ form }) => {
  return {
    components: form.components,
  };
})(DynamicFormConfig);
