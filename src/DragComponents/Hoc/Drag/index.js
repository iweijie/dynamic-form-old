import React from 'react';
import classnames from 'classnames';

export function WrapDroppable(Com) {
    return props => {
        const { children, droppable, ...other } = props;
        return (
            <Droppable {...droppable}>
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            className={classnames(styles['container'], {
                                [styles['container-move']]:
                                    snapshot.isDraggingOver,
                            })}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Com {...other}>
                                {children}
                                {provided.placeholder}
                            </Com>
                        </div>
                    );
                }}
            </Droppable>
        );
    };
}

export function WrapDraggable(Com) {
    return props => {
        const { children, draggable, ...other } = props;
        return (
            <Draggable {...draggable}>
                {(provided, snapshot) => {
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            {Com}
                        </div>
                    );
                }}
            </Draggable>
        );
    };
}

// {
//     map(items, (item, index) => {
//         return (
//             <Draggable draggableId={item.uuid} key={item.uuid} index={index}>
//                 {(provided, snapshot) => {
//                     return (
//                         <div
//                             className={styles['form-item']}
//                             ref={provided.innerRef}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                         >
//                             {item.render({
//                                 form,
//                                 config: item.config,
//                             })}
//                         </div>
//                     );
//                 }}
//             </Draggable>
//         );
//     });
// }
