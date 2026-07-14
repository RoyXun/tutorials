# 中介者模式

[中介者模式(Mediator Pattern)](https://en.wikipedia.org/wiki/Mediator_pattern)是一种**行为型模式**，核心是用一个中介对象封装一组对象的交互逻辑，让原有对象无需直接相互引用，从而解耦对象间的复杂依赖，将多对多的关系简化为"对象——中介者"的一对多关系。

## 使用场景

中介者模式主要解决以下需求：

- 避免一组交互对象之间强耦合；
- 能够独立改变一组对象之间的交互。

## 结构与实现

中介者模式通常包含以下角色：

- **抽象中介者(Mediator)**：定义同事对象之间通信的接口。
- **具体中介者(ConcreteMediator)**：实现中介者接口并协调对象之间的通信。
- **抽象同事(Colleague)**：定义通过中介者与其他同事进行通信的方法。
- **具体同事(ConcreteColleague)**: 实现同事接口，并通过中介者与其他同事进行通信。

![mediator UML](/images/pattern/mediator.png)

## 优缺点

优点：

- 同事间解耦，新增/修改同事无需改动其他对象；
- 交互逻辑集中管理，便于维护与扩展。

缺点：

- 中介者可能过度复杂；
- 高并发场景下，中介者可能成为性能瓶颈。

## 对比观察者模式

中介者模式与观察者模式都用于**解耦**、**集中调度**，但**设计意图**、**通信方式**与**责任边界**完全不同。
|特性|中介者模式|观察者模式|
|---|---|---|
|**目的**|简化对象之间复杂的网状交互，集中控制交互逻辑，降低对象之间的耦合度。|为了状态同步：一个对象变化，自动通知一堆依赖它的对象。|
|**通信**|双向交互。|单向的一对多通知。|
|**控制权**|所有交互逻辑集中在中介者里。|逻辑分散在各个观察者里。|

## 示例

```typescript
// 1. 抽象中介者：定义通信接口
interface ChatMediator {
  sendMessage(message: string, user: User): void;
  addUser(user: User): void;
}

// 2. 抽象同事：声明中介者交互方法
abstract class User {
  constructor(
    protected mediator: ChatMediator,
    protected name: string,
  ) {}
  abstract send(message: string): void;
  abstract receive(message: string): void;
}

// 3. 具体中介者：实现协调逻辑
class ChatRoom implements ChatMediator {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  sendMessage(message: string, sender: User): void {
    // 遍历所有用户，除发送者外均接收消息
    this.users.forEach((user) => {
      if (user !== sender) user.receive(message);
    });
  }
}

// 4. 具体同事：实现业务逻辑
class ConcreteUser extends User {
  send(message: string): void {
    console.log(`${this.name} 发送: ${message}`);
    this.mediator.sendMessage(message, this); // 委托中介者转发
  }

  receive(message: string): void {
    console.log(`${this.name} 收到: ${message}`);
  }
}

// 客户端使用
const chatRoom = new ChatRoom();
const alice = new ConcreteUser(chatRoom, "Alice");
const bob = new ConcreteUser(chatRoom, "Bob");

chatRoom.addUser(alice);
chatRoom.addUser(bob);

alice.sendMessage("Hi Bob!"); // Alice 发送 -> 中介者转发 -> Bob 接收
bob.sendMessage("Hello Alice!");
```
