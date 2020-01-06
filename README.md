# dynamic-form
动态表单，有点意思，慢慢尝试

## 自定义每项的数据格式

```
item
└─── field ： String  字段（唯一值）
│
└─── type  ： String 类型，表示以哪种方式渲染
│
└─── initialValue ：Any 初始值（默认为 undefined）
│
└─── relevancy ：Object
│          └─── field ： String 关联字段（对应 field）
│          └─── type  ： String（and/one） -- and当前rules所有规则匹配则显示， one当前一项规则匹配就显示
│          └─── rules ： Array 对应规则（每项可分别对应 Function，RegExp，Object ）
│          │       └─── Function ：参数：为当前关联字段的值；返回值true为通过，false为不通过；
│          │       └─── RegExp ：匹配即为通过，不匹配为不通过
│          │       └─── Object ：同 relevancy 字段； 也即可以无限嵌套
│
```
后续补充
