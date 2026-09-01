# 连接

使用连接字符串定义MongoDB实例和以下目标之间的连接：

- 应用程序，当使用驱动进行连接时；
- MongoDB Compass或MongoDB Shell等工具

可以使用`db.getMongo()`方法获取连接字符串信息。

## 连接格式

MongoDB连接字符串有两种格式：

- **SRV连接格式**：具有与 DNS SRV 记录相对应的主机名的连接字符串。
- **标准连接字符串格式**：一个连接字符串，用来指定运行 [`mongod`](https://www.mongodb.com/docs/manual/reference/program/mongod/#mongodb-binary-bin.mongod) 或 [`mongos`](https://www.mongodb.com/docs/manual/reference/program/mongos/#mongodb-binary-bin.mongos) 实例的所有主机。

尽可能使用SRV连接格式。

SRV URI 连接模式具有以下形式：

```bash
mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]
```

标准 URI 连接模式的形式如下：

```bash
mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
```

::: tip
当用户名或密码包含以下字符时，需要使用[百分号编码](https://datatracker.ietf.org/doc/html/rfc3986#section-2.1)转义:

```
$ : / ? # [ ] @
```

:::

## 连接选项

连接选项是`name=value`对形式，`name`不区分大小写，`value`区分大小写，多组选项使用`&`分隔: `name1=value1&name2=value2`。

一些常见的选项有：

- **authSource**: 指定认证数据库。如果指定了`<defaultauthdb>`, 则默认为`<defaultauthdb>`,否则为`admin`数据库。
- **replicaSet**: 指定副本集名称。
- **ssl**: 启用SSL连接，`true`或`false`。
- **readPreference**: 指定读偏好。 `primary`(默认), `primaryPreferred`, `secondary`, `secondaryPreferred`和`nearest`。
- **connectTimeoutMS**: 指定连接超时时间，单位为毫秒。
- **socketTimeoutMS**: 指定套接字超时时间，单位为毫秒。

## 示例

### 本地运行的admin数据库

以用户`myDatabaseUser`身份，`D1fficultP%40ssw0rd`密码连接并登录到`admin`数据库。

```
mongodb://myDatabaseUser:D1fficultP%40ssw0rd@localhost
```

### 本地运行的record数据库

以用户`myDatabaseUser`身份，`D1fficultP%40ssw0rd`密码连接并登录到`records`数据库。

```
mongodb://myDatabaseUser:D1fficultP%40ssw0rd@localhost/records
```

### UNIX域套接字

以用户`myDatabaseUser`身份，`D1fficultP%40ssw0rd`密码连接并登录到文件路径为`/tmp/mongodb-27017.sock`的UNIX域套接字。

```
mongodb://myDatabaseUser:D1fficultP%40ssw0rd@%2Ftmp%2Fmongodb-27017.sock
```

### 成员位于不同主机上的副本集

以用户`myDatabaseUser`身份，`D1fficultP%40ssw0rd`密码连接并登录到具有两个成员的名为`test`的副本集，一个在`db1.example.net`上，另一个在`db2.example.net`上。

```
mongodb://myDatabaseUser:D1fficultP%40ssw0rd@db1.example.net,db2.example.com/?replicaSet=test
```

### 成员位于本地主机的副本集

以用户`myDatabaseUser`身份，`D1fficultP%40ssw0rd`密码连接并登录到名为`myRepl`的副本集，该副本集有3个成员分别运行在端口`27017`,`27018`和`27019`上。

```
mongodb://myDatabaseUser:D1fficultP%40ssw0rd@localhost:27017,localhost:27018,localhost:27019/?replicaSet=myRepl
```

### 支持读分发的副本集

以用户`myDatabaseUser`身份，`D1fficultP%40ssw0rd`密码连接并登录到名为`myRepl`的副本集，该副本集有3个成员并且分发读操作到从节点上。

```
mongodb://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com:27017,mongodb1.example.com:27017,mongodb2.example.com:27017/?replicaSet=myRepl&readPreference=secondary
```
