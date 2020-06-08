import React from 'react';
import styles from './index.less';
import { times, size, map } from 'lodash';
import Row from './Row';
import Input from './Input';
import Col from './Col';
import Text from './Text';
import Icon from './Icon';

const components = {
    Row,
    Input,
    Col,
    Text,
    Icon,
};

const getComponent = type => {
    return components[type];
};

/**
 * 单个对象结构
 *
 * type：  类型
 * props： 传参
 * config：当前组件配置项
 * action：联动配置
 * childrens：子项
 *
 */
const p = {
    type: '',
    props: {},
    config: {},
    action: {},
    childrens: [],
};

const defaultProps = [
    {
        type: 'Row',
        _styles: {},
        props: {},
        config: {
            align: 'top',
            gutter: 0,
            justify: 'start',
        },
        childrens: [
            {
                type: 'Col',
                config: {},
                childrens: [
                    {
                        type: 'Text',
                    },
                ],
            },
            {
                type: 'Col',
                config: {
                    span: 6,
                },
                childrens: [
                    {
                        type: 'Input',
                        config: {},
                    },
                ],
            },
            {
                type: 'Col',
                config: {
                    span: 6,
                },
                childrens: [
                    {
                        type: 'Icon',
                        _styles: { color: 'hotpink' },
                        config: {
                            type: 'HomeOutlined',
                        },
                    },
                ],
            },
        ],
    },
];

function render(jsons) {
    return map(jsons, json => {
        const { type, id, config, action, props, _styles, childrens } = json;
        const Component = getComponent(type);
        if (size(childrens)) {
            return (
                <Component _styles={_styles} key={id} {...config} {...props}>
                    {size(childrens) && render(childrens)}
                </Component>
            );
        }

        return <Component key={id} _styles={_styles} {...config} {...props} />;
    });
}

export default props => {
    return <div className={styles['layout']}>{render(defaultProps)}</div>;
};
