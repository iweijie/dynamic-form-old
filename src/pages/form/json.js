export default [
    {
        type: 'Form',
        id: 'uuid',
        props: {},
        config: {},
        action: {},
        linkage: {},
        provideContext: {
            form: () => {
                const [form] = useForm;
                return form;
            },
        },
        useContext: () => {},
        children: [
            {
                type: 'Col',
                id: '2-1-1-1',
                _parentId: '2-1-1',
                config: {},
                children: [
                    {
                        type: 'Input',
                        /** 使用上下文 */
                        useContext: [
                            {
                                id: '2-1-1',
                                context: 'form',
                                _value: null,
                            },
                        ],
                        _parentId: '2-1-1-1',
                        id: '2-1-1-1-1',
                    },
                ],
            },
        ],
    },
];
