# JSON Schema入门

## 概述

JSON Schema是一种用于注释和验证JSON文档的结构、约束和数据类型的声明性语言，它用来帮助标准化并定义对JSON数据的期望。

JSON Schema可追溯至2007年10月2日提交的首个JSON Schema提案，最新版本是`2020-12`。

## 什么是schema

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

两种方式同样有效，没有对错之分。记录的设计取决于它在应用中的预期用途，当应用需要获取记录时，准确知道记录的组织方式十分重要，比如需要知道哪些字段是预期的，以及这些值是如何表示的。这便是JSON Schema的用途。下面的JSON Schema片段描述了第二个示例的结构：

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

## 数据类型

`type` 关键字是JSON Schema的基础，它指定了schema期待的数据类型。

JSON Schema定义了以下基本类型：

- `array`

- `boolean`

- `null`

- `numeric`(`number` / `integer`)

- `object`

- `regular expressions` 

- `string`

`type` 关键字可以是**单个字符串**或**数组**：

- 是单个字符串时，必须是`array`, `boolean`, `null`, `number`, `integer` , `object`或`string`中的一个，它规定了实例数据只有在与该特定类型匹配时才有效；

- 是数组时，包含上面提到的多个字符串类型。这种情况下，实例数据只要和数组中的任何给定类型匹配就有效。

```json5
// schema
{ "type": "number" }

// data
42      // valid
42.0    // valid
"42"    // invalid


// schema
{ "type" : ["number", "string"] }

// data
42      // valid
"Life"  // valid
["Life", "the universe", "and everything"]  // invalid
```

JSON Schema提供了许多关键字用于根据特定类型验证数据。下表列出了专门为每种基本类型设计的关键字：

| type 关键字            | 特定关键字                                                                                                                                             | 描述                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `array`             | `items`, `prefixItems` , `unevaluatedItems`,  `contains`,  `maxContains`, `minContains`, `minItems`, `maxItems`, `uniqueItems`                    | 定义项目模式，额外项目处理， 项目数量约束和唯一性。           |
| `number`/ `integer` | `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, `multipleOf`                                                                        | 定义数字范围，包括排他性边界和可整除性。                 |
| `object`            | `required`, `properties`,  `additionalProperties`, `unevaluatedProperties`, `patternProperties`, `minProperties`, `maxProperties`, `dependencies` | 定义必需属性、属性模式、额外属性处理，基于模式的属性匹配和属性数量约束。 |
| `string`            | `minLength`, `maxLength`, `pattern`, `format`                                                                                                     | 限制字符串长度，模式匹配和格式验证                    |

### array

数组有两种使用方式：

1. **列表验证**： 任意长度序列，每一项都匹配相同的模式。

2. **元组验证**：固定长度序列，每一项都可能有不同的模式。

#### items

当数组有任意长度且每一项都匹配相同模式时，列表验证很有用。设置`items`关键字为单模式来验证数组中的所有元素。

```json5
// schema
{
  "type": "array",
  "items": {
    "type": "number"
  }
}

// data
[1, 2, 3, 4, 5]     // valid
[1, 2, "3", 4, 5]   // invalid
[]                  // valid, 空数组始终有效
```

#### prefixItems

当数组元素每一项都有不同模式时，元组验证很有用，这种情况下元素下标是有意义的。设置`prefixItems`为一个数组，每一项都是对应数据下标的模式。

```json5
// schema
{
  "type": "array",
  "prefixItems": [
    { "type": "number" },
    { "type": "string" },
    { "enum": ["Street", "Avenue", "Boulevard"] },
    { "enum": ["NW", "NE", "SW", "SE"] }
  ]
}

// data
[1600, "Pennsylvania", "Avenue", "NW"]  // valid
[24, "Sussex", "Drive"]                 // invalid
[10, "Downing", "Street"]               // valid 可以不提供所有项目
[1600, "Pennsylvania", "Avenue", "NW", "Washington"] // valid 默认可以在尾部添加额外项目
```

#### 额外项目

`items`关键字可以用来控制元组中是否能有超出`prefixItems`定义的额外项目。`items`关键字的值是一个模式时，所有额外项目必须通过该模式才能验证关键字。`items`设置为`false`时表示不允许元组有额外项目。

```json5
// schema
{
  "type": "array",
  "prefixItems": [
    { "type": "number" },
    { "type": "string" },
    { "enum": ["Street", "Avenue", "Boulevard"] },
    { "enum": ["NW", "NE", "SW", "SE"] }
  ],
  "items": false
}

