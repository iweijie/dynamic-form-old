import React from 'react';
import styles from './index.less';
import { times, size, isEmpty, forEach, map } from 'lodash';
import Row from './Row';
import Input from './Input';
import Col from './Col';
import Text from './Text';
import Icon from './Icon';
// import FormLayout from '../../../components/FormLayout';
import { Form } from 'antd';
import components from '../Antd';

// const components = {
//     Row,
//     Input,
//     Col,
//     Text,
//     Icon,
//     Form: FormLayout,
// };

const getComponent = type => {
    return components[type];
};

const getContext = type => {
    switch (type) {
        case 'form':
            const [form] = Form.useForm();
            return form;
        default:
            return {};
    }
};

const findItemById = (id, configs) => {
    let findData;
    forEach(configs, item => {
        if (item.id === id) {
            findData = item;
            return false;
        }
        if (size(item.childrens)) {
            const data = findItemById(id, item.childrens);
            if (data) {
                findData = data;
                return false;
            }
        }
    });
    return findData;
};

/**
 * 单个对象结构
 *
 * type：  类型(String)
 * props： 传参(Object)
 * containerType ：容器类型，存在值时为容器组件，是的情况下会提供上下文环境(Boolean)
 * ponput： 表示当前组件可放置于哪些容器内(Object)
 * config：当前组件配置项(Object)
 * action：联动配置(Object)
 * useContext：使用的上下文 (Array[Object])
 *               id : 关联的Id (String)（用于后去当前项）
 *      contextName : 当前项提供的上下文(String)（可能会有多个）
 *           _value : 已经获取的上下文缓存
 * provideContext：提供的上下文(Object)
 *      key为提供的上下文属性名称
 *      value为获取当前上下文的唯一标识，有单独的方法去设置上下文
 * _styles：自定义style样式(Object)
 * childrens：子项(Array)
 *
 */
const p = {
    type: '',
    id: 'uuid',
    isContainer: true,
    ponput: {
        FormWrap: true,
    },
    props: {},
    config: {},
    action: {},
    useContext: {},
    provideContext: {},
    _styles: '自定义style',
    childrens: [],
};

const defaultProps = [
    {
        type: 'Row',
        _parentId: null,
        id: 2,
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
                id: '2-1',
                _parentId: '2',
                config: {},
                childrens: [
                    {
                        _parentId: '2-1',
                        type: 'Form',
                        containerType: 'form',
                        /** 提供的上下文 */
                        // provideContext: {
                        //     form: {
                        //         type: 'form',
                        //         _value: null,
                        //     },
                        // },
                        id: '2-1-1',
                        childrens: [
                            {
                                type: 'Col',
                                id: '2-1-1-1',
                                _parentId: '2-1-1',
                                config: {},
                                childrens: [
                                    {
                                        type: 'Input',
                                        /** 使用上下文 */
                                        // useContext: [
                                        //     {
                                        //         id: '2-1-1',
                                        //         context: 'form',
                                        //         _value: null,
                                        //     },
                                        // ],
                                        _parentId: '2-1-1-1',
                                        id: '2-1-1-1-1',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

// 容器类型, 可嵌套
export const ContainerType = {
    // 最外层的容器， 用于放置其他容器
    Wrap: 'WrapContainer',
    // 表单容器， 会提供 form props
    Form: 'FormContainer',
    // 提供 history，location，match 等路由信息
    WithRoute: 'WithRouteContainer',
    // 提供 history，location，match 等路由信息， 以及路由切换
    Route: 'RouteContainer',
    // 可放置任意组件
    Component: 'ReactComponentContainer',
};

function render(jsons, configuration) {
    return map(jsons, json => {
        const {
            type,
            id,
            useContext,
            provideContext,
            config,
            action,
            props,
            _styles,
            childrens,
        } = json;
        const Component = getComponent(type);

        let contexts = {};
        if (size(useContext)) {
            contexts = map(useContext, item => {
                const { id, context } = item;
                const findItem = findItemById(id, configuration);
                if (isEmpty(findItem)) return {};
                const { provideContext } = findItem;
                return { [context]: provideContext[context]['_value'] };
            }).reduce((a, b) => {
                return {
                    ...a,
                    ...b,
                };
            }, {});
        }
        if (size(provideContext)) {
            Object.keys(provideContext).forEach(key => {
                const { type } = provideContext[key];
                provideContext[key]['_value'] = getContext(type);
            });
        }

        if (size(childrens)) {
            return (
                <Component
                    _styles={_styles}
                    {...config}
                    {...contexts}
                    {...props}
                    key={id}
                >
                    {size(childrens) && render(childrens, defaultProps)}
                </Component>
            );
        }

        return (
            <Component
                _styles={_styles}
                {...config}
                {...contexts}
                {...props}
                key={id}
            />
        );
    });
}

export default props => {
    return (
        <div className={styles['layout']}>
            {render(defaultProps, defaultProps)}
        </div>
    );
};
