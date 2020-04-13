import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import ActionBar from '../ActionBar';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';
export default props => {
  return (
    <div className={styles['container-wrap']}>
      <ActionBar />
      <Droppable direction="horizontal" droppableId="container">
        {(provided, snapshot) => {
          console.log(provided);
          console.log(snapshot);
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
    </div>
  );
};
