# 概览
[JSON Schema](https://json-schema.org/)是一种用于注释和验证JSON文档的结构、约束和数据类型的声明性语言，它用来帮助标准化并定义对JSON数据的期望。

JSON Schema可追溯至2007年10月2日提交的首个JSON Schema提案，最新版本是`2020-12`。

## 什么是 Schema
要定义什么是JSON Schema,需要先定义JSON是什么。

JSON代表"JavaScript Object Notation", 是一种简单的数据交换格式。主要有以下几种数据结构：

- **object**
  
  ```json
  { "key1": "value1", "key2": "value2" }
  ```

- **array**
  
  ```json
  [ "first", "second", "third" ]
  ```

- **number**
  
  ```json
  42
  3.1415926
  ```

- **string**
  
  ```json
  "This is a string"
  ```

- **boolean**
  
  ```json
  true
  false
  ```

- **null**
  
  ```json
  null
  ```

通过这些简单的数据类型，各种结构化数据都能被表示。但是这种巨大的灵活性伴随着巨大的责任，因为同一概念可以用无数种方式来表示。比如可以用以下两种方式来表示一个人的信息：

```json
{
  "name": "George Washington",
  "birthday": "February 22, 1732",
  "address": "Mount Vernon, Virginia, United States"
} 
```

```json
{
  "first_name": "George",
  "last_name": "Washington",
  "birthday": "1732-02-22",
  "address": {
    "street_address": "3200 Mount Vernon Memorial Highway",
    "city": "Mount Vernon",
    "state": "Virginia",
    "country": "United States"
  }
}
```

两种方式同样有效，没有对错之分。记录的设计取决于它在应用中的预期用途，当应用需要获取记录时，准确知道记录的组织方式十分重要，比如需要知道哪些字段是预期的，以及这些值是如何表示的。这便是JSON Schema的用途。

下面的JSON Schema片段描述了第二个示例的结构：

```json
{
  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "birthday": { "type": "string", "format": "date" },
    "address": {
       "type": "object",
       "properties": {
         "street_address": { "type": "string" },
         "city": { "type": "string" },
         "state": { "type": "string" },
         "country": { "type" : "string" }
       }
    }
  }
}
```

JSON Schema本身是用JSON编写的，它是数据本身，而不是计算机程序。它只是一种用于描述其他数据结构的声明性格式。这既是它的优点，也是它的缺点。简洁地描述数据的表面结构并验证数据相对容易，但是由于JSON Schema不能包含任意代码，因此在表达数据元素之间的关系上有所限制。