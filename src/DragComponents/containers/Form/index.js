import React, { useCallback, useEffect, useState } from 'react';
import { ContainerType, uuid } from '../../constant';
import { map } from 'lodash';
import { Form } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { className } from '../../utils/index';
import Mask from '@/components/Mask';
import styles from './index.less';

const { Item } = Form;

export default {
    title: '表单容器',
    code: ContainerType.Form,
    icon: 'iconinput',
    ponput: [ContainerType.Wrap],
    template: () => {},
    render: ({ items }) => {
        const [form] = Form.useForm();
        return (
            <Droppable direction="vertical" droppableId={ContainerType.Form}>
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            className={className(styles['container'], {
                                [styles['container-move']]:
                                    snapshot.isDraggingOver,
                            })}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Form form={form} className={styles['form']}>
                                {map(items, (item, index) => {
                                    return (
                                        <Draggable
                                            draggableId={item.uuid}
                                            key={item.uuid}
                                            index={index}
                                        >
                                            {(provided, snapshot) => {
                                                return (
                                                    <div
                                                        className={
                                                            styles['form-item']
                                                        }
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {item.render({
                                                            form,
                                                            config: item.config,
                                                        })}
                                                    </div>
                                                );
                                            }}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </Form>
                        </div>
                    );
                }}
            </Droppable>
        );
    },
    config: [],
};
