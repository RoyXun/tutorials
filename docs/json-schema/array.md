# array
数组有两种使用方式：

1. **列表验证**： 任意长度序列，每一项都匹配相同的模式。
2. **元组验证**：固定长度序列，每一项都可能有不同的模式。

## items

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

## prefixItems

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

## 额外项目

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
```

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
  "items": { "type": "string" }
}

// data
[1600, "Pennsylvania", "Avenue", "NW", "Washington"] // valid
[1600, "Pennsylvania", "Avenue", "NW", 20500]        // invalid
```

## unevaluatedItems

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
```

```json5
// schema
{
  "allOf": [{ "prefixItems": [{ "type": "boolean" }, { "type": "string" }] }],
  "unevaluatedItems": { "const": 2 }
}

// data
[true, "a", 2]  // valid
```

## contains

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

## minContains / maxContains
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

## 长度

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

## 唯一性

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