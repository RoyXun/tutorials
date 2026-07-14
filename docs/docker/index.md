# 简介

## Docker是什么

[Docker](https://www.docker.com/)是一个Go语言开发的开源应用容器引擎与平台，基于容器技术实现应用的打包、分发、运行与隔离，提供一致的运行环境。支持一次构建，到处运行。

## 特性

- **环境标准化**：Docker将应用及其依赖打包在一起，确保在任何环境中都能一致运行。
- **轻量级**：Docker容器共享宿主机的操作系统内核，比虚拟机更轻量。
- **快速部署**：秒级启动容器，支持自动化扩缩容。
- **高可移植性**：一次构建、到处运行。

## Docker架构

Docker采用C/S架构。Docker客户端与Docker守护进程通信，后者承担了构建、运行和分发Docker容器的重任。Docker客户端可以和Docker守护进程运行在同一系统上，也可以连接到远程Docker守护进程。

![docker architecture](/images/docker/docker-architecture.webp)

### Docker工作流程

- **构建镜像**：使用`Dockerfile`构建镜像。
- **推送镜像**：通过`docker push`将镜像推送到镜像仓库。
- **拉取镜像**：通过`docker pull`从镜像仓拉取镜像。
- **运行容器**：通过`docker run`使用镜像创建并启动容器。
- **管理容器**：使用Docker客户端命令管理容器。
- **网络和存储**：容器之间使用Docker网络连接，数据通过Docker卷或绑定挂载进行持久化。

### Docker守护进程

Docker守护进程(`dockerd`)是Docker的核心，它监听Docker API请求，管理镜像、容器、网络和卷等Docker对象。守护进程还可以和其他守护进程通信来管理Docker服务。

### Docker客户端

Docker客户端(`docker`)是与Docker守护进程进行交互的CLI，是用户和Docker交互的主要方式。当使用诸如`docker run`命令时，客户端会将命令发送给`dockerd`执行。客户端可以与多个守护进程进行通信。

### Docker Engine

Docker Engine是一种开源的容器化技术，用于构建和容器化应用程序。它包含Docker守护进程(`dockerd`)、REST API和Docker CLI客户端。

### Docker Desktop

Docker Desktop是Mac、Windows或Linux下的一站式解决方案，集成了Docker守护进程、Docker客户端、Docker Compose、Docker Content Trust, Kubernetes和Credential Helper。

### Docker Compose

Docker Compose是一个用于定义和运行多容器Docker应用程序的工具。用户使用YAML文件(`compose.yaml`)定义多个服务，可以通过一个命令启动配置中定义的所有服务。

### 镜像仓库

镜像仓库(registry)是存储和分发镜像的平台。[Docker Hub](https://hub.dockermirror.com/)是官方公共镜像仓，Docker默认从Docker Hub查找镜像。也可以搭建配置私有仓。

## Docker对象

### 镜像

[镜像(image)](./image)是一个用于创建容器的只读模板，包含创建容器所需的所有内容：文件系统、程序代码、依赖、环境变量、配置及启动命令。采用分层存储，可复用、版本化、不可变。

### 容器

[容器(container)](./container)是基于镜像创建的运行实例，是一个独立、轻量级的运行环境，包含应用代码、运行时、库、环境变量与配置文件等，具有隔离性。

### 卷

[卷(volume)](./volume)是容器内的一个特殊目录，绕过了联合文件系统。旨在独立于容器生命周期持久化数据。

### 网络

[网络(network)](./network)允许容器之间相互通信，并与外部世界进行连接。
