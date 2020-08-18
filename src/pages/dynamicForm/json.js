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
                uuid: 112,
                type: 'FormItem',
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
                subCollection: [
                    {
                        uuid: 113,
                        type: 'Input',
                        config: {
                            labelCol: 4,
                            wrapperCol: 12,
                            name: 'iweijie',
                            required: true,
                            initialValue: 'test',
                        },
                        props: {},
                        actions: {},
                        subCollection: [],
                    },
                    {
                        uuid: 114,
                        type: 'Input',
                        config: {
                            name: 'womenbuyiyang',
                            initialValue: '生活',
                            prefix: 'UserOutlined',
                            prefixNodeOrStr: 'ReactNode',
                        },
                        props: {},
                        actions: {},
                        subCollection: [],
                    },
                ],
            },
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
                    prefix: 'UserOutlined',
                    prefixNodeOrStr: 'ReactNode',
                },
                props: {},
                actions: {},
                subCollection: [],
            },
            {
                uuid: 4,
                type: 'OriginalLabel',
                config: { type: 'p', text: 'weijie' },
            },
            // {
            //     uuid: 4,
            //     type: 'Upload',
            //     config: {
            //         label: '图片上传',
            //         name: 'logo',
            //         action: '/upload.do',
            //         listType: 'picture',
            //     },
            //     props: {},
            //     actions: {},
            //     subCollection: [
            //         // {
            //         //     uuid: 5,
            //         //     type: 'Button',
            //         //     config: {},
            //         //     props: {},
            //         //     actions: {},
            //         //     subCollection: [
            //         //         {
            //         //             uuid: 5,
            //         //             type: 'Text',
            //         //             config: {
            //         //                 text: 'Click to upload',
            //         //             },
            //         //             props: {},
            //         //             actions: {},
            //         //             subCollection: [],
            //         //         },
            //         //     ],
            //         // },
            //     ],
            // },
        ],
    },
];