// data
[1600, "Pennsylvania", "Avenue", "NW"] // valid
[1600, "Pennsylvania", "Avenue"]       // valid
[1600, "Pennsylvania", "Avenue", "NW", "Washington"] // invalid


// schema
{
  "type": "array",
  "prefixItems": [
    { "type": "number" },
    { "type": "string" },
    { "enum": ["Street", "Avenue", "Boulevard"] },
    { "enum": ["NW", "NE", "SW", "SE"] }
  ],
  "items": { "type": "string" }
}

// data
[1600, "Pennsylvania", "Avenue", "NW", "Washington"] // valid
[1600, "Pennsylvania", "Avenue", "NW", 20500]        // invalid
```

#### unevaluatedItems

`unevaluatedItems`关键字主要在你想向数组添加或禁用额外项目时很有用。`unevaluatedItems`适用于未通过`items`，`prefixItems` `contains`关键字的任何值。和`items`一样，你可以设置`unevaluatedItems`为`false`来禁用额外项目。

```json5
// schema
{
  "prefixItems": [
    { "type": "string" }, { "type": "number" }
  ],
  "unevaluatedItems": false
}

// data
["foo", 42]          // valid
["foo", 42, null]    // invalid
```

`items`不会看同一子模式中的`allOf`、`anyOf`或`oneOf`的任何实例。

```json5
//schema
{
  "allOf": [{ "prefixItems": [{ "type": "boolean" }, { "type": "string" }] }],
  "items": { "const": 2 }
}

// data
[true, "a", 2]    // invalid.`items`会忽略`allOf`, 所以验证不通过


// schema
{
  "allOf": [{ "prefixItems": [{ "type": "boolean" }, { "type": "string" }] }],
  "unevaluatedItems": { "const": 2 }
}

// data
[true, "a", 2]  // valid
```

#### contains

虽然 `items`模式必须对数组中的每个项目都有效，但是`contain`模式只需验证数组中的一个或多个项目。

```json5
// schema
{
  "type": "array",
  "contains": {
    "type": "number"
  }
}

// data
["life", "universe", "everything", 42]            // valid
["life", "universe", "everything", "forty-two"]   // invalid
[1, 2, 3, 4, 5]                                   // valid
```

`minContains` 和 `maxContains`可以和`contains` 一起使用来进一步指定模式匹配`contains`约束的次数。这两个关键字可以指定任何非负数，包含0。

```json5
// schema
{
  "type": "array",
  "contains": {
    "type": "number"
  },
  "minContains": 2,
  "maxContains": 3
}

// data
["apple", "orange", 2]            // invalid
["apple", "orange", 2, 4]         // valid
["apple", "orange", 2, 4, 8]      // valid
["apple", "orange", 2, 4, 8, 16]  // invalid
```

#### 长度

`minItems`和`maxItems`用于指定数组长度。

```json5
// schema
{
  "type": "array",
  "minItems": 2,
  "maxItems": 3
}

// data
[]                // invalid
[1]               // invalid
[1, 2]            // valid
[1, 2, 3]         // valid
[1, 2, 3, 4]      // invalid
```

#### 唯一性

将`uniqueItems`设置成`true`即可确保数组中的每一项都是唯一的。

```json5
// schema
{
  "type": "array",
  "uniqueItems": true
}

// data
[1, 2, 3, 4, 5]     // valid
[1, 2, 3, 3, 5]     // invalid
[]                  // valid
```

### boolean

布尔类型只接受`true`和`false`两个值。

```json5
// schema
{ "type": "boolean" }

// data
true      // valid
false     // valid
"true"    // invalid
0         // invalid
```

### null

null类型只接受`null`一个值。

```json5
// schema
{ "type": "null" }

// data
null     // valid
false    // invalid
0        // invalid
""       // invalid
```

### numeric types

JSON Schema 有两种数字类型：`integer`和 `number`。它们共享相同的验证关键字。

#### integer

`integer`用于整数。JSON没有区分整数和浮点数的不同类型，因此有没有小数点并不足以区分整数和非整数。

```json5
// schema
{ "type": "integer" }

