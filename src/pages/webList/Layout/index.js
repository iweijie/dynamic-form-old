import React from 'react';
import styles from './index.less';
import { Row, Col } from 'antd';
import { times, map } from 'lodash';
/**
 * 单个对象结构
 *
 * type：  类型
 * config：当前组件配置项
 * action：联动配置
 * childrens：联动配置
 *
 */
const p = {
    type: '',
    config: {},
    action: {},
    childrens: [],
};

const defaultProps = [
    {
        type: 'Row',
        config: {
            align: 'top',
            gutter: 0, // number/object/array
            justify: 'start', //start | end | center | space-around | space-between
        },
        childrens: [
            {
                type: 'Col',
                config: {
                    align: 'top',
                    gutter: 0,
                    justify: 'start',
                },
            },
            {
                type: 'Col',
                config: {
                    flex: 1,
                    offset: 0,
                    order: 0,
                    pull: 1,
                    push: 0,
                    span: 1,
                },
                childrens: [
                    {
                        type: 'Input',
                    },
                ],
            },
        ],
    },
];

function render(jsons) {
    return map(jsons, json => {
        const { type, id, config, action, childrens } = json;
        const Component = getComponent(type);
        return (
            <Component key={id} {...config}>
                {size(childrens) && render(childrens)}
            </Component>
        );
    });
}

export default props => {
    const { config = {} } = props;
    return <div className={styles['layout']}>{render(defaultProps)}</div>;
};
