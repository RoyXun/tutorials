# YAML

## 简介
[YAML](https://yaml.org/)（YAML Ain't Markup Language, 读音和`camel`押韵）是一种人类友好的数据序列化语言，适用于所有编程语言。YAML 常用于配置文件、日志文件、进程间通讯、跨语言数据共享、对象持久化和复杂数据结构调试等场景。YAML 配置文件的后缀名为`.yaml`或`.yml`。

## 数据类型
YAML 支持 3种基本类型：
- **映射(Mapping)**: 键值对集合，用`key: value`或`{}`表示，也叫**hash**/**dictionary**。
- **序列(Sequence)**: 有序列表，用`- `或`[]`表示，也叫**array**/**list**
- **标量(Scalar)**: 单个值，***string**/**number**/**boolean**/**null**等

## 基本语法
- 注释以`#`开头，必须通过空白字符与其他标记分开。
- 使用空格缩进表示层级关系，相同缩进表示同一层级，缩进数量任意但需一致。
- **映射**使用**冒号**+**空格**(`: `)标记键值对
::: code-group
```yaml
hr:  65    # Home runs
avg: 0.278 # Batting average
rbi: 147   # Runs Batted In
```
```json
{
  "hr": 65,
  "avg": 0.278,
  "rbi": 147
}
```
:::

- **序列**使用**短横杠**+**空格**(`- `)标识每个条目
::: code-group
```yaml [yaml]
- Mark McGwire
- Sammy Sosa
- Ken Griffey
```
```json
[
  "Mark McGwire",
  "Sammy Sosa",
  "Ken Griffey"
]
```
:::

- 使用三条横杠(`---`)分隔指令和文档内容，如果没有指令，也表示文档开始。使用三个点(`...`)表示文档结束。

```yaml
# Ranking of 1998 home runs
---
- Mark McGwire
- Sammy Sosa
- Ken Griffey

# Team ranking
---
- Chicago Cubs
- St Louis Cardinals
```
```yaml
---
time: 20:03:20
player: Sammy Sosa
action: strike (miss)
...
---
time: 20:03:47
player: Sammy Sosa
action: grand slam
...
```

## 样式 styles
主要有两组不同的样式：
- 块样式(block styles): 使用缩进表示层级结构
- 流样式(flow styles): 依赖显式指示符
![Node Styles](/images/yaml/styles.svg)

## 映射 mappings
映射使用**冒号** + **空格**(`: `)标记键值对:
::: code-group
```yaml
animal: pets
```
```json
{
  "animal": "pets"
}
```
:::
也可以写成`{`和`}`表示的流式写法：
::: code-group
```yaml
hash: { name: Steve, foo: bar}
```
```json
{
  "hash": {
    "name": "Steve",
    "foo": "bar"
  }
}
```
:::

`?` 表示是一个映射的 key：
::: code-group
```yaml
?
  - key1
  - key2
:
  - value1
  - value2
```
```json
{
  "[key1, key2]": [
    "value1", 
    "value2"
  ]
}
```
:::

## 序列 sequences
序列使用`- `标识每个条目:
::: code-group
```yaml
- A
- B
- C
```
```json
[
  "A", 
  "B", 
  "C"
]
```
:::
也可以写成`[`和`]`表示的流式写法：
::: code-group
```yaml
animal: [Dog, Cat]
```
```json
{
  "animal": [
    "Dog",
    "Cat"
  ]
}
```
:::

## 标量 scalars
标量是最基本的、不可再分的值。有以下几种标量：
- **bool**: `true` | `True` | `TRUE` | `false` | `False` | `FALSE`
- **int**: `[-+]? [0-9]+` | `0o [0-7]+` | `0x [0-9a-fA-F]+`
- **float**: `[-+]? ( \. [0-9]+ | [0-9]+ ( \. [0-9]* )? ) ( [eE] [-+]? [0-9]+ )?` | `[-+]? ( \.inf | \.Inf | \.INF )` | `\.nan | \.NaN | \.NAN`
- **null**: `null` | `Null` | `NULL` | `~` | `/* Empty */`
- **str**: `*`(default)

### 字符串
字符串可以不带引号(plain style):
::: code-group
```yaml
str: 字符串
```
```json
{
  "str": "字符串"
}
```
:::

如果字符串中包含特殊字符，需要放在引号中：
::: code-group
```yaml
str: "a\tb"
```
```json
{
  "str": "a\tb"
}
```
:::

::: tip
双引号不会对特殊字符进行转义；

单引号中`\`和`"`可以随意使用无需转义，唯一需要转义的场景是使用两个单引号(`''`)来表示单个`'`。
:::

::: code-group
```yaml
s1: 'a\nb'
s2: "a\nb"
single: 'here''s to "quotes"'
```
```json
{
  "s1": "a\\nb",
  "s2": "a\nb",
  "single": "here's to \"quotes\""
}
```
:::

字符串可以写成多行，从第二行开始，必须有一个单空格缩进，换行符会被转为空格：
::: code-group
```yaml
str: A
 B
 C
```
```json
{
  "str": "A B C"
}
```
:::

多行字符串可以使用`|`(**字面量样式 literal style**)保留换行符，或者`>`(**折叠样式 folded style**)折叠换行符：
::: code-group
```yaml
this: |
  Foo
  Bar
that: >
  Foo
  Bar
```
```json
{
  "this": "Foo\nBar\n",
  "that": "Foo Bar\n"
}
```
:::

`+`表示保留文字块末尾的换行，`-`表示删除末尾的换行：
::: code-group
```yaml
s1: |
  Foo

s2: |+
  Foo


s3: |-
  Foo
```
```json
{
  "s1": "Foo\n",
  "s2": "Foo\n\n\n",
  "s3": "Foo"
}
```
:::

## 锚点和别名
`&`锚点和`*`别名可以用来引用：

::: code-group
```yaml
defaults: &defaults     # 创建锚点
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults         # 引用锚点，<<表示合并到当前数据

test:
  database: myapp_test
  <<: *defaults
```
```json
{
  "defaults": {
    "adapter": "postgres",
    "host": "localhost"
  },
  "development": {
    "database": "myapp_development",
    "adapter": "postgres",
    "host": "localhost"
  },
  "test": {
    "database": "myapp_test",
    "adapter": "postgres",
    "host": "localhost"
  }
}
```
:::

## 指令 Directives
指令在不缩进的单独行上指定，以`%`开头，后跟指令名称和参数列表。YAML目前定义了两个指令：**YAML** 和 **TAG**,其他所有的指令都保留给未来版本的 YAML。

### YAML指令
`YAML` 指令用于指定文档遵循的YAML版本。目前版本是`1.2`: `%YAML 1.2`。

### TAG指令
`TAG`指令用于简化标签书写，本质是为长标签 URI 定义短句柄，避免重复书写冗长的全局标签URI。基本语法为`%TAG <handle> <prefix>`。

**句柄(handle)**必须以`!`开头，有 3 种形式：
- `!`: 主句柄
- `!!`: 保留句柄（预定义，映射到`tag:yaml.org,2002:`）
- `!xxx!`: 命名句柄

**前缀(prefix)**如果不是以`!`开头，则必须是合法的 URI。

::: code-group
``` yaml [input]
%TAG !m! !my-
--- # Bulb here
!m!light fluorescent
...
%TAG !m! !my-
--- # Color here
!m!light green
```
``` [output]
!<!my-light> "fluorescent"
---
!<!my-light> "green"
```
:::

::: code-group
``` yaml [input]
%TAG !e! tag:example.com,2000:app/
---
- !e!foo "bar"
```
``` [output]
- !<tag:example.com,2000:app/foo> "bar"
```
:::

## 标签 Tag
当节点没有显式 Tag 时，处理器会按Schema推断类型。
```yaml
# 隐式推断为整数
age: 24

# 隐式推断为布尔值
enabled: false

# 隐式推断为时间戳
date: 2024-03-14
```
显式 Tag 可以强制指定类型，避免隐式推断的歧义。
```yaml
# 全局Tag标识为整数类型
age: tag:yaml.org,2002:int 25

# 也可以简写成
age: !!int 25
```

### 内置Tag
- `!!str`: 字符串
- `!!int`: 整数
- `!!float`: 浮点数
- `!!bool`: 布尔值
- `!!null`: 空值
- `!!seq`: 序列
- `!!map`: 映射
- `!!binary`: 二进制数据
- `!!timestamp`: 时间戳

