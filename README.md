# dynamic-form
动态表单，有点意思，慢慢尝试

## 自定义每项的数据格式

```
├─── field ： String  字段（唯一值）
│
├─── type  ： String 类型，表示以哪种方式渲染
│
├─── initialValue ：Any 初始值（默认为 undefined）
│
├─── relevancy ：Object （当前关联项通过则显示，不通过不显示）
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
后续补充

