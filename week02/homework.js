// 写一个正则表达式 匹配所有 Number 直接量
const reg = /(\+|-)?((0b|0B)[0-1]+|(0o|0O)[0-7]+|(0x|0X)[0-9a-e]+|([0-9]+\.?[Ee0-9]*))/

const num1 = 12
const num2 = -0.1E2
const num3 = 0b01
const num4 = 0o712
const num5 = 0xeee

console.log(reg.test(num1))
console.log(reg.test(num2))
console.log(reg.test(num3))
console.log(reg.test(num4))
console.log(reg.test(num5))

// 写一个 UTF-8 Encoding 的函数
// 张三 =》 

function encoding(str) {
    return str
      .split('')
      .map((s) => `\\u${s.charCodeAt().toString(16)}`)
      .join('')
}
const str1 = '张松'
const str2 = 'abc'

console.log(encoding(str1))
console.log(encoding(str2))
//写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

const regStr = /(^'[^'\\]*'$)|(^[^"\\]*"$)/
const str3 = 'str""'
const str4 = "str''"

//TODO: 这个如何测试？
console.log(regStr.test(str1))
console.log(regStr.test(str2))