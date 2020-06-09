import { Effect, Reducer, Subscription } from 'umi';
// import FormCom from '@/toyBricks/index';
import FormCom from '@/DragComponents/index';
const IndexModel = {
    namespace: 'form',

    state: {
        fields: [],
        // field/container
        active: [],
        // 左侧菜单可选列项
        components: FormCom,
        // 以配置表单的列表项
        items: [],
    },

    effects: {
        // *query({ payload }, { call, put }) { },
    },
    reducers: {
        addItem(state, action) {
            const { payload } = action;
            const { items } = state;
            const { item, target } = payload;
            items.splice(target, 0, item);
            console.log('items:', items);
            return {
                ...state,
                items: [...items],
            };
        },
        updateItems(state, action) {
            const { payload } = action;
            const { source, target } = payload;
            const { items } = state;
            const item = items[source];
            items.splice(source, 1);
            items.splice(target, 0, item);
            console.log('items:', items);
            return {
                ...state,
                items: [...items],
            };
        },
    },
};

export default IndexModel;
