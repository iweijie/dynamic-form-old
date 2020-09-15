/**
 * 组件数据结构：
 *
 * {
 *      actions:[ '' ]
 * }
 */

export default [
    {
        uuid: 1,
        _parentUUID: 0,
        type: 'Form',
        config: {
            labelCol: 6,
            wrapperCol: 10,
        },
        props: {},
        actions: [
            // {
            //     name: '请求接口',
            //     type: 'request',
            //     url: 'https://iweijie.cn/api/test',
            //     method: 'post',
            //     repeat: 1,
            //     params: {},
            // },
        ],
        subCollection: [
            // {
            //     uuid: 112,
            //     type: 'Select',
            //     paths: [1],
            //     _parentUUID: 0,
            //     styles: {},
            //     config: {
            //         name: 'select',
            //         required: true,
            //         label: 'iweijie',
            //         initialValue: 'test',
            //         options: [
            //             { value: 'test', label: '测试' },
            //             { value: 'iweijie', label: 'weijie' },
            //             { value: 'xiaofengfeng', label: '小凤凤' },
            //             { value: '1', label: '2' },
            //         ],
            //     },
            //     props: {},
            //     actions: {},
            // },
            {
                uuid: 2,
                type: 'Input',
                config: {
                    labelCol: 4,
                    wrapperCol: 12,
                    name: 'iweijie1',
                    required: true,
                    label: '就是一个字',
                    initialValue: '',
                },
                props: {},
                actions: {},
                subCollection: [],
            },
        ],
    },
];
