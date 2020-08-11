export default [
    {
        uuid: 1,
        type: 'Form',
        config: {},
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
                    label: '就是一个字',
                },
                props: {},
                actions: [],
                subCollection: [],
            },
        ],
    },
];
