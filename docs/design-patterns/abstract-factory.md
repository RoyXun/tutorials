# 抽象工厂模式

[抽象工厂模式(Abstract Factory Pattern)](https://en.wikipedia.org/wiki/Abstract_factory_pattern)是一种创建型模式，核心是提供一个接口，用于创建一系列相关或相互依赖的对象(产品族)，而无需指定它们的具体类。他是[工厂方法模式](./factory-method)的扩展，解决了多产品、多系列的对象创建与解耦问题。

## 使用场景

抽象工厂模式用于解决以下问题：

- 应用如何独立于其对象的创建方式。
- 类如何独立于它所需的对象的创建方式。
- 如何创建相关或相互依赖的对象的族。

## 结构与实现

抽象工厂模式包含以下角色：

- **抽象工厂(AbstractFactory)**:声明一组创建多种抽象产品的方法。
- **具体工厂(ConcreteFactory)**:实现抽象工厂接口，负责创建一整套具体产品。
- **抽象产品(AbstractProduct)**:为一类产品定义接口。
- **具体产品(ConcreteProduct)**:实现抽象产品接口，是具体工厂创建的对象。
- **客户端(Client)**: 仅依赖抽象工厂和抽象产品，完全不接触具体类。

![Abstract Factory UML](/images/pattern/Abstract_factory_UML.svg)

## 优缺点

优点：

- **保证一致性**：同一工厂产出的产品比如配套、兼容。
- **解耦彻底**：客户端不依赖任何具体类。
- **易切换产品族**：替换工厂即可整体换风格/平台，符合开闭原则。
- **封装创建逻辑**：集中管理复杂对象的创建细节。

缺点：

- **类爆炸**：每增加一个产品族，就要增加多个类。
- **扩展产品等级困难**：新增一种产品，必须修改所有工厂，违反开闭原则。

## 示例

```typescript
// ---------- 1. 抽象产品 ----------
interface Button {
  render(): void;
}
interface TextBox {
  setText(text: string): void;
}

// ---------- 2. 具体产品 ----------
class WindowsButton implements Button {
  render() {
    console.log("渲染 Windows 按钮");
  }
}
class MacButton implements Button {
  render() {
    console.log("渲染 Mac 按钮");
  }
}

class WindowsTextBox implements TextBox {
  setText(text: string) {
    console.log("Windows 文本框: " + text);
  }
}
class MacTextBox implements TextBox {
  setText(text: string) {
    console.log("Mac 文本框: " + text);
  }
}

// ---------- 3. 抽象工厂 ----------
interface GUIFactory {
  createButton(): Button;
  createTextBox(): TextBox;
}

// ---------- 4. 具体工厂 ----------
class WindowsFactory implements GUIFactory {
  createButton(): Button {
    return new WindowsButton();
  }
  createTextBox(): TextBox {
    return new WindowsTextBox();
  }
}
class MacFactory implements GUIFactory {
  createButton(): Button {
    return new MacButton();
  }
  createTextBox(): TextBox {
    return new MacTextBox();
  }
}

// ---------- 5. 客户端 ----------
function clientCode(factory: GUIFactory) {
  const btn = factory.createButton();
  const txt = factory.createTextBox();
  btn.render();
  txt.setText("Hello");
}

// 切换产品族只需替换工厂
clientCode(new WindowsFactory());
clientCode(new MacFactory());
```
