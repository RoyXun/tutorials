# 模式组合

JSON Schema提供了强大的功能用于构建复杂灵活的模式结构。组合JSON Schema的主要方法有以下两种：

- **模块化组合**: 该方式允许将数据模型细分为可复用的组件，促进模块化和可维护性。

- **布尔组合**：该方式允许同时根据多个标准验证单个数据值。JSON Schema提供了一组像布尔运算符(AND, OR, NOT)一样的关键字来实现这一目标。

## 模块化组合

如果能将模式拆分成必要时相互引用的逻辑单元，模式将更易于维护。为了能引用模式，我们需要标识模式。模式文档由非相对URI所识别。模式文档不必需标识符，但如果需要从另一个模式中引用模式时则需要一个标识符。

### $id

可以在模式根部通过`$id`关键字来设置base URI。`$id`的值是一个没有片段的URI引用，解析到检索URI上，生成的URI是该模式的基本URI。**推荐使用绝对URI作为`$id`的值**。

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

### JSON指针

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

### 锚点

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

`https://example.com/schemas/address#street_address`标识以下子模式：`{ "$anchor": "street_address", "type": "string" }`。

### $ref

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

### $defs

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

### 递归

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

### 打包

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

## 布尔组合

JSON Schema提供了一些用来组合模式的关键字，关键字如下：

- `allOf`:(AND) 必须对所有子模式有效
- `anyOf`:(OR) 必须对任一子模式有效
- `oneOf`:(XOR) 必须对恰好一个子模式有效
- `not`:(NOT) 必须不对给定模式有效

### allOf

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

### anyOf

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

### oneOf

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

### not

```json5
// schema
{ "not": { "type": "string" } }

// data
42                         // valid
{ "key": "value" }         // valid
"I am a string"            // invalid
```