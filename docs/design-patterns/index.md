# 简介

## 设计模式

[设计模式(design patterns)](https://en.wikipedia.org/wiki/Design_Patterns)是软件工程中，针对特定场景下反复出现的问题，所总结出的**可复用**、**最佳实践**的解决方案和设计思路。它不是现成代码，而是一套经过验证的代码组织方法论，核心目标是提升代码的可维护性、可扩展性、灵活性与复用性。

## 分类

经典的23种四人组(GoF)设计模式分为三大类：

1. **创建型模式(creational)**：关注对象创建。
2. **结构型模式(structural)**：关注类/对象组合
3. **行为型模式(behavioral)**： 关注对象间通信/职责。

### 创建型模式

创建型模式核心在于解耦对象的创建与使用，隐藏实例化逻辑。

- [抽象工厂(abstract factory)](./abstract-factory): 创建一系列相关对象。
- [工厂方法(factory method)](./factory-method): 定义创建接口，子类决定实例化对象。
<!--
- [建造者(builder)](./builder): 分布构建复杂对象。
- [原型(prototype)](./prototype): 通过克隆现有对象创建新对象。
- [单例(singleton)](./singleton): 确保一个类全局唯一实例。 -->

### 结构型模式

结构型模式核心在于如何将类或对象组合成更大、更灵活的结构。

<!-- - [适配器(adapter)](./adapter):转换接口，是不兼容的类协同工作。
- [桥接(bridge)](./bridge): 分离抽象与实现，使其独立变化。
- [组合(composite)](./composite): 统一处理树形结构。
- [装饰器(decorator)](./decorator):动态为对象添加功能。
- [外观(facade)](./facade):为复杂子系统提供统一简化接口。
- [代理(proxy)](./proxy):为对象提供替身，控制访问。
- [享元(flyweight)](./flyweight):共享细粒度对象，节省内存。 -->

### 行为型模式

行为型模式核心在于定义对象间的交互方式与职责分配。

- [中介者(mediator)](./mediator):通过中介对象解耦多方交互。
- [观察者(observer)](./observer):一对多依赖，主题变化通知所有依赖。
- [策略(strategy)](./strategy):分装一系列算法，可互换。
<!--
- [责任链(chain)](./chain):请求沿链传递，直到被处理。
- [命令(command)](./command):将请求封装为对象，支持撤销/排队。
- [状态(state)](./state):对象行为随内部状态变化。
- [模板方法(template)](./template):定义算法骨架，子类实现步骤。
- [迭代器(iterator)](./iterator):顺序遍历集合，不暴露内部结构。
- [访问者(visitor)](./visitor): 不改变类结构，为类添加新操作。
- [备忘录(memento)](./memento):保存/恢复对象状态。
- [解释器(interpreter)](./interpreter):解析特定语法。
  -->
