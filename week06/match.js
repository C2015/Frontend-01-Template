//使用状态机： 完成 abababx 的匹配

function start(char) {
    if (char === 'a'){
        return foundA
    } else {
        return start
    }
}

function foundA(char) {
    if (char === 'b') {
        return foundB
    } else {
        return start(char)
    }
}

function foundB(char) {
    if (char === 'a'){
        return foundA2
    } else {
        return start(char)
    }
}

function foundA2(char) {
    if (char === 'b') {
        return foundB2
    } else {
        return start(char)
    }
}

function foundB2(char) {
    if (char === 'a') {
        return foundA3
    } else {
        return start(char)
    }
}

function foundA3(char) {
    if (char === 'b') {
        return foundB3
    } else {
        return start(char)
    }
}

function foundB3(char) {
    if (char === 'x') {
        return end
    } else if (char === 'a') {
        return foundA3
    } else {
        return start(char)
    }
}

function end(char){
    return end
}

function match(string) {
    let state = start
    for (let i = 0; i < string.length; i++) {
        state = state(string.charAt(i))
    }
    if (end === state) {
        return true
    }
    return false
}

console.log(match('good abababx'))
