# 安装

这边主要介绍Windows和macOS安装MongoDB Community。

## Windows

### 1.安装MongoDB

- [MongoDB zip](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.3.4.zip)

- [MongoDB MSI](https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-8.3.4-signed.msi)

### 2. 安装MongoDB Shell

从MongoDB6.0以后，MongoDB不再默认安装Shell工具，需要手动安装`mongosh`:

- [MongoDB Shell MSI](https://downloads.mongodb.com/compass/mongosh-2.9.2-x64.msi)

### 3. 运行MongoDB

MongoDB默认存放数据的目录为安装盘的`\data\db` ，需要手动创建该目录：

```bash
# required, 创建数据存放目录
mkdir C:\data\db

# optional 创建日志存放目录
mkdir C:\data\log
```

然后执行`mongod`命令运行MongoDB服务器：

```bash
mongod --dbpath="c:\data\db"
```

### 4. 连接MongoDB

通过`mongosh`连接MongoDB：

```bash
mongosh

# 相当于执行
mongosh "mongodb://127.0.0.1:27017"
```

## macOS

### 1. 安装MongoDB

macOS可通过`homebrew`安装。

- 添加MongoDB Homebrew Tap

  ```bash
  brew tap mongodb/brew
  ```

  ::: tip
  上面命令只需执行一次，下次安装时可跳过此步。
  :::

- 安装对应包：

  ```bash
  # 下面命令会同时安装mongodb-community Server, Shell和Database Tools
  brew install mongodb-community
  ```

  上面安装内容包含以下二进制文件：
  - `mongod` 服务器
  - `mongos`分片集群查询路由
  - `mongosh` shell
  - `mongodb-database-tools`

  如果只想安装Shell或Database Tools，可用以下命令：

  ```bash
  brew install mongosh
  # 或
  brew install mongodb-database-tools
  ```

  安装创建的文件和目录会因为硬件的不同而存放在不同位置：

  |                    | Intel Processor              | Apple Silicon Processor         |
  | ------------------ | ---------------------------- | ------------------------------- |
  | configuration file | `/usr/local/etc/mongod.conf` | `/opt/homebrew/etc/mongod.conf` |
  | `log directory`    | `/usr/local/var/log/mongodb` | `/opt/homebrew/var/log/mongodb` |
  | `data directory`   | `/usr/local/var/mongodb`     | `/opt/homebrew/var/mongodb`     |

### 2. 运行MongoDB

可以通过`brew`将MongoDB作为macOS服务运行，也可以作为后台进程手动运行。

- 作为macOS服务运行
  - brew启动

    ```bash
    brew services start mongodb-community
    ```

  - brew停止

    ```bash
    brew services stop mongodb-community
    ```

- 作为后台进程手动运行
  - 通过配置文件运行

    ```bash
    # Intel processors
    mongod --config /usr/local/etc/mongod.conf --fork

    # Apple Silicon Processor
    mongod --config /opt/homebrew/etc/mongod.conf --fork
    ```

  - 通过CLI参数运行

    ```bash
    mongod --dbpath /path/to/dbdir --logpath /path/to/mongodb.log --fork
    ```
