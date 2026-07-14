# 卷

## 简介
卷(volume)是由Docker创建、管理的持久数据存储。可以使用`docker volume create`命令显式创建，也可以在创建容器/服务时隐式创建。

当容器销毁时，容器的写入层一并被销毁，卷独立于容器的生命周期，使用卷可以确保即使容器被移除数据依然可以持久化。

卷可以被同时挂载到多个容器中，当没有容器在使用卷时，卷对于Docker来说依然可用，不会被自动移除。可以通过`docker volumne prune`移除不在使用的卷。

卷分为命名卷和匿名卷。匿名卷的名称是一个随机ID，在创建容器时需要使用`-rm`才能销毁容器关联的匿名卷。

挂载非空卷到容器中的目录时，目录中的文件和目录会被覆盖；挂载空卷到容器中的目录时，目录中的文件和目录会被复制到卷中。可以使用`volume-nocopy`选项防止复制文件到空卷。

## 使用场景

卷是持久化Docker生成和使用数据的首选机制。
- 完全由Docker管理，不依赖主机的目录结构和操作系统，同时适用于Windows、Linux容器；
- 可以在多个容器间安全共享；
- 卷的内容可以由容器或构建预填充；
- 适用于有高性能IO需求的应用；
- 不适合需要从主机访问文件场景。

## 语法

使用`docker run`命令挂载卷，可以使用`--mount`或`--volume`标记。
```bash
docker run --mount type=volume,src=<volume-name>,dst=<mount-path>
docker run --volume <volume-name>:<mount-path>
```
如果`<volume-name>`对应的卷不存在，Docker会自动创建该卷。

### --mount
`--mount`是更推荐的使用方式，由多组逗号分隔的`<key>=<value>`键值对组成，key的顺序无所谓。
```bash
docker run --mount type=volume[,src=<volume-name>],dst=<mount-path>[,<key>=<value>...]
```

`--mount type=volume`的选项有：
|选项|描述|
|---|---|
|`source`, `src`|挂载源。对于命名卷，是卷名；对于匿名卷，该字段省略。|
|`destination`, `dst`, `target`|文件或目录挂载到容器中的目标路径|
|`volume-subpath`|挂载到容器中的卷中的子目录路径。子目录在卷挂载到容器前必须在卷中已存在|
|`readonly`, `ro`|如果出现，表示卷只读|
|`volume-nocopy`|如果出现，表示挂载空卷时目标路径下的数据不会拷贝到卷中。默认挂载空卷时会拷贝目标路径中的数据到卷中。|
|`volume-opt`|其他选项，采用选项名和值的键值对形式，可以制定多次。|

示例：
```bash
docker run --mount type=volume,src=myvolume,dst=/data,ro,volume-subpath=/foo
```

### --volume
`--volume`或`-v`由冒号分隔的3个字段组成，字段顺序必须正确：
```bash
docker run -v [<volume-name>:]<mount-path>[:opts]
```
第一个字段是卷名（命名卷）或省略（匿名卷）；

第二个字段是卷挂载到容器中的路径；

第三个字段是可选的、逗号分隔的选项列表，可选项有：
|选项|描述|
|---|---|
|`readonly`, `ro`|只读模式|
|`volume-nocopy`|挂载空卷时目标路径下的数据不会拷贝到卷中(默认挂载空卷时会拷贝目标路径中的数据到卷中)|

示例：
```bash
docker run -v myvolume:/data:ro
```

## 常用命令

|命令|描述|
|---|---|
|`docker volume create [<OPTIONS>] [<VOLUME>]`|创建卷。如果不指定VOLUME, Docker会生成一个随机名称|
|`docker volume inspect [<OPTIONS>] <VOLUME> [<VOLUME>...]`|显示一个或多个卷的详细信息|
|`docker volume ls` \| `docker volume list` |列出卷|
|`docker volume prune`|移除未使用的本地卷|
|`docker volume rm [<OPTIONS>] <VOLUME> [<VOLUME>...]` \| `docker volume remove [<OPTIONS>] <VOLUME> [<VOLUME>...]`| 移除一个或多个卷。（不能移除使用中的卷） |

## 示例
### 运行容器时使用卷

:::code-group
```bash [--mount]
docker run -d \
  --name devtest \
  --mount source=myvol2,target=/app \
  nginx:latest
```
```bash [-v]
docker run -d \
  --name devtest \
  -v myvol2:/app \
  nginx:latest
```
:::

停止容器并移除卷：
```bash
docker container stop devtest

docker container rm devtest

docker volume rm myvol2
```

### 在Docker Compose中使用卷
```yaml
services:
  frontend:
    image: node:lts
    volumes:
      - myapp:/home/node/app
volumes:
  myapp:
```
第一次运行`docker compose up`会创建卷，后续执行该命令会复用卷。

也可以先使用`docker volume create`直接创建卷，再在`compose.yaml`中引用它：
```yaml
services:
  frontend:
    image: node:lts
    volumes:
      - myapp:/home/node/app
volumes:
  myapp:
    external: true
```

### 只读模式
:::code-group
```bash [--mount]
docker run -d \
  --name=nginxtest \
  --mount source=nginx-vol,destination=/usr/share/nginx/html,readonly \
  nginx:latest
```
```bash [-v]
docker run -d \
  --name=nginxtest \
  -v nginx-vol:/usr/share/nginx/html:ro \
  nginx:latest
```
:::
停止容器并移除卷：
```bash
docker container stop nginxtest

docker container rm nginxtest

docker volume rm nginx-vol
```