// data
42         // valid
-1         // valid
1.0        // valid
3.1415926  // invalid
"42"       // invalid
```

#### number

`number`用于任何数字类型，不管是整数还是浮点数。

```json5
// schema 
{ "type": "number" }

// data
42        // valid
-1        // valid
5.0       // valid
3.1415926 // valid
"42"      // invalid
```

#### 倍数

可以使用`multipleOf`关键字将数字限定为指定数字的倍数。

```json5
// schema
{
    "type": "number",
    "multipleOf": 10
}

// data
0         // valid
10        // valid
20        // valid
23        // invalid
```

倍数也能是浮点数：

```json5
// schema
{
    "type": "number",
    "multipleOf": 0.01
}

// data
4.02        // valid
4.021       // invalid
```

#### 范围

可以通过组合使用`minimum`和`maximum`（或`exclusiveMinimum和``exclusiveMaximum` ）l来指定数字范围。

如果x是要验证的值，则下面关系必须成立：

- x ≥ `minimum`

- x > `exclusiveMinimum`

- x ≤ `maximum`

- x < `exclusiveMaximum`

```json5
// schema
{
    "type": "number",
    "minimum": 0,
    "exclusiveMaximum": 100
}

// data
-1            // invalid
0             // valid
10            // valid
99            // valid
100           // invalid
101           // invalid
```

### object

对象是JSON中的映射类型，将键映射到值，键必须是字符串。

```json5
// schema
{ "type": "object" }

// data
// valid
{
    "key": "value"
}
// valid
{
    "Sun": 1.989,
    "Saturn": 5.68
}
// invalid

{
    0.01: "cm",
    1: "m",    
    1000: "km"
}
```

#### 属性

使用`properties`关键字定义对象属性。`properties`的值是一个对象，其中每个键都是属性的名称，值是用于验证该属性的模式。`properties`关键字将忽略与关键字中的任何属性名称不匹配的任何属性。

```json5
// schema
{
  "type": "object",
  "properties": {
    "number": { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "enum": ["Street", "Avenue", "Boulevard"] }
  }
}

// data
// valid
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue" }
// invalid
{ "number": "1600", "street_name": "Pennsylvania", "street_type": "Avenue" }
// valid 默认可以省略属性
{ "number": 1600, "street_name": "Pennsylvania" }
// valid 默认可以提供额外属性
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue", "direction": "NW" }
// valid
{}
```

#### 模式属性

`patternProperties`关键字用于给定特定类型的属性名，其属性值必须匹配特定的模式。它将正则表达式映射到模式。如果属性名匹配给定的正则表达式，则属性值必须根据相应的模式进行验证。

```json5
// schema
{
  "type": "object",
  "patternProperties": {
    "^S_": { "type": "string" },
    "^I_": { "type": "integer" }
  }
}

// data
// valid
{ "S_25": "This is a string" }
// valid
{ "I_0": 42 }
// invalid
{ "S_0": 42 }
// invalid
{ "I_42": "This is a string" }
// valid
{ "keyword": "value" }
```

#### additionalProperties

`additionalProperties`关键字用于控制未在`properties`关键字中列出或未匹配`patternProperties`中的任何正则表达式的属性的处理。

```json5
// schema
{
  "type": "object",
  "properties": {
    "number": { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "enum": ["Street", "Avenue", "Boulevard"] }
  },
  "additionalProperties": false
}

// data
// valid
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue" }
// invalid
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue", "direction": "NW" }


// schema
{
  "type": "object",
  "properties": {
    "number": { "type": "number" },
    "street_name": { "type": "string" },
    "street_type": { "enum": ["Street", "Avenue", "Boulevard"] }
  },
  "additionalProperties": { "type": "string" }
}

// data
// valid
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue" }
// valid
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue", "direction": "NW" }
// invalid
{ "number": 1600, "street_name": "Pennsylvania", "street_type": "Avenue", "office_number": 201 }

```

`additionalProperties`只能识别和它本身相同的子模式中声明的属性。

```json5
// schema
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" }
      },
      "required": ["street_address", "city", "state"],
      "additionalProperties": false
    }
  ],

  "properties": {
    "type": { "enum": [ "residential", "business" ] }
  },
  "required": ["type"]
}


