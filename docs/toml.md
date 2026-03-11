# TOML

## 简介
[TOML](https://toml.io)(Tom's Obvious, Minimal Language)是由 Tom Preston-Werner 发起设计，旨在成为语义明显且易于阅读的最小化配置文件格式。

当前最新版本为`1.1.0`。TOML 文件后缀名为`.toml`，MIME 类型为`application/toml`。

## 设计原则
- **极简语法**： 采用类 INI格式的键值对结构，避免使用复杂符号（如 YAML的缩进、JSON的逗号结尾），降低学习成本。
- **强类型定义**： 明确支持字符串、整数、浮点数、布尔值、日期时间、数组、表等数据类型，减少解析时的类型推断歧义。
- **结构化组织**：通过表嵌套实现层级化配置，相比平面键值对结构更适合复杂配置场景。
- **语言无关性**：提供多语言解析器实现，确保配置文件在不同开发环境下一致性。

## 前置知识
- TOML 大小写敏感
- 空白指 tab 或空格
- 换行指 LF 或 CRLF
- TOML 文件必须是合法的 UTF-8 编码的 unicode 文档。

## 注释
`#`将该行剩余内容标记为注释，除非它在字符串中
```toml
# This is a TOML comment

# This is a multiline
# TOML comment

# This is a full-line comment
key = "value"  # This is a comment at the end of a line
another = "# This is not a comment"
```

## 键值对
键值对是TOML的基石。

- key 和 value 周围的空白会被忽略。
- key，=, value 必须在一行（有些 value 可以跨多行）。
- value 必须是以下类型之一：
  - [String](#string)
  - [Integer](#number)
  - [Float](#number)
  - [Boolean](#boolean)
  - [Offset Date-Time](#datetime)
  - [Local Date-Time](#datetime)
  - [Local Date](#datetime)
  - [Local Time](#datetime)
  - [Array](#array)
  - [Inline Table](#inline-table)
  ```toml
  key = # INVALID,不指定value是不合法的
  ```
- 键值对后面必须是**换行**/**EOF**。
  ``` toml
  first = "Tom" last = "Preston-Werner" # INVALID
  ```

## 键名 {#keys}
key 可以是**裸键**，**引号键**或**点分隔键**。

**裸键**仅能包含`A-Za-z0-9_-`。
```toml
key = "value"
bare_key = "value"
bare-key = "value"
1234 = "value"  # 1234被解释为字符串
```

**引号键**遵循**基本字符串**、**字面量字符串**相同的规则，除非必要尽量使用裸键。
``` toml
“127.0.0.1" = "value"
"character encoding" = "value"
"key2" = "value"
'quoted "value"' = "value" 

= "no key name"  # INVALID
"""key""" = "not allowed"  # INVALID
"" = "blank"    # VALID but discouraged
'' = 'blank'    # VALID but discouraged
```

**点分隔键**是一系列点号连接的裸键或引号键。用于相似属性分组。
::: code-group 
```toml
name = "Orange"
physical.color = "orange"
physical.shape = "round"
site."google.com" = true
```
```json
{
  "name": "Orange",
  "physical": {
    "color": "orange",
    "shape": "round"
  },
  "site": {
    "goole.com": true
  }
}
```
:::

点分隔符周围的空白会被忽略。
```toml
fruit.name = "banana"     # this is best practice
fruit. color = "yellow"   # same as fruit.color
fruit . flavor = "banana" # same as fruit.flavor
```

不能重复定义同一个键，裸键和引号键是等价的。
```toml
# DO NOT DO THIS
name = "Tom"
name = "Jack"

# THIS WILL NOT WORK
spelling = "favorite"
"spelling" = "favourite"
```

只要键还没有直接定义，可以直接对它和它的下属键名赋值。
```toml
# VALID
fruit.apple.smooth = true
fruit.orange = 2
```
```toml
# THE FOLLOWING IS INVALID
fruit.apple = 1
fruit.apple.smooth = true
```

## 字符串 {#string}
有四种字符串：
- **基本字符串**: 使用双引号包裹，支持转义字符。
  ```toml
  str1 = "I'm a string."
  str2 = "You can \"quote\" me."
  str3 = "Name\tJos\u00E9\nLoc\tSF."
  ```
- **多行基本字符串**: 由两边各三个双引号包裹，允许折行。
  
  紧随开头引号的换行符会被剔除，其他空白和换行符原样保留。
  ```toml
  str1 = """
  Roses are red
  Violets are blue"""

  # On a Unix system, the above multi-line string will most likely be the same as:
  str2 = "Roses are red\nViolets are blue"

  # On a Windows system, it will most likely be equivalent to:
  str3 = "Roses are red\r\nViolets are blue"
  ```

  用行末反斜杠自动剔除非空白字符前的任意空白字符：
  ```toml
  # The following strings are byte-for-byte equivalent:
  str1 = "The quick brown fox jumps over the lazy dog."

  str2 = """
  The quick brown \


    fox jumps over \
      the lazy dog."""

  str3 = """\
        The quick brown \
        fox jumps over \
        the lazy dog.\
        """
  ```

  可以在多行基本字符串中任意位置写一或两个连续的引号：
  ```toml
  str4 = """Here are two quotation marks: "". Simple enough."""
  # str5 = """Here are three quotation marks: """."""  # INVALID
  str5 = """Here are three quotation marks: ""\"."""
  str6 = """Here are fifteen quotation marks: ""\"""\"""\"""\"""\"."""

  # "This," she said, "is just a pointless statement."
  str7 = """"This," she said, "is just a pointless statement.""""
  ```

- **字面量**：由单引号包裹，没有转义行为，所见即所得。
  ```toml
  # What you see is what you get.
  winpath  = 'C:\Users\nodejs\templates'
  winpath2 = '\\ServerX\admin$\system32\'
  quoted   = 'Tom "Dubs" Preston-Werner'
  regex    = '<\i\c*\s*>'
  
  ```
  由于没有转义，所以无法在字面量字符串中写单引号。
- **多行字面量**: 由两边各三个单引号包裹，允许换行，没有转义行为。
  ```toml
  regex2 = '''I [dw]on't need \d{2} apples'''
  lines  = '''
  The first newline is
  trimmed in literal strings.
    All other whitespace
    is preserved.
  '''
  ```
  可以在多行字面量字符串中任意位置写一或两个连续的单引号：
  ```toml
  quot15 = '''Here are fifteen quotation marks: """""""""""""""'''

  # apos15 = '''Here are fifteen apostrophes: ''''''''''''''''''  # INVALID
  apos15 = "Here are fifteen apostrophes: '''''''''''''''"

  # 'That,' she said, 'is still pointless.'
  str = ''''That,' she said, 'is still pointless.''''
  ```
## 数字 {#number}
```toml
# integers
int1 = +99
int2 = 42
int3 = 0
int4 = -17

# hexadecimal with prefix `0x`
hex1 = 0xDEADBEEF
hex2 = 0xdeadbeef
hex3 = 0xdead_beef

# octal with prefix `0o`
oct1 = 0o01234567
oct2 = 0o755

# binary with prefix `0b`
bin1 = 0b11010110

# fractional
float1 = +1.0
float2 = 3.1415
float3 = -0.01

# exponent
float4 = 5e+22
float5 = 1e06
float6 = -2E-2

# both
float7 = 6.626e-34

# separators
float8 = 224_617.445_991_228

# infinity
infinite1 = inf # positive infinity
infinite2 = +inf # positive infinity
infinite3 = -inf # negative infinity

# not a number
not1 = nan
not2 = +nan
not3 = -nan 
```

## 布尔值 {#boolean}
``` toml
bool1 = true
bool2 = false
```

## 日期时间 {#datetime}
```toml
# offset datetime
odt1 = 1979-05-27T07:32:00Z
odt2 = 1979-05-27T00:32:00-07:00
odt3 = 1979-05-27T00:32:00.999999-07:00

# local datetime
ldt1 = 1979-05-27T07:32:00
ldt2 = 1979-05-27T00:32:00.999999

# local date
ld1 = 1979-05-27

# local time
lt1 = 07:32:00
lt2 = 00:32:00.999999
```

## 数组 {#array}

数组中元素由逗号分隔，空白会被忽略。
```toml
integers = [ 1, 2, 3 ]
colors = [ "red", "yellow", "green" ]
nested_arrays_of_ints = [ [ 1, 2 ], [3, 4, 5] ]
nested_mixed_array = [ [ 1, 2 ], ["a", "b", "c"] ]
string_array = [ "all", 'strings', """are the same""", '''type''' ]

# Mixed-type arrays are allowed
numbers = [ 0.1, 0.2, 0.5, 1, 2, 5 ]
contributors = [
  "Foo Bar <foo@example.com>",
  { name = "Baz Qux", email = "bazqux@example.com", url = "https://example.com/bazqux" }
]
```

数组可以跨行，允许尾逗号。
```toml
integers2 = [
  1, 2, 3
]

integers3 = [
  1,
  2, # this is ok
]
```

## 表
表也叫做哈希表或字典，是键值对的集合。
```toml
[table]

[table-1]
key1 = "some string"
key2 = 123

[table-2]
key1 = "another string"
key2 = 456
```

表的命名规则和[键名](#keys)的规则相同。
::: code-group
```toml
[dog."tater.man"]
type.name = "pug"
```
```json
{ "dog": { "tater.man": { "type": { "name": "pug" } } } }
```
:::

键名周围的空白会被忽略，但是最好不要有多余的空白。
```toml
[a.b.c]            # this is best practice
[ d.e.f ]          # same as [d.e.f]
[ g .  h  . i ]    # same as [g.h.i]
[ j . "ʞ" . 'l' ]  # same as [j."ʞ".'l']
```

不用层层完整地定义父表。
```toml
# [x] you
# [x.y] don't
# [x.y.z] need these
[x.y.z.w] # for this to work

[x] # defining a super-table afterward is ok
```

和键名一样，不能重复定义表。
```toml
# DO NOT DO THIS

[fruit]
apple = "red"

[fruit]
orange = "orange"
```

```toml
# DO NOT DO THIS EITHER

[fruit]
apple = "red"

[fruit.apple]
texture = "smooth"
```
## 内联表
内联表被完整的定义在`{`和`}`中，括号中可包含0或多个逗号分隔的键值对。
::: code-group 
```toml [inline table]
name = { first = "Tom", last = "Preston-Werner" }
point = {x=1, y=2}
animal = { type.name = "pug" }
contact = {
    personal = {
        name = "Donald Duck",
        email = "donald@duckburg.com",
    },
    work = {
        name = "Coin cleaner",
        email = "donald@ScroogeCorp.com",
    },
}
```
```toml [table]
[name]
first = "Tom"
last = "Preston-Werner"

[point]
x = 1
y = 2

[animal]
type.name = "pug"

[contact.personal]
name = "Donald Duck"
email = "donald@duckburg.com"

[contact.work]
name = "Coin cleaner"
email = "donald@ScroogeCorp.com"
```
:::

内联表将所有的键和子表都定义在内部，键名和子表不能在括号外添加。
```toml
[product]
type = { name = "Nail" }
# type.edible = false  # INVALID
```
内联表也不能用于向已定义的表添加键名或子表。
```toml
[product]
type.name = "Nail"
# type = { edible = false }  # INVALID
```
## 表数组
::: code-group
```toml
[[product]]
name = "Hammer"
sku = 738594937

[[product]]  # empty table within the array

[[product]]
name = "Nail"
sku = 284758393

color = "gray"
```
```json
{
  "product": [
    { "name": "Hammer", "sku": 738594937 },
    {},
    { "name": "Nail", "sku": 284758393, "color": "gray" }
  ]
}
```
:::

对数组的引用指向最近定义的表元素，这样允许在最近的表内定义子表，甚至子表数组。
::: code-group
```toml
[[fruits]]
name = "apple"

[fruits.physical]  # subtable
color = "red"
shape = "round"

[[fruits.varieties]]  # nested array of tables
name = "red delicious"

[[fruits.varieties]]
name = "granny smith"


[[fruits]]
name = "banana"

[[fruits.varieties]]
name = "plantain"
```
```json
{
  "fruits": [
    {
      "name": "apple",
      "physical": {
        "color": "red",
        "shape": "round"
      },
      "varieties": [{ "name": "red delicious" }, { "name": "granny smith" }]
    },
    {
      "name": "banana",
      "varieties": [{ "name": "plantain" }]
    }
  ]
}
```
:::