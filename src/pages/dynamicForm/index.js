import React, { useCallback } from 'react';
import { IndexModelState, ConnectRC, Loading, connect } from 'umi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map, find, get } from 'lodash';
import { ContainerType } from '@/toyBricks';
import { setUUID } from '@/utils';
import FormContainer from '@/toyBricks/containers/Form';
import LeftSide from '@/components/LeftSide';
import RightSide from '@/components/RightSide';
import Container from '@/components/Container';
import styles from './index.less';

console.log('ContainerType:', ContainerType);

const DynamicFormConfig = ({ components, dispatch, items }) => {
  const findDragItem = useCallback(code => {}, [components]);
  const handleDragEnd = useCallback(result => {
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
    console.log(dispatch);

    dispatch({ type: 'form/changeItems', payload: setUUID(drapItem) });
  }, []);
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles['dynamic-form']}>
        <LeftSide components={components} />
        <Container>{FormContainer.render({ items })}</Container>
        <RightSide />
      </div>
    </DragDropContext>
  );
};

export default connect(({ form }) => {
  return {
    components: form.components,
    items: form.items,
  };
})(DynamicFormConfig);
