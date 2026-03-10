# 通用关键字

## 枚举值

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

## 常量值

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

## 注解(annotation)

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

## 注释(comment)

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

