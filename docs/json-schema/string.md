# string

`string`类型用于文本字符串。

```json5
// schema
{ "type": "string" }


// data
""            // valid
"42"          // valid
42            // invalid
```

## 长度

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

## 正则表达式
`pattern`关键字用于限制字符串为特定的正则表达式。

```json5
// schema
{
  "type": "string",
  "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
}

// data
"555-1212"                   // valid
"(888)555-1212"              // valid
"(888)555-1212 ext. 532"     // invalid
"(800)FLOWERS"               // invalid
```