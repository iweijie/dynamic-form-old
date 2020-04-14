import { Effect, Reducer, Subscription } from 'umi';
import { Input } from 'antd';
const { TextArea } = Input;

const IndexModel = {
  namespace: 'form',

  state: {
    fields: [],
    // field/container/ruugo
    active: [],
    components: [
      {
        title: '表单组件',
        icon: 'form-container-1',
        childrens: [
          {
            id: 4,
            title: '单行文本框',
            icon: 'iconinput',
            type: 'input',
            render: () => {
              return <Input />;
            },
          },
          {
            id: 5,
            title: '多行文本框',
            icon: 'icontextarea',
            type: 'textarea',
            render: () => {
              return <Textarea />;
            },
          },
        ],
      },
    ],
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;
