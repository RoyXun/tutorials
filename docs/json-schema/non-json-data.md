# media: 字符串编码非JSON数据

JSON schema有一组关键字用于描述和可选地验证存储在JSON字符串中的非JSON数据。由于很难为所有媒体类型都编写验证器，因此不需要JSON schema验证器基于这些关键字来验证JSON字符串内容，但是使用经验证的JSON的应用程序在存储和传输媒体类型数据时会使用这些关键字来对数据进行编码和解码。

## contentMediaType

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

## contentEncoding

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

## contentSchema

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