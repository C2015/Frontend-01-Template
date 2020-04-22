# 编程语言通识

> 好的语言是用得人爽，实现的人难受。好的产品也是如此，让用户爽，实现复杂没有关系。

## 基本概念

**终结符**：形式语言的基本符号，它们不能被分解成更小的单位。同时语法规则中不能修改终结符。

**非终结符**：是可以被取代的符号。一个形式文法中必定有一个非终结符。

**BNF**：Backus Normal Form 的简写。音译为：巴科斯范式。BNF 规定是推导规则(产生式)的集合。


## Unicode


### INPUTELEMENT

#### whiteSpace

1. tab 制表符
2. VT  垂直制表符
3. FF  分页，用于打印
4. SP 普通空格
5. NBSP 不产生分词的空格
6. ZWNBSP 零宽空格，早期用于判断文本编码

#### LineTerminator

1. <LF> 是U+000A，就是最正常换行符，在字符串中的'\n'。
2. <CR> 是U+000D，这个字符真正意义上的"回车"，在字符串中是'\r'，在一部分Windows风格文本编辑器中，换行是两个字符\r\n。
3. <LS> 是U+2028，是Unicode中的行分隔符。
4. <PS> 是U+2029，是Unicode中的段落分隔符。

#### Comment

```JavaScript
/**/
//
```

#### Token

1. Identifier
2. Punctuator
3. Keywords
4. Literal

## 练习和问答

1. 使用 BNF 编写一个四则运算

```js
<Number> = "0" | "1" | "2" ...... | "9"

<DecimalNumber> = "0" | (("1" | "2" ...... | "9") <Number>+ )

<PrimaryExpression> = <DecimalNumber> |
    "(" <LogicalExpression> ")"

<MultiplicativeExpression> = <DecimalNumber> |
    <MultiplicativeExpression> "*" <DecimalNumber> |
    <MultiplicativeExpression> "/" <DecimalNumber>

<AdditiveExpression> = <MultiplicativeExpression> |
    <AdditiveExpression> "+" <DecimalNumber>
    <AdditiveExpression> "-" <DecimalNumber>

<LogicalExpression> = <AdditiveExpression> |
    <LogicalExpression> "||" <AdditiveExpression> |
    <LogicalExpression> "&&" <AdditiveExpression>
```


2. 为什么最佳实践都建议使用的字符不超过 ascii

A: 因为使用超过 ascii , 存储的文件在不同环境涉及不同的编码会产生一些问题。因 ascii 是支持最好的字符，不容易出错。
