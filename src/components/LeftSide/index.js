import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const components = [
  {
    title: '表单组件',
    icon: 'form-container-1',
    childrens: [
      {
        id: 4,
        title: '单行文本框',
        icon: 'iconinput',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 5,
        title: '多行文本框',
        icon: 'icontextarea',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 6,
        title: '多行文本框',
        icon: 'icontextarea',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 7,
        title: '多行文本框',
        icon: 'icontextarea',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 8,
        title: '多行文本框',
        icon: 'icontextarea',
        render: () => {
          return <Input />;
        },
      },
      {
        id: 19,
        title: '多行文本框',
        icon: 'icontextarea',
        render: () => {
          return <Input />;
        },
      },
    ],
  },
];

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
export default props => {
  //   const renderItem = getRenderItem(components);
  return (
    <div className={styles['side']}>
      {map(components, (com, key) => {
        const { childrens, title, icon } = com;
        return (
          <div key={com.icon} className={styles['side-group']}>
            <div className={styles['side-group-title']}>{title}</div>
            <Droppable droppableId={`left_${title}`} isDropDisabled={true}>
              {provided => {
                return (
                  <div
                    ref={provided.innerRef}
                    className={styles['side-group-item-wrap']}
                  >
                    {map(childrens, (child, index) => {
                      return (
                        <Draggable
                          draggableId={`${child.id}`}
                          key={`${child.id}`}
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
