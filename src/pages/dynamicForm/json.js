export default [
    {
        uuid: 1,
        type: 'Form',
        config: {
            labelCol: 6,
            wrapperCol: 10,
            // size: 'large',
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
            {
                uuid: 2,
                type: 'Input',
                config: {
                    labelCol: 4,
                    wrapperCol: 12,
                    name: 'iweijie',
                    required: true,
                    label: '就是一个字',
                    initialValue: 'test',
                },
                props: {},
                actions: {},
                subCollection: [],
            },
            {
                uuid: 3,
                type: 'Input',
                config: {
                    name: 'womenbuyiyang',
                    label: '就是一个字',
                    initialValue: '生活',
                },
                props: {},
                actions: {},
                subCollection: [],
            },
            {
                uuid: 4,
                type: 'Button',
                config: {
                    type: 'primary',
                    htmlType: 'submit',
                    text: '提交',
                },
                props: {},
                actions: {},
                subCollection: [],
            },
        ],
    },
];
