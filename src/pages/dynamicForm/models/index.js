import { Effect, Reducer, Subscription } from 'umi';
import FormCom from '../../../toyBricks/index';

const IndexModel = {
  namespace: 'form',

  state: {
    fields: [],
    // field/container/ruugo
    active: [],
    components: [FormCom],
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
