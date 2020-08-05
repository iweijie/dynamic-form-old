# DOC

```javascript

/**
 * 单个对象结构
 *
 * type：  类型(String)
 * props： 传参(Object)
 * uuid： 唯一id
 * isContainer：是否为容器组件，是的情况下会提供上下文环境(Boolean)
 * ponput： 表示当前组件可放置于哪些容器内(Object)
 * config：当前组件配置项(Object)
 * action：联动配置(Object)
 * useContext：使用的上下文 (Array[Object])
 *               id : 关联的Id (String)（用于后去当前项）
 *      contextName : 当前项提供的上下文(String)（可能会有多个）
 *           _value : 已经获取的上下文缓存
 * provideContext：提供的上下文(Object)
 *      key为提供的上下文属性名称，value为获取当前上下文的唯一标识，有单独的方法去设置上下文
 * itemStyles：自定义style样式(Object)
 * itemClassName：自定义class
 * children：子项(Array)
 *
 *
 */
const p = {
    type: '',
    id: 'uuid',
    isContainer: true,
    ponput: {
        FormWrap: true,
    },
    props: {},
    config: {},
    action: {},
    useContext: () => {},
    provideContext: {},
    itemStyles: '自定义style',
    itemClassName: '自定义class',
    children: [],
};
```
