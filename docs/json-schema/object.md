# object

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

## properties

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

## patternProperties

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

## additionalProperties

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
```

```json5
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
```

```json5
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

## unevaluatedProperties

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

## required

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

## propertyNames

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

## 大小

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

