// String to Number
// 考虑转换的数字进制问题 2、8、16
function charToNumber(char) {
    let chars = {
        a: 10,
        b: 11,
        c: 12,
        d: 13,
        e: 14,
        f: 15
    }

    return chars[char] ? chars[char] : char.codePointAt(0) - '0'.codePointAt(0)
}
function convertStringToNumber(str, x = 10) {

    let chars = str.split('')
    let number = 0
    let i = 0
    let j = 0
    let length = chars.length
    while (i < length && chars[i] !== '.') {
        number = number * x
        number += charToNumber(chars[i])
        i++
    }
    while (i < length) {
        if (chars[i] === '.') {
            i++
            continue;
        }
        number = number * x
        number += charToNumber(chars[i])
        j++
        i++
    }
    if (j > 0) {
        number = number / (x ** j)
    }
    return number
}

// 测试用例
console.log(convertStringToNumber('100', 2))
console.log(convertStringToNumber('123.123', 8))
console.log(convertStringToNumber('1f.f', 16))



// number to string
// 考虑进制问题
function convertNumberToString(num, hex = 10) {
    let str = "";
    if (typeof num === "number") {

        let integer = Math.floor(num)
        let decimal = num - integer
        while (integer > 0) {
            str = String(integer % hex) + str
            integer = Math.floor(integer / hex)
        }
        let t = String(decimal).substr(1)
        str = str + t

        return str
    }
}

// 测试用例
console.log(convertNumberToString(100.12, 10))
console.log(convertNumberToString(0x10f, 16))
console.log(convertNumberToString(100.11, 2))