# 角色

角色授予在定义的资源上执行一系列操作的权限。角色适用于定义它的数据库，并可以授予集合粒度级别的访问权限。

MongoDB基于角色授予对数据和命令的访问权限，并借助**内置角色**提供数据库系统中常见的不同访问级别，也可以创建自定义角色。

MongoDB内置角色在数据库级别为该角色数据库中所有的**非系统集合 (non-system collections)** 定义访问权限，并在集合级别为所有的**系统集合 (system collections)** 定义访问权限。

**系统集合**包括：

- `<database>.system.*` 命名空间
- `local.replset.*` 副本集命名空间

**非系统集合**指不在上述列表中命名空间里的集合。

## 内置角色

MongoDB在自托管部署中提供以下内置角色：

- 指定数据库上的**数据库用户**和**数据库管理**角色
- `admin`数据库上的所有其他角色

### 数据库用户角色

每个数据库包含以下客户端角色：

- **`read`**：提供对所有非系统集合和`system.js`集合的读取访问权限。
- **`readWrite`**：提供对所有非系统集合和`system.js`集合的读写访问权限。

### 数据库管理角色

每个数据库都包含以下数据库管理角色：

- **`dbAdmin`**：提供执行管理任务的能力，如模式相关任务、索引和收集统计信息等。该角色不授予用户和角色管理特权。
- **`dbOwner`**：可以对数据库执行任何管理操作，此角色结合了**`readWrite`**、**`dbAdmin`**和**`userAdmin`**角色授予的特权。
- **`userAdmin`**：提供针对当前数据库创建和修改角色和用户的能力。

### 集群管理角色

`admin`数据库包含以下角色，用于管理整个系统而不是单个数据库。这些角色包括但不限于`副本集`和`分片集群`管理功能。

- **`clusterAdmin`**：提供最大的集群管理访问权限。此角色结合了**`clusterManager`**，**`clusterMonitor`**和**`hostManager`**授予的特权。
- **`clusterManager`**：提供集群管理和监控操作。拥有此角色的用户可以访问`config`和`local`数据库。
- **`clusterMonitor`**：提供对监控工具的只读访问权限。
- **`directShardOperations`**：从MongoDB8.0开始，可以使用**`directShardOperations`**角色来执行需要直接对分片执行命令的维护操作。
- **`enableSharding`**：提供为集合启用分片和修改现有分片键的能力。
- **`hostManager`**：提供监控和管理服务器的能力。
- **`searchCoordinator`**：提供**`readAnyDatabase`**特权和对`\_\_mdb_internal_search`数据库的写权限。

### 备份与恢复角色

`admin`数据库包含以下角色用于备份和恢复数据：

- **`backup`**

- **`restore`**

### 全数据库角色

以下角色可用于`admin`数据库，并提供适用于除`local`和`config`以外的所有数据库的特权：

- **`readAnyDatabase`**：对除`local`和`config`以外的所有数据库提供和 **`read`**相同的只读权限。

- **`readWriteAnyDatabase`**：对除`local`和`config`以外的所有数据库提供和 **`readWrite`**相同的权限。

- **`userAdminAnyDatabase`**：对除`local`和`config`以外的所有数据库提供和 **`userAdmin`**相同的访问权限。

- **`dbAdminAnyDatabase`**：对除`local`和`config`以外的所有数据库提供和 **`dbAdmin`**相同的权限。

### 超级用户角色

多个角色提供间接或直接的系统级超级用户访问权限。

以下角色能够给任何用户分配任何数据库的任何特权，意味着具有这些角色的用户可以给自己分配任何数据库的任何特权：

- **`dbOwner`**角色（作用域为`admin`数据库时）

- **`userAdmin`**角色（作用域为`admin`数据库时）

- **`userAdminAnyDatabase`**角色

以下角色提供对所有资源的完全特权：

- **`root`**

### 内部角色

- **`__system`**
