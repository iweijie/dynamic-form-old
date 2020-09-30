/**
 * 组件数据结构：
 *
 * {
 *      actions:[ '' ]
 * }
 */

export default [
    {
        uuid: 112,
        type: 'Select',
        styles: {},
        actions: [
            // {
            //     uuid: 2,
            //     // 可触发的机制都是在组件上配置的函数
            //     trigger: 'onSelect',
            //     // 配置携带参数, 可配置上下文中的属性值
            //     params: {},
            //     action: 'visible',
            // },
            // {
            //     uuid: 2,
            //     // 可触发的机制都是在组件上配置的函数
            //     trigger: 'onSelect',
            //     // 配置携带参数, 可配置上下文中的属性值
            //     params: {},
            //     action: 'update',
            // },
            // {
            //     uuid: 2,
            //     // 可触发的机制都是在组件上配置的函数
            //     trigger: 'onSelect',
            //     // 配置携带参数, 可配置上下文中的属性值
            //     params: {},
            //     action: 'set',
            // },
        ],
        config: {
            name: 'select',
            required: true,
            label: 'iweijie',
            initialValue: 'test',
            isAsync: true,
            requestConfig: {},
            options: [
                { value: 'test', label: '测试' },
                { value: 'iweijie', label: 'weijie' },
                { value: 'xiaofengfeng', label: '小凤凤' },
                { value: '1', label: '2' },
            ],
        },
        props: {},
    },
    {
        uuid: 2,
        type: 'Input',
        config: {
            initialValue: '就是一个字',
            labelCol: 4,
            wrapperCol: 12,
            name: 'iweijie1',
            required: true,
            label: '就是一个字',
            prefix: 'step-backward',
        },
        actions: [],
        subCollection: [],
    },
];
