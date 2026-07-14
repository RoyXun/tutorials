# 策略模式

[策略模式(Strategy Pattern)](https://en.wikipedia.org/wiki/Strategy_pattern)是一种**行为型模式**，核心是定义一系列算法、分别封装，使其可以互相替换，让算法变化独立于使用它的客户端。

## 使用场景

策略模式主要解决在多种相似算法存在时，使用条件语句导致的复杂性和难以维护问题。

## 结构与实现

策略模式包含以下角色：

- **上下文(Context)**:持有策略引用，供客户端调用，负责策略切换。
- **抽象策略(Strategy)**:定义算法公共接口。
- **具体策略(ConcreteStrategy)**:实现接口，封装一种算法。

![strategy UML](/images/pattern/strategy.png)

## 优缺点

优点：

- **消除大量if-else/switch**
- **符合开闭原则**：新增策略只需加类，不修改原有代码。
- **单一职责**：每个策略只做一件事。
- **灵活切换**：运行时动态替换

缺点：

- 策略增多导类数量膨胀；
- 所有策略类都需要暴露。

## 对比状态模式

- **策略模式**： 主动选择一种算法。
- **状态模式**： 随状态自动切换行为。

## 示例

```javascript
function getPrice(price, type = "normal") {
  const strategies = {
    normal: (p) => p,
    discount8: (p) => p * 0.8,
    full: (p) => (p >= 100 ? p - 20 : p),
  };
  return strategies[type](price);
}

console.log(getPrice(100, "discount8")); // 80
```
