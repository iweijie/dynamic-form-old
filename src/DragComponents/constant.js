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

export let uuid = 0;

export const data = [
    {
        type: 'formContainer',
        linkage: [],
        config: {},
        childrens: [
            {
                type: 'input',
                config: {},
            },
        ],
    },
];
