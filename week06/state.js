/**
 * 字符串中匹配字符
 * @param {String} char 
 * @param {String} string 
 */
function match(char, string){
    for(let i = 0; i < string.length; i++) {
        if(char === string.charAt(i)){
            return i
        }
    }
    return false
}

console.log(match('a', '123a'))


/**
 * 字符串中匹配两个字符 ab
 * @param {*} string 
 */
function match2(string) {
    let foundA = false
    for(let i = 0; i < string.length; i++) {
        if( string.charAt(i) === 'a') {
            foundA = true
        } else if (foundA && string.charAt(i) === 'b'){
            return true
        } else {
            foundA = false
        }
    }
    return false
}

console.log(match2('Im good abc'))