import { defineConfig } from 'umi';

export default defineConfig({
    routes: [
        {
            path: '/',
            component: '@/components/Layout',
            routes: [
                { path: '/dynamicForm', component: '@/pages/dynamicForm' },
                {
                    path: '/dynamicFormView',
                    component: '@/pages/dynamicFormView',
                },
                { path: '/webList', component: '@/pages/webList' },
                { path: '/example', component: '@/wrap/example/index' },
                // { path: '/form', component: '@/pages/form' },
                { path: '/', redirect: '/dynamicForm' },
            ],
        },
    ],
});
