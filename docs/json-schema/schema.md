# 方言(dialect)

JSON Schema的一个版本叫做方言。方言表示可用于评估模式的一组关键字和语义。JSON Schema提供了声明模式符合哪种方言的方法以及描述自定义方言的方法。


## $schema

`$schema`关键字用于声明模式所编写的JSON Schema方言。`$schema` 关键字的值也是模式的标识符，可用于根据方言`$schema`标识符来验证模式是否有效。描述另一个模式的模式叫做元模式。

`$schema` 适用于整个文档，必须处在根级别。它不适用于外部引用文档（`$ref`, `$dynamicRef`），那些模式需要声明自己的`$schema`。

```json
{ "$schema": "https://json-schema.org/draft/2020-12/schema" }
```