# regular expressions

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