// data
// invalid。 `type`被认为是额外属性
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "city": "Washington",
  "state": "DC",
  "type": "business"  
}
// invalid。 `type`是必需的
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "city": "Washington",
  "state": "DC"
}


// workaround
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type": "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  ],

  "properties": {
    // 重新声明属性
    "street_address": true,
    "city": true,
    "state": true,
    "type": { "enum": [ "residential", "business" ] }
  },
  "required": ["type"],
   // 将additionalProperties移到外层
  "additionalProperties": false
}


// valid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "city": "Washington",
  "state": "DC",
  "type": "business"
}
// invalid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "city": "Washington",
  "state": "DC",
  "type": "business",
  "something that doesn't belong": "hi!"
}

```

#### unevaluatedProperties

`unevaluatedProperties`和`additionalProperties`相似，但是它能识别子模式中声明的变量。

```json5
// schema
{
  "allOf": [
    {
      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "type: "string" }
      },
      "required": ["street_address", "city", "state"]
    }
  ],

  "properties": {
    "type": { "enum": ["residential", "business"] }
  },
  "required": ["type"],
  "unevaluatedProperties": false
}

// data
// valid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "city": "Washington",
  "state": "DC",
  "type": "business"
}
// invalid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "city": "Washington",
  "state": "DC",
  "type": "business",
  "something that doesn't belong": "hi!"
}
```

#### required

默认情况下，`properties`关键字定义的属性都不是必需的。可以使用`required`关键字提供一组必需属性。`required`关键字采用零或多个字符串数组，数组中的字符串必须是唯一的。

```json5
// schema
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string" },
    "address": { "type": "string" },
    "telephone": { "type": "string" }
  },
  "required": ["name", "email"]
}

// data
// valid
{
  "name": "William Shakespeare",
  "email": "bill@stratford-upon-avon.co.uk"
}
// valid
{
  "name": "William Shakespeare",
  "email": "bill@stratford-upon-avon.co.uk",
  "address": "Henley Street, Stratford-upon-Avon, Warwickshire, England",
  "authorship": "in question"
}
// invalid
{
  "name": "William Shakespeare",
  "address": "Henley Street, Stratford-upon-Avon, Warwickshire, England",
}
// invalid
{
  "name": "William Shakespeare",
  "address": "Henley Street, Stratford-upon-Avon, Warwickshire, England",
  "email": null
}
```

#### propertyNames

`propertyNames`关键字用于验证属性的名称，而不是它们的值。

```json5
// schema
{
  "type": "object",
  "propertyNames": {
    "pattern": "^[A-Za-z_][A-Za-z0-9_]*$"
  }
}

// data
// valid
{
  "_a_proper_token_001": "value"
}
// invalid
{
  "001 invalid": "value"
}
```

#### 大小

可以使用`minProperties` 和`maxProperties`来限制属性的数量。

```json5
// schema
{
  "type": "object",
  "minProperties": 2,
  "maxProperties": 3
}

// data
{}                                    // invalid
{ "a": 0 }                            // invalid
{ "a": 0, "b": 1 }                    // valid
{ "a": 0, "b": 1, "c": 2 }            // valid
{ "a": 0, "b": 1, "c": 2, "d": 3 }    // invalid
```

### regular expressions

`pattern`和`patternProperties`关键字通过正则表达式来表示约束。

```json5
// schema
{
  "type": "string",
  "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
}

// data
"555-1212"                         // valid
"(888)555-1212"                    // valid
"(888)555-1212 ext. 532"           // invalid
```

### string

`string`类型用于文本字符串。

```json5
// schema
{ "type": "string" }


// data
""            // valid
"42"          // valid
42            // invalid
```

#### 长度

可以使用`minLength`和`maxLength`关键字来限制字符串长度。

```json5
// schema
{
  "type": "string",
  "minLength": 2,
  "maxLength": 3
}


// data
"A"                 // invalid
"AB"                // valid
"ABC"               // valid
"ABCD"              // invalid
```

#### 正则表达式

`pattern`关键字用来限定字符串为特定的正则表达式。

```json5
// schema
{
  "type": "string",
  "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
}


// data
"555-1212"                     // valid
"(888)555-1212"                // valid
"(888)555-1212 ext. 532"       // invalid
"(800)FLOWERS"                 // invalid


```

#### 格式

`format`关键字用于表达可能很难或不可能通过JSON Schema表达的值的语义信息。默认情况下`format`只是标注，不影响验证。JSON Schema定义了一些内置格式，也运行schema作者定义自己的格式。

**内置格式**：

- 日期和时间
  
  - `date-time`
  
  - `time`
  
  - `date`
  
  - `duration`

- 电子邮箱
  
  - `email`
  
  - `idn-email`

- 主机名
  
  - `hostname`
  
  - `idn-hostname`

- IP
  
  - `ipv4`
  
  - `ipv6`

- 资源标识符
  
  - `uuid`
  
  - `uri`
  
  - `uri-reference`
  
  - `iri`
  
  - `iri-reference`

- URI模板
  
  - `uri-template`

- JSON指针
  
  -  `json-pointer`
  
  - `relative-json-pointer`

- 正则表达式
  
  - `regex`

## 通用关键字

### 枚举值

`enum` 关键字用于限制值为一组固定的值。它的值必须是一个至少包含一个元素的数组，且每个元素都是唯一的。

```json5
// schema
{
    "properties": {
        "color": {
            "enum": ["red", "amber", "green"]
        }
    }
}

// data
{ "color": "red" }                // valid
{ "color": "blue" }               // invalid
```

### 常量值

`const` 关键字用于限制值为一个常量值。

```json5
// schema
{
  "properties": {
    "country": {
      "const": "United States of America"
    }
  }
}


// data
{ "country": "United States of America" }        // valid
{ "country": "Canada" }                          // invalid
```

### 注解(annotation)

JSON Schema包含一些关键字，它们本身并不严格用于验证，而是用来描述模式的一部分。这些注解关键字并不是必需的，但它们被鼓励用作最佳实践，这样可以让模式自我文档化。

注解关键字可以用在模式或子模式中。和其他关键字一样，它们只能被使用一次。

`title`和`description`关键字必须是字符串。`title`最好是简短的，`description`提供关于模式所描述据的更详细解释。

`default`关键字用于指定默认值。这个值不用做验证过程中填充缺失的值。非验证工具可能会用它来提示用户该如何使用该值。

`examples`关键字用来提供一组示例来验证模式。

布尔类型关键字`readOnly`和`writeOnly`通常应用在API上下文中。

`deprecated`关键字是个布尔值，用来表示该关键字应用的实例值不宜使用，很可能在将来会被移除。

```json
{
  "title": "Match anything",
  "description": "This is a schema that matches anything.",
  "default": "Default value",
  "examples": [
    "Anything",
    4035
  ],
  "deprecated": true,
  "readOnly": true,
  "writeOnly": false
}
```

### 注释(comment)

`$comment` 关键字严格用于向模式中添加注释，它的值必须是字符串。JSON Schema实现不允许对此副驾任何意义或行为，甚至可能随时将其删除。因此它对于JSON Schema未来的编写者留下注释很有用，但是不宜用作和模式的用户交流。

```json
{
    "$comment": "Created by John Doe",
    "type": "object",
    "properties": {
        "country": {
            "$comment": "TODO: add enum of countries"
        }
    }
}
```

### 方言(dialect)

JSON Schema的一个版本叫做方言。方言表示可用于评估模式的一组关键字和语义。JSON Schema提供了声明模式符合哪种方言的方法以及描述自定义方言的方法。

`$schema`关键字用于声明模式所编写的JSON Schema方言。`$schema` 关键字的值也是模式的标识符，可用于根据方言`$schema`标识符来验证模式是否有效。描述另一个模式的模式叫做元模式。

`$schema` 适用于整个文档，必须处在根级别。它不适用于外部引用文档（`$ref`, `$dynamicRef`），那些模式需要声明自己的`$schema`。

```json
{ "$schema": "https://json-schema.org/draft/2020-12/schema" }
```

### 条件模式验证

#### dependentRequired

`dependentRequired`关键字有条件地要求如果对象中存在某个特定属性，则某些属性必须存在。

```json5
// schema
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" },
    "billing_address": { "type": "string" }
  },
  "required": ["name"],
  "dependentRequired": {
    "credit_card": ["billing_address"]
  }
}

// data
// valid
{
  "name": "John Doe",
  "credit_card": 5555555555555555,
  "billing_address": "555 Debtor's Lane"
}
// invalid
{
  "name": "John Doe",
  "credit_card": 5555555555555555
}
// valid
{
  "name": "John Doe"
}
// valid 依赖不是双向的
{
  "name": "John Doe",
  "billing_address": "555 Debtor's Lane"
}
```

#### dependentSchemas

`dependentSchemas` 关键字在给定属性存在时有条件地应用子模式。该模式的应用方式和`allOf`相同，没有任何内容被合并或扩展，两种模式都独立应用。

```json5
// schema
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "credit_card": { "type": "number" }
  },
  "required": ["name"],
  "dependentSchemas": {
    "credit_card": {
      "properties": {
        "billing_address": { "type": "string" }
      },
      "required": ["billing_address"]
    }
  }
}

// data
// valid
{
  "name": "John Doe",
  "credit_card": 5555555555555555,
  "billing_address": "555 Debtor's Lane"
}


// invalid. 有`credit_card`但是没有`billing_address`
{
  "name": "John Doe",
  "credit_card": 5555555555555555
}

// valid
{
  "name": "John Doe",
  "billing_address": "555 Debtor's Lane"
}
```

#### If-Then-Else

`if` , `then`和`else`关键字允许基于另一个模式的结果来应用子模式。

如果`if`有效，`then`必须有效（`else`被忽略）。如果`if`无效，`else`必须有效（`then`被忽略）。

如果`then`或`else`未定义，则`if`表现得就像它们的值是true一样。

如果`then`和/或`else`出现在没有`if`的模式中，`then`和`else`会被忽略。

```json5
// schema
{
  "type": "object",
  "properties": {
    "street_address": {
      "type": "string"
    },
    "country": {
      "default": "United States of America",
      "enum": ["United States of America", "Canada"]
    }
  },
  "if": {
    "properties": {
      "country": { "const": "United States of America" }
    }
  },
  "then": {
    "properties": {
      "postal_code": { "pattern": "[0-9]{5}(-[0-9]{4})?" }
    }
  },
  "else": {
    "properties": {
      "postal_code": { "pattern": "[A-Z][0-9][A-Z] [0-9][A-Z][0-9]" }
    }
  }
}

// data
// valid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "country": "United States of America",
  "postal_code": "20500"
}

// valid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "postal_code": "20500"
}

// valid
{
  "street_address": "24 Sussex Drive",
  "country": "Canada",
  "postal_code": "K1M 1M4"
}

// invalid
{
  "street_address": "24 Sussex Drive",
  "country": "Canada",
  "postal_code": "10000"
}

// invalid
{
  "street_address": "1600 Pennsylvania Avenue NW",
  "postal_code": "K1M 1M4"
}
```

#### 蕴含

在Draft 7之前可以使用模式组合关键字和被称为蕴含的布尔代数概念来表示`if-then`条件。`A -> B`（A蕴含B）表示如果A是true，则B必须也为true。表示为JSON Schema写作`!A || B`。

```json5
// schema
{
  "type": "object",
  "properties": {
    "restaurantType": { "enum": ["fast-food", "sit-down"] },
    "total": { "type": "number" },
    "tip": { "type": "number" }
  },
  "anyOf": [
    {
      "not": {
        "properties": { "restaurantType": { "const": "sit-down" } },
        "required": ["restaurantType"]
      }
    },
    { "required": ["tip"] }
  ]
}

// data
// valid
{
  "restaurantType": "sit-down",
  "total": 16.99,
  "tip": 3.4
}

// invalid
{
  "restaurantType": "sit-down",
  "total": 16.99
}

// valid
{
  "restaurantType": "fast-food",
  "total": 6.99
}

