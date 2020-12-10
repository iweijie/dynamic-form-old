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

            // isAsync : Boolean ; 是否异步
            // isPaging ：Boolean ;是否分页请求
            // pageSize ：Number ; 分页数据大小，默认20，
            // page：Number ；分页页面， 默认，1，
            // url: String, 异步链接
            // list: Array， 列表数据
            // listConfig :  {
            //     label：label显示字段默认 "label",
            //     value: value 显示字段，默认 "value",
            //     _ref: Any， 原始值的 option 值，
            //     _disabled: Boolean， 当前选项是否可选，默认 true，
            //     _hide: Boolean, 当前选项是否显示， 默认 true
            // }

            label: 'iweijie',
            initialValue: 'test',
            requestConfig: {
                isAsync: true,
                isPaging: false,
                pageSize: 20,
                page: 0,
                url: 'https://meishij.iweijie.cn/api/cookbook/recommend',
                labelField: 'title',
                valueField: 'detailID',
            },
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
