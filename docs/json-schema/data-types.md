# 数据类型

## type
`type` 关键字是JSON Schema的基础，它指定了schema期待的数据类型。

JSON Schema定义了以下基本类型：

- [array](./array.md)
- [boolean](./boolean.md)
- [null](./null.md)
- [numeric](./numeric.md)(`number` / `integer`)
- [object](./object.md)
- [regular expressions](./regular-expressions.md)
- [string](./string.md)

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
```

```json5
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
| [array](./array.md)             | `items`, `prefixItems` , `unevaluatedItems`,  `contains`,  `maxContains`, `minContains`, `minItems`, `maxItems`, `uniqueItems`                    | 定义项目模式，额外项目处理， 项目数量约束和唯一性。           |
| [number / integer](./numeric.md) | `minimum`, `maximum`, `exclusiveMinimum`, `exclusiveMaximum`, `multipleOf`                                                                        | 定义数字范围，包括排他性边界和可整除性。                 |
| [object](./object.md)            | `required`, `properties`,  `additionalProperties`, `unevaluatedProperties`, `patternProperties`, `minProperties`, `maxProperties`, `dependencies` | 定义必需属性、属性模式、额外属性处理，基于模式的属性匹配和属性数量约束。 |
| [string](./string.md)            | `minLength`, `maxLength`, `pattern`, `format`                                                                                                     | 限制字符串长度，模式匹配和格式验证                    |

## format

`format`关键字用于表达可能很难或不可能通过JSON Schema表达的值的语义信息。默认情况下`format`只是标注，不影响验证。

JSON Schema定义了一些内置格式，也运行schema作者定义自己的格式。

### 内置格式

#### 日期和时间
  - `date-time`
  - `time`
  - `date`  
  - `duration`

#### 电子邮箱
  - `email`
  - `idn-email`

#### 主机名
  - `hostname`
  - `idn-hostname`

#### IP
  - `ipv4`
  - `ipv6`

#### 资源标识符
  - `uuid`
  - `uri`
  - `uri-reference`
  - `iri`
  - `iri-reference`

#### URI模板
  - `uri-template`

#### JSON指针
  -  `json-pointer`
  - `relative-json-pointer`

#### 正则表达式
  - `regex`