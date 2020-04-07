# dynamic-form

| 属性 | 类型 | 默认值 | 描述 |
| :------: | :------: | :------: | :------: |
| name | string | 名称 | 表单名称 |
| code | string | 随机值 | 表单编码（唯一值） |
| globalConfig | object | {} | 表单全局配置项 （详情见下方） |
| groups | Array(fields) | [] | 表单项列表（fields详情见下方） |
| linkage | Array(object) | [] | 联动项列表（详情见下方） |

### globalConfig


| 属性 | 类型 | 默认值 | 描述 |
| :------: | :------: | :------: | :------: |
| showTitle | bool | true | 是否显示组名标题 |


### fields


| 属性 | 类型 | 默认值 | 描述 |
| :------: | :------: | :------: | :------: |
| showTitle | bool | true | 是否显示组名标题 |
| isHdie | bool | false | 是否隐藏组 |
| fields | array(fieldItem) | [] | 每项（fieldItem详情见下方） |


### fieldItem

| 属性 | 类型 | 默认值 | 描述 |
| :------: | :------: | :------: | :------: |
| field | string | 随机值 | 获取表单数据对应的字段（唯一值且必填）|
| type | string | input | 表单组件类型 |
| initialValue | Any | undefined | 初始值 |
| config | object | {} | 配置项(详细见下方config) |



### linkageItem

```
├─── field [string] ：当前被控制的项
│
├─── rule [Array(rlues)] ：显示类型
│
├─── type [string] ：显示类型
│
├─── type [string] ：显示类型
│
├─── type [string] ：显示类型
│
├─── type [string] ：显示类型
│
├─── type [string] ：显示类型




│          ├─── type  ： String（and/one） -- and当前rules所有规则匹配则显示， one当前一项规则匹配就显示
│          ├─── rules ： Array
│                └─── field ： String 关联字段（对应 field）
│                └─── validator ：对应规则（可分别对应 Function，RegExp，Object ）
│                       ├─── Function ：参数：为当前关联字段的值（当前值可能为空）；返回值true为通过，false为不通过；
│                       ├─── RegExp ：匹配即为通过，不匹配为不通过
│                       └─── Object ：同 relevancy 字段； 也即可以无限嵌套
│
├─── config ：Object
│       ├─── disabled ：  可对应规则如下
│       │        ├─── Boolean ：true Or false
│       │        └─── Object ：同 relevancy 字段
│       │
│       ├─── rules ：Array 校验规则列表（由于依赖antd ， 所以直接照搬，啊哈哈哈）
│                enum	枚举类型	string	-	
│                len	字段长度	number	-	
│                max	最大长度	number	-	
│                message	校验文案	string	-	
│                min	最小长度	number	-	
│                pattern	正则表达式校验	RegExp	-	
│                required	是否必选	boolean	false	
│                transform	校验前转换字段值	function(value) => transformedValue:any	-	
│                type	内建校验类型，可选项	string	'string'	
│                validator	自定义校验（注意，callback 必须被调用）	function(rule, value, callback)	-	
│                whitespace	必选时，空格是否会被视为错误	boolean	false
│
│
│
```



#### rlues

| 左对齐标题 | 右对齐标题 | 居中对齐标题 |
| :------: | :------: | :------: |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |
