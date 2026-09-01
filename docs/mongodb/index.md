# 简介

::: info
本文写作版本为**8.3**
:::

## 基本介绍

[MongoDB](https://www.mongodb.com/docs/manual/)是基于文档的NoSQL数据库，采用[BSON](https://bsonspec.org/)存储文档数据，支持多种功能包括：

- **基于文档的结构化搜索**
- **数据聚合**
- **全文搜索**
- **向量搜索**
- **地理空间搜索**
- **时间序列**

可以在以下三种环境中运行MongoDB：

- **MongoDB Atlas**: 用于云端 MongoDB 部署的完全托管服务
- **MongoDB Enterprise**：基于订阅、自行管理的 MongoDB 版本
- **MongoDB Community**：开源、可免费使用以及自行管理的 MongoDB 版本

## 特点

MongoDB具备以下主要特点：

- **文档数据库**：灵活的文档数据模型可让你根据应用需求适配数据结构。
- **事务**：多文档ACID事务可执行需要数据一致性的复杂操作。
- **高可用**：复制与自动故障转移机制保障数据始终可用。
- **水平扩展**：通过分片技术处理大型数据集和高吞吐量来实现水平扩展。

## 基本概念

MongoDB以**文档 (document)** 形式存储数据记录，并汇集在**集合 (collection)** 中。**数据库 (database)** 存储一个或多个文档集合。

- **文档 (document)**： MongoDB的基本数据单元，类似JSON对象但在数据库中以一种类型更丰富的格式(BSON)存储。
- **集合 (collection)**：一组文档的集合，相当于关系型数据库的表，但是集合不要求固定的模式。
- **数据库 (database)**：集合的容器，每个MongoDB服务器可以建立多个数据库，每个数据库都有自己的集合与权限。
- **BSON (binary json)**：Binary JSON，是MongoDB用来存储和传输文档的二进制形式的JSON。

术语对比：
| RDBMS | MongoDB | 描述 |
| ---------------------- | ------------------ | ------------------------------------------ |
| 库 (database) | 库 (database) | |
| 表 (table) | 集合 (collection) | 集合中的文档不需要有固定的结构 |
| 行/记录 (row) | 文档 (document) | |
| 列/字段 (column/field) | 字段/键/域 (field) | |
| 主键 (primary key) | 对象ID (ObjectId) | \_id: ObjectId("5099803df3f4948bd2f98391") |
| 索引 (index) | 索引 (index) | |
