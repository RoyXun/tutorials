# 条件模式验证

## dependentRequired

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

## dependentSchemas

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

## If-Then-Else

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

## 蕴含

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