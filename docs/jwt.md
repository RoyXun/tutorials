# JWT

## 什么是JWT

**JWT(JSON Web Token)**是一套开放标准([RFC7519](https://datatracker.ietf.org/doc/html/rfc7519))，定义了一种紧凑且自包含的方式，以JSON对象形式在各方之间安全地传输信息。由于数字签名的存在，这些信息是可验证且可信的。

## 使用场景

- **授权(Authorization)**: JWT最常见的使用场景。用户登录后，后续请求都会携带JWT，允许用户访问令牌许可的路由、服务和资源。由于其极小的开销且支持跨域使用，SSO如今大量使用JWT。

- **交换信息(Information Exchange)**: JWT是各方之间安全传输信息的好方法。由于可以对JWT签名 (例如使用公钥/私钥对) ，可以确认发送者身份。此外，由于签名是用 header 和 payload 计算的，还能验证内容未被篡改。

## JWT结构

JWT由 header、payload 和 signature 三部分组成，每个部分通过Base64URL编码，以点号(`.`)分隔：

```txt
Header.Payload.Signature
```

真实的JWT看起来像这样：

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.bBbZv2iRcqZgCrbZL8v89IFoi_rQfCWui3nto6JWDfg
```

### 1.Header

header部分通常包含两部分：

- 令牌的类型(`typ`),即`JWT`，

- 使用的签名算法(`alg`)，如`HMAC`、`SHA256`或`RSA`。

举个例子：

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

然后对该JSON进行Base64URL编码，构成JWT的第一部分:

```txt
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### 2.Payload

payload 包含声明 (claims)。声明是关于实体（通常是用户）及附加数据的陈述。有三种类型的声明：

- **注册声明 (Registered Claims)** —— 预定义的、非强制但推荐使用的声明集：
  - `iss`: Issuer, 签发方
  - `sub`: Subject, 主题
  - `aud`: Audience, 接收方
  - `exp`: Expiration Time， 过期时间
  - `nbf`: Not Before, 生效时间
  - `iat`: Issued At, 签发时间
  - `jti`: JWT ID, JWT唯一标识

  :::tip
  这些声明都是3个字符，因为JWT目标就是紧凑。
  :::

- **公共声明 (Public Claims)** —— 由使用者自由定义，但应在 IANA JSON Web Token Registry 中注册或使用带命名空间的 URI，以避免冲突。

- **私有声明 (Private Claims)** —— 通信双方约定的自定义字段

举个例子：

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

然后对payload进行Base64URL编码，构成JWT的第二部分。

```txt
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0
```

:::danger 注意
payload经过Base64URL编码而非加密，任何持有令牌的人都可以解码并读取内容，**绝对不要将敏感信息放入header和payload**。
:::

### 3.Signature

签名用于验证消息在传输过程中未被篡改，对于使用私钥签名的令牌，还可以验证 JWT 的发送者身份。

要生成签名部分，需要取用编码后的头部、编码后的载荷、密钥、头部中指定的算法，对以上内容执行签名运算。

以 HS256 算法为例，签名的计算方式如下：

```bash
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

## JWT工作流程

在认证场景中，当用户使用凭据成功登录后，认证系统会返回一个JWT令牌。由于令牌是身份凭证，需要格外谨慎，避免引发安全问题。通常令牌的有效期不应过长。

当用户需要访问受保护的路由或资源时，客户端应当发送JWT，一般放在 Authorization请求头，采用Bearer认证模式，内容如下：

```txt
Authorization: Bearer <token>
```

服务器验证签名并检查声明，如是否过期、是否有权限等。验证通过返回数据；否则`401 Unauthorized`。

## 签名算法

JWT支持多种签名算法，选择哪种取决于你的安全需求和架构模式。

- **对称算法 (HMAC)**: 使用同一个秘钥进行签名和验证。
  - **适用场景**: 签发方和验证方是同一个服务场景，如单体应用、内部微服务之间的信任通信。
  - **风险**: 所有需要验证JWT的服务都必须持有秘钥，一旦泄露，所有令牌都可伪造。

- **非对称算法 (RSA / ECDSA)**: 使用私钥签名，公钥验证。
  - **适用场景**: Auth Server持有私钥签发令牌，各Resource Server只需公钥即可验证，无需信任链扩散。是微服务架构中的推荐方案。

## 令牌存储

| 存储位置        | XSS风险 | CSRF风险         | 是否推荐 |
| --------------- | ------- | ---------------- | -------- |
| localStorage    | 高      | 无               | 不推荐   |
| sessionStorage  | 高      | 无               | 不推荐   |
| 内存(JS变量)    | 低      | 无               | 推荐     |
| HttpOnly Cookie | 无      | 需配合CSRF Token | 推荐     |

## 优缺点

- **优点**:
  - 无状态，可水平扩展；
  - 携带信息自包含，无需多次查询数据库；
  - 支持跨域认证，适合微服务、移动端；
- **缺点**：
  - 无法即时撤销已签发的Token；
  - Token泄露风险大，需妥善存储；
  - Payload明文可读，不能存储敏感信息。
