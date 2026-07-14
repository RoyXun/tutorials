# 绑定挂载

## 简介
当使用绑定挂载(bind mount)时，主机上的文件或目录会从主机挂载到容器中。相比之下，使用卷时，会在主机上的Docker存储目录中创建一个新目录，并且由Docker对其内容进行管理。

当绑定挂载文件或目录到容器中的非空目录时，目录中的文件会被挂载覆盖。

绑定挂载由Docker守护进程主机创建，而不是客户端创建。Docker Desktop的守护进程运行在Linux虚拟机上，而不是直接运行在本地主机上。Docker Desktop的内置机制可以透明地处理绑定挂载，允许将本地文件系统路径共享给虚拟机中运行的容器。

## 使用场景
绑定挂载适用于以下场景：
- 在Docker主机上的开发环境和容器之间共享源码或构建工件；
- 在容器内创建文件，持久化到主机文件系统；
- 共享主机上的配置文件到容器。

## 语法
可以使用`--mount`或`--volume`创建绑定挂载：
```bash
docker run --mount type=bind,src=<host-path>,dst=<container-path>
docker run --volume <host-path>:<container-path>
```

如果`<host-path>`在Docker主机上不存在时，使用`--volume`会自动在主机上创建该目录；而`--mount`会报错。

### --mount
`--mount`由多组逗号分隔的`<key>=<value>`键值对组成，key的顺序无所谓。
```bash
docker run --mount type=bind,src=<host-path>,dst=<container-path>[,<key>=<value>...]
```
`--mount type=bind`的选项有：
|选项|描述|
|---|---|
|`source`, `src`|主机上文件或目录位置。可以是绝对路径或相对路径。|
|`destination`, `dst`, `target`|文件或目录挂载到容器中的目标路径。**必须是绝对路径**|
|`readonly`, `ro`|如果出现，表示只读模式|
|`bind-propagation`|如果出现，改变绑定传播|

示例：
```bash
docker run --mount type=bind,src=.,dst=/project,ro,bind-propagation=rshared
```

### --volume
`--volume`或`-v`由冒号分隔的3个字段组成，字段顺序必须正确：
```bash
docker run -v <host-path>:<container-path>[:opts]
```

第一个字段是用于绑定挂载到容器的主机上的文件或目录路径。

第二个字段是挂载到容器中的目标路径。

第三个是可选的、由逗号分隔的选项列表，可选项有：
|选项|描述|
|---|---|
|`readonly`, `ro`|只读模式|
|`z`, `Z`|配置SELinux标签, `z`表示绑定挂载内容可由多个容器共享；`Z`表示绑定挂载内容是私有的、非共享的。|
|`rprivate`(default)|设置绑定传播为`rprivate`|
|`private`|设置绑定传播为`private`|
|`rshared`|设置绑定传播为`rshared`|
|`shared`|设置绑定传播为`shared`|
|`rslave`|设置绑定传播为`rslave`|
|`slave`|设置绑定传播为`slave`|

示例：
```bash
docker run -v .:/project:ro,rshared
```

## 示例
### 运行容器时使用绑定挂载
:::code-group
```bash [--mount]
docker run -d \
  -it \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  nginx:latest
```
```bash [-v]
docker run -d \
  -it \
  --name devtest \
  -v "$(pwd)"/target:/app \
  nginx:latest
```
:::

停止并移除容器：
```bash
docker container rm -fv devtest
```

### 使用Docker Compose绑定挂载
```yaml
services:
  frontend:
    image: node:lts
    volumes:
      - type: bind
        source: ./static
        target: /opt/app/static
volumes:
  myapp:
```

### 只读模式
:::code-group
```bash [--mount]
docker run -d \
  -it \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app,readonly \
  nginx:latest
```
```bash [-v]
docker run -d \
  -it \
  --name devtest \
  -v "$(pwd)"/target:/app:ro \
  nginx:latest
```
:::

停止并移除容器：
```bash
docker container rm -fv devtest
```