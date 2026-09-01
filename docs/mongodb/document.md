# 文档

文档 (document) 是集合中的一条记录，是MongoDB的基本数据单元，以BSON形式存储在数据库中。BSON是JSON文档的二进制表示形式，但它包含的数据类型比JSON多。

## 文档结构

文档由field-value对构成：

```json
{
  field1: value1,
  field2: value2,
  field3: value3,
  ...
  fieldN: valueN
}
```

示例：

```js
var mydoc = {
  _id: ObjectId("5099803df3f4948bd2f98391"),
  name: { first: "Alan", last: "Turing" },
  birth: new Date("Jun 23, 1912"),
  death: new Date("Jun 07, 1954"),
  contribs: ["Turing machine", "Turing test", "Turingery"],
  views: Long(1250000),
};
```

## 文档限制

文档字段名称有以下限制：

- 不能包含空字符`\0`
- 特定条件下可以包含`.`和`$`
- 文档中的字段不能有重复
- `_id`是保留字段

BSON文档大小不超过16MB， 且字段是有序的。
