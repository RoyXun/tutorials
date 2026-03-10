# numeric types

JSON Schema 有两种数字类型：`integer`和 `number`。它们共享相同的验证关键字。

## integer

`integer`用于整数。JSON没有区分整数和浮点数的不同类型，因此有没有小数点并不足以区分整数和非整数。

```json5
// schema
{ "type": "integer" }

// data
42         // valid
-1         // valid
1.0        // valid
3.1415926  // invalid
"42"       // invalid
```

## number

`number`用于任何数字类型，不管是整数还是浮点数。

```json5
// schema 
{ "type": "number" }

// data
42        // valid
-1        // valid
5.0       // valid
3.1415926 // valid
"42"      // invalid
```

## 倍数

可以使用`multipleOf`关键字将数字限定为指定数字的倍数。

```json5
// schema
{
    "type": "number",
    "multipleOf": 10
}

// data
0         // valid
10        // valid
20        // valid
23        // invalid
```

倍数也能是浮点数：

```json5
// schema
{
    "type": "number",
    "multipleOf": 0.01
}

// data
4.02        // valid
4.021       // invalid
```

## 范围

可以通过组合使用`minimum`和`maximum`（或`exclusiveMinimum和``exclusiveMaximum` ）l来指定数字范围。

如果x是要验证的值，则下面关系必须成立：
- x ≥ `minimum`
- x > `exclusiveMinimum`
- x ≤ `maximum`
- x < `exclusiveMaximum`

```json5
// schema
{
    "type": "number",
    "minimum": 0,
    "exclusiveMaximum": 100
}

// data
-1            // invalid
0             // valid
10            // valid
99            // valid
100           // invalid
101           // invalid
```
