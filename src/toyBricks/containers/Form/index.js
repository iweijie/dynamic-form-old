import React, { useCallback, useEffect, useState } from 'react';
import { ContainerType, uuid } from '../../constant';
import { map } from 'lodash';
import { Form } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { className } from '../../utils/index';
import styles from './index.less';

export default {
    title: '表单容器',
    code: ContainerType.Form,
    icon: 'iconinput',
    ponput: [ContainerType.Wrap],
    template: () => {},
    render: ({ items }) => {
        const [form] = Form.useForm();
        return (
            <Droppable direction="horizontal" droppableId={ContainerType.Form}>
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            className={className(styles['container'], {
                                [styles['container-move']]:
                                    snapshot.isDraggingOver,
                            })}
                            {...provided.droppableProps}
                        >
                            {map(items, (item, index) => {
                                return (
                                    <Draggable
                                        draggableId={item.code}
                                        key={item.code}
                                        index={index}
                                    >
                                        {item.render}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        );
    },
};