// valid
{ "total": 5.25 }
```

`if`/`then`可表示为`A -> B`, `if`/ `else`可表示为`!A -> B`, `if`/`then`/`else`可表示为`A -> B AND !A -> C`。

## 模式组合

JSON Schema提供了强大的功能用于构建复杂灵活的模式结构。组合JSON Schema的主要方法有以下两种：

- **模块化组合**: 该方式允许将数据模型细分为可复用的组件，促进模块化和可维护性。

- **布尔组合**：该方式允许同时根据多个标准验证单个数据值。JSON Schema提供了一组像布尔运算符(AND, OR, NOT)一样的关键字来实现这一目标。

### 模块化组合

如果能将模式拆分成必要时相互引用的逻辑单元，模式将更易于维护。为了能引用模式，我们需要标识模式。模式文档由非相对URI所识别。模式文档不必需标识符，但如果需要从另一个模式中引用模式时则需要一个标识符。

#### $id

可以在模式根部通过`$id`关键字来设置base URI。`$id`的值是一个没有片段的URI引用，解析到检索URI上，生成的URI是该模式的基本URI。推荐使用绝对URI作为`$id`的值。

```json5
{
  "$id": "https://example.com/schemas/address",

  "type": "object",
  "properties": {
    "street_address": { "type": "string" },
    "city": { "type": "string" },
    "state": { "type": "string" }
  },
  "required": ["street_address", "city", "state"]
}
```

#### JSON指针

除了标识模式文档，还可以标识子模式。最常见的方式是在URI片段中使用指向子模式的JSON指针。

```json5
{
  "$id": "https://example.com/schemas/address",
  "type": "object",
  "properties": {
    "street_address": { "type": "string" },
    "city": { "type": "string" },
    "state": { "type": "string" }
  },
  "required": ["street_address", "city", "state"]
}
```

`https://example.com/schemas/address#/properties/street_address`标识以下子模式：`{ "type": "string" }`

#### 锚点

也可以在子模式中使用`$anchor`关键字创建命名锚点，然后在URI片段中使用锚点名称标识子模式。锚点必须以字母开头，后跟任意数量的字母、数字，`-`, `_`, `:`,或`.`

```json5
{
  "$id": "https://example.com/schemas/address",
  "type": "object",
  "properties": {
    "street_address": { "$anchor": "street_address", "type": "string" },
    "city": { "type": "string" },
    "state": { "type": "string" }
  }, 
  "required": ["street_address", "city", "state"]
}
```

`[https://example.com/schemas/address#street_address`]标识以下子模式：`{ "$anchor": "street_address", "type": "string" }`。

#### $ref

模式可以使用`$ref`引用另一个模式。`$ref`的值是一个URI引用，根据模式的base URI进行解析。

```json5
{
  "$id": "https://example.com/schemas/customer",

  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "shipping_address": { "$ref": "/schemas/address" },
    "billing_address": { "$ref": "/schemas/address" }
  },
  "required": ["first_name", "last_name", "shipping_address", "billing_address"]
}
```

`$ref`中的URI引用根据模式的base URI（`https://example.com/schemas/customer`）解析,得到(`https://example.com/schemas/address`)。

#### $defs

`$defs` 关键字用于保存在当前模式中复用的子模式。

```json5
{
  "$id": "https://example.com/schemas/customer",

  "type": "object",
  "properties": {
    "first_name": { "$ref": "#/$defs/name" },
    "last_name": { "$ref": "#/$defs/name" },
    "shipping_address": { "$ref": "/schemas/address" },
    "billing_address": { "$ref": "/schemas/address" }
  },
  "required": ["first_name", "last_name", "shipping_address", "billing_address"],

  "$defs": {
    "name": { "type": "string" }
  }
}


```

#### 递归

`$ref`关键字也可以用来创建递归模式，用来引用它们自己。

```json5
// schema
{
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "children": {
      "type": "array",
      "items": { "$ref": "#" }
    }
  }
}

// data
{
  "name": "Elizabeth",
  "children": [
    {
      "name": "Charles",
      "children": [
        {
          "name": "William",
          "children": [
            { "name": "George" },
            { "name": "Charlotte" }
          ]
        },
        {
          "name": "Harry"
        }
      ]
    }
  ]
}
```

#### 打包

使用多个模式文档来开发很方便，但是把所有模式打包到单个模式文档中更便于分发。可以通过在子模式中使用`$id`来完成。当子模式中使用`$id`时，表明它是一个嵌入式模式。嵌入式模式的标识符是将`$id`的值与其出现的模式的base URI进行解析的结果。包含嵌入式模式的模式文档叫做复合模式文档，复合模式文档中每个带有`$id`的模式叫做模式资源。

