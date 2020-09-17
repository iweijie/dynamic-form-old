import React, { useCallback } from 'react';
import { IndexModelState, ConnectRC, Loading, connect } from 'umi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { map, find, get } from 'lodash';
import { Icon } from 'antd';
// import { ContainerType } from '@/DragComponents';
import { clone } from '@/utils';
// import FormContainer from '@/DragComponents/containers/Form';
import LeftSide from '@/components/LeftSide';
import RightSide from '@/components/RightSide';
import ActionBar from '@/components/ActionBar';
// import Container from '@/components/Container';
import Test from './test';
import styles from './index.less';
import json from './json';

import renderComponent from './components/renderComponent';
import { GlobalContext } from './context';
const getContainerForClone = (...res) => {
    console.log(res);
    return <div>1111</div>;
};

const DynamicFormConfig = ({ components, dispatch, items }) => {
    const handleDragEnd = useCallback(result => {
        const { draggableId, destination, source } = result;
        if (!destination) return;
        const { droppableId } = source;
        if (get(source, 'droppableId') === get(destination, 'droppableId')) {
            dispatch({
                type: 'form/updateItems',
                payload: {
                    source: get(source, 'index', 0),
                    target: get(destination, 'index', 0),
                },
            });
        } else {
            const drapItem = get(
                get(
                    find(components, item => item.type === droppableId),
                    'children',
                    [],
                ),
                source.index,
            );
            if (!drapItem) return;
            dispatch({
                type: 'form/addItem',
                payload: {
                    item: clone(drapItem),
                    target: get(destination, 'index', 0),
                },
            });
        }
    }, []);

    const handleDragStart = useCallback(result => {
        // console.log('handleDragStart', result);
    }, []);

    return (
        <DragDropContext
            // getContainerForClone={getContainerForClone}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            // onDragUpdate={handleDragUpdate}
        >
            <div className={styles['dynamic-form']}>
                <LeftSide components={components} />
                {/* <Container>{FormContainer.render({ items })}</Container> */}

                <div style={{ flex: 1 }}>
                    <ActionBar />
                    <GlobalContext.Provider>
                        {map(json, sub => renderComponent(sub))}
                        {/* <Test /> */}
                    </GlobalContext.Provider>
                </div>
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
