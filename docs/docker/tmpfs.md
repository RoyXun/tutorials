# tmpfs
## 简介
当在Linux上运行Docker时，可以使用tmpfs挂载，在容器写入层之外创建文件。tmpfs挂载是临时性的，仅保存在主机内存中。当容器停止时，tmpfs挂载会被移除，写入的文件不会持久化。

适用于不希望在主机或容器持久化数据的场景，可能出于安全或者程序需要写入大量非持久化数据时的性能考虑。

tmpfs挂载不会在容器间共享，只能运行在Linux的Docker上。

## 语法
可以使用`--mount`或`--tmpfs`标记创建tmpfs:
```bash
docker run --mount type=tmpfs,dst=<mount-path>
docker run --tmpfs <mount-path>
```

### --mount
`--mount`由多组逗号分隔的`<key>=<value`键值对组成，key的顺序无所谓。
```bash
docker run --mount type=tmpfs,dst=<mount-path>[,<key>=<value>...]
```
`--mount type=tmpfs`的选项有：
|选项|描述|
|---|---|
|`destination`, `dst`, `target`|用于挂载tmpfs的容器路径|
|`tmpfs-size`|tmpfs挂载的大小，以字节为单位。如果未指定，tmpfs卷的最大尺寸为主机总RAM的50%|
|`tmpfs-mode`|tmpfs文件模式，以八进制表示。默认为`1777`或所有人可写入 |

示例
```bash
docker run --mount type=tmpfs,dst=/app,tmpfs-size=21474836480,tmpfs-mode=1770
```

### --tmpfs
`--tmpfs`由两组冒号分隔的两个字段组成：
```bash
docker run --tmpfs <mount-path>[:opts]
```

第一个字段是tmpfs挂载的容器路径。第二个是可选的，逗号分隔的选项列表。可选项有：

|选项|描述|
|---|---|
|`ro`|只读模式|
|`rw`|读写模式(默认行为)|
|`nosuid`|禁止执行期间遵守`setuid`和`setgid`位|
|`suid`|允许执行期间遵守`setuid`和`setgid`位(默认行为)|
|`nodev`|可以创建文件设备但无法运行|
|`dev`|可以创建设备文件且功能运行正常|
|`exec`|允许执行已挂载的文件系统中的可执行二进制文件|
|`noexec`|不允许执行已挂载的文件系统中的可执行二进制文件|
|`sync`|文件系统所有I/O同步完成|
|`async`|文件系统所有I/O异步完成|
|`dirsync`|同步更新文件系统内的目录|
|`atime`|每次访问文件时更新文件访问时间|
|`noatime`|访问文件时不更新文件访问时间|
|`diratime`|每次访问目录时更新目录访问时间|
|`nodiratime`|访问目录时不更新目录访问时间|
|`size`|指定tmpfs挂载的大小，如`size=64m`|
|`mode`|指定tmpfs挂载到文件模式， 如`mode=1777`|
|`uid`|指定tmpfs挂载所有者的uid|
|`gid`|指定tmpfs挂载所有者的gid|
|`nr_inodes`|指定tmpfs挂载的最大inode数，如`nr_inodes=400k`|
|`nr_blocks`|指定tmpfs挂载的最大块数，如`nr_blocks=1024`|

示例：

```bash
docker run --tmpfs /data:noexec,size=1024,mode=1777
```
## 示例

:::code-group
```bash [--mount]
docker run -d \
  -it \
  --name tmptest \
  --mount type=tmpfs,destination=/app \
  nginx:latest
```
```bash [--tmpfs]
docker run -d \
  -it \
  --name tmptest \
  --tmpfs /app \
  nginx:latest
```
:::
通过查看`docker inspect` 输出的`Mounts`章节确认是`tmpfs`挂载：
```bash
docker inspect tmptest --format '{{ json .Mounts }}'

# 输出 {"/app":""}
```

停止并移除容器：
```bash
docker stop tmptest
docker rm tmptest
```