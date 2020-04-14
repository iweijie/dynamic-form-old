import React from 'react';
import styles from './index.less';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default ({ droppableId, children }) => {
  return (
    <Droppable direction="horizontal" droppableId={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            className={className(styles['container'], {
              [styles['container-move']]: snapshot.isDraggingOver,
            })}
            {...provided.droppableProps}
          >
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};