```json5
{
  "$id": "https://example.com/schemas/customer",
  "$schema": "https://json-schema.org/draft/2020-12/schema",

  "type": "object",
  "properties": {
    "first_name": { "type": "string" },
    "last_name": { "type": "string" },
    "shipping_address": { "$ref": "/schemas/address" },
    "billing_address": { "$ref": "/schemas/address" }
  },
  "required": ["first_name", "last_name", "shipping_address", "billing_address"],

  "$defs": {
    "address": {
      "$id": "https://example.com/schemas/address",
      "$schema": "http://json-schema.org/draft-07/schema#",

      "type": "object",
      "properties": {
        "street_address": { "type": "string" },
        "city": { "type": "string" },
        "state": { "$ref": "#/definitions/state" }
      },
      "required": ["street_address", "city", "state"],

      "definitions": {
        "state": { "enum": ["CA", "NY", "... etc ..."] }
      }
    }
  }
}
```

复合模式文档中的所有引用不管模式资源是否打包都保持一致。注意customer模式中的`$ref`关键字并没有改变,唯一的区别是address模式现在是定义在`$defs/address`而不是单独的模式文档中。

每个模式资源都是独立求值的，并可能使用不同的JSON Schema方言。如果嵌入式模式中未定义`$schema`关键字，则它会使用父模式的方言。

### 布尔组合

JSON Schema提供了一些用来组合模式的关键字，关键字如下：

- `allOf`:(AND) 必须对所有子模式有效

- `anyOf`:(OR) 必须对任一子模式有效

- `oneOf`:(XOR) 必须对恰好一个子模式有效

- `not`:(NOT) 必须不对给定模式有效

#### allOf

```json5
// schema
{
  "allOf": [
    { "type": "string" },
    { "maxLength": 5 }
  ]
}

// data
"short"                // valid
"too long"             // invalid
```

#### anyOf

```json5
// schema
{
  "anyOf": [
    { "type": "string", "maxLength": 5 },
    { "type": "number", "minimum": 0 }
  ]
}


// data
"short"        // valid
"too long"     // invalid
12             // valid
-5             // invalid
```

#### oneOf

```json5
// schema
{
  "oneOf": [
    { "type": "number", "multipleOf": 5 },
    { "type": "number", "multipleOf": 3 }
  ]
}

// data
10             // valid
9              // valid
2              // invalid
15             // invalid


```

#### not

```json5
// schema
{ "not": { "type": "string" } }


// data
42                         // valid
{ "key": "value" }         // valid
"I am a string"            // invalid


```

### media: 字符串编码非JSON数据

JSON schema有一组关键字用于描述和可选地验证存储在JSON字符串中的非JSON数据。由于很难为所有媒体类型都编写验证器，因此不需要JSON schema验证器基于这些关键字来验证JSON字符串内容，但是使用经验证的JSON的应用程序在存储和传输媒体类型数据时会使用这些关键字来对数据进行编码和解码。

#### contentMediaType

`contentMediaType`关键字指定字符串内容的媒体类型。

```json5
// schema
{
  "type": "string",
  "contentMediaType": "text/html"
}

// data
"<!DOCTYPE html><html xmlns=\"http://www.w3.org/1999/xhtml\"><head></head></html>"


```

#### contentEncoding

`contentEncoding`关键字指定用于存储内容的编码。可接受的值有：

- `quoted-printable`

- `base16`

- `base32`

- `base64`
  
  如果未指定，则使用包含的JSON文档相同的编码。

```json5
// schema
{
  "type": "string",
  "contentEncoding": "base64",
  "contentMediaType": "image/png"
}

// data
"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA..."

```

#### contentSchema

`contentSchema`的值必须是有效的JSON schema，可以用来定义内容的结构和约束。当实例是字符串时，它与`contentMediaType`一起使用。如果`contentMediaType`缺失，`contentSchema`会被忽略。

```json5
// schema
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
        "data": {
            "type": "string",
            "contentMediaType": "application/json",
            "contentEncoding": "base64",
            "contentSchema": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "age": {
                        "type": "integer"
                    }
                },
                "required": ["name", "age"]
            }
        }
    }
}

// data
"eyJuYW1lIjoiSm9obiBEb2UiLCJ0b21lIjoiMjUifQ=="            // valid
// valid
{
  "name": "John Doe",
  "age": 25
}
```
