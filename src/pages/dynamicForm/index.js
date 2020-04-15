import React, { useCallback } from 'react';
import { IndexModelState, ConnectRC, Loading, connect } from 'umi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map, find, get } from 'lodash';
import { FormContainer } from '@/toyBricks';
import LeftSide from '@/components/LeftSide';
import RightSide from '@/components/RightSide';
import Container from '@/components/Container';
import styles from './index.less';

const DynamicFormConfig = ({ components, dispatch }) => {
  const findDragItem = useCallback(code => {}, [components]);
  const handleDragEnd = useCallback(result => {
    console.log(result);
    // 		combine: null
    // destination: {droppableId: "container", index: 0}
    // draggableId: "TextArea"
    // mode: "FLUID"
    // reason: "DROP"
    // source: {index: 1, droppableId: "left_表单组件"}
    // type: "DEFAULT"
    const { draggableId, destination, source } = result;
    const { droppableId } = source;
    const drapItem = get(
      get(
        find(components, item => item.type === droppableId),
        'children',
        [],
      ),
      source.index,
    );
    if (!drapItem) return;

    console.log(drapItem);
  }, []);
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
