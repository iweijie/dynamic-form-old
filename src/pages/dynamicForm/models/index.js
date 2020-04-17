import { Effect, Reducer, Subscription } from 'umi';
import FormCom from '@/toyBricks/index';

const IndexModel = {
  namespace: 'form',

  state: {
    fields: [],
    // field/container
    active: [],
    // 左侧菜单可选列项
    components: [FormCom],
    // 以配置表单的列表项
    items: [],
  },

  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    changeItems(state, action) {
      const { payload } = action;
      const { items } = state;
      items.push(payload);
      return {
        ...state,
        items: [...items],
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
