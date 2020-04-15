import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const getRenderItem = items => (provided, snapshot, rubric) => {
  const { id } = items[rubric.source.index];
  console.log(provided, snapshot, rubric);
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      1234
    </div>
  );
};
export default ({ components }) => {
  //   const renderItem = getRenderItem(components);
  return (
    <div className={styles['side']}>
      {map(components, (com, key) => {
        const { children, title, type } = com;
        return (
          <div key={type} className={styles['side-group']}>
            <div className={styles['side-group-title']}>{title}</div>
            <Droppable droppableId={type} isDropDisabled={true}>
              {provided => {
                return (
                  <div
                    ref={provided.innerRef}
                    className={styles['side-group-item-wrap']}
                  >
                    {map(children, (child, index) => {
                      return (
                        <Draggable
                          draggableId={child.code}
                          key={child.code}
                          index={index}
                        >
                          {(provided, snapshot) => {
                            return (
                              <React.Fragment>
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={className(
                                    drag,
                                    styles['side-group-item'],
                                  )}
                                  title={child.title}
                                >
                                  <i
                                    className={className(
                                      'iconfont',
                                      child.icon,
                                    )}
                                  />
                                  {child.title}
                                </div>
                                {snapshot.isDragging && (
                                  <div
                                    className={className(
                                      drag,
                                      styles['side-group-item'],
                                      styles['side-group-item-move'],
                                    )}
                                    title={child.title}
                                  >
                                    <i
                                      className={className(
                                        'iconfont',
                                        child.icon,
                                      )}
                                    />
                                    {child.title}
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                  </div>
                );
              }}
            </Droppable>
          </div>
        );
      })}
    </div>
  );
};
