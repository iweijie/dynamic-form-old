# 配置项

| 属性 | 类型 | 默认值 | 描述 |
| :------: | :------: | :------: | :------: |
| title | string | 名称 | 组件展示名称 |
| code | string | 编码 | 组件编码（唯一值） |
| icon | string | '' | 仅用于左侧显示 |
| ponput | [string] | [] | 用于判断当前组件可放置于那些容器下 |
| config | Array | [] | 配置项（详情如下） |
| template | (config) => ReactNodeString | null | 依据配置项返回组件字符串，用于生成源码 |
| render | (props) => ReactNode | null | 当前组件渲染函数（props 依据容器的不同注入的参数有所不同） |
| linkage | Array(object) | [] | 联动项列表（详情见下方）|
