import { Form } from 'antd';

export default {
    type: 'Form',
    id: 'uuid',
    props: {},
    config: {},
    action: {},
    linkage: {},
    provideContext: {
        form: () => {
            const [form] = Form.useForm();
            return form;
        },
    },
};
