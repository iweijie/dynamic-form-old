import React from 'react';
import { Menu } from 'antd';
import { Link } from 'umi';
import { map } from 'lodash';
import styles from './index.less';
import { Input } from 'antd';
import { drag, formContainer } from '@/constant/className';
import { className } from '@/utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const test = [
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
];

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
    icon: 'form-container-1',
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

const getRenderItem = items => (provided, snapshot, rubric) => {
  const { id } = items[rubric.source.index];
  console.log(provided, snapshot, rubric);
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
    >
      `11111111111111111111111111111111`
    </div>
  );
};
export default props => {
  const renderItem = getRenderItem(test);
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
                          type="weijie"
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
                                >
                                  {child.title + child.id}
                                </div>
                                {snapshot.isDragging && (
                                  <div
                                    className={className(
                                      drag,
                                      styles['side-group-item'],
                                    )}
                                  >
                                    {child.title + child.id}
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          }}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
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
