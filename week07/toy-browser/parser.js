const {addCSSRules, computeCSS} = require('./computing')
const {layout} = require('./layout')

const EOF = Symbol('EOF') // EOF: End Of File
const SPACE_REG = /[\t\n\f ]/
let currentToken = null
let currentAttribute = null
let stack = [{ type: 'document', children: [] }]
let currentTextNode = null
function deepCopy(obj) {
    const copyObj = Array.isArray(obj) ? []:{}
    for(let key in obj) {
        if(!obj.hasOwnProperty(key)){
            return 
        }
        copyObj[key] = typeof obj[key] === 'object' ?  deepCopy(obj[key]) : obj[key]
    }
    return copyObj
}
function emit(token) {
    let top = stack[stack.length - 1]

    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }

        element.tagName = token.tagName
        for (let p in token) {
            if (p !== 'type' && p !== 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        top.children.push(element)
        element.parents = deepCopy(stack.slice().reverse())

        if (!token.isSelecting) {
            stack.push(element)
        }
        computeCSS(element)
        currentTextNode = null
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error('tag start end does not match!')
        } else {
            if(top.tagName === 'style') {
                addCSSRules(top.children[0].content)
            }
            layout(top)
            stack.pop()
        }
        currentTextNode = null
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content +=  token.content
    }
}

function data(char) {
    if (char === '<') {
        return tagOpen
    } else if (char === EOF) {
        emit({
            type: 'EOF'
        })
        return
    } else {
        emit({
            type: 'text',
            content: char
        })
        return data
    }
}

function tagOpen(char) {
    if (char.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(char)
    } else if (char === '/') {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return endTagOpen
    } else {
        return
    }
}

function endTagOpen(char) {
    if (char.match(/[a-zA-Z]/)) {
        return tagName(char)
    } else if (char === EOF) {
        console.log(1111)
    } else if (char === '>') {
        return data
    }
}

function tagName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (char === '/') {
        return selfClosingStartTag
    } else if (char.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += char
        return tagName
    } else if (char === '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

function beforeAttributeName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (char === '>' || char === '/' || char === EOF) {
        return afterAttributeName(char)
    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(char)
    }
}
function afterAttributeName(char) {
    if (char.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (char === '/') {
        return selfClosingStartTag
    } else if (char === '>') {
        emit(currentToken)
        return data
    } else {
        return beforeAttributeName(char)
    }
}

function attributeName(char) {
    if (char.match(/[\t\n\f ]/) || char === '/' || char === ' ' || char === EOF) {
        return afterAttributeName
    } else if (char === '=') {
        return beforeAttributeValue
    } else if (char === '\u0000') {

    } else if (char === '"' || char === "'" || char === '<') {

    } else {
        currentAttribute.name += char
        return attributeName
    }
}

function selfClosingStartTag(char) {
    if (char === '>') {
        currentToken.isSelecting = true
        emit(currentToken)
        return data
    } else if (char === EOF) {

    } else {
        return
    }
}

function beforeAttributeValue(char) {
    if (char.match(SPACE_REG) || char === '/' || char === '>' || char === EOF) {
        return beforeAttributeValue
    } else if (char === '"') {
        return doubleQuotedAttributeValue
    } else if (char === '\'') {
        return singleQuotedAttributeValue
    } else if (char === '>') {

    } else {
        return unquotedAttributeValue(char)
    }
}

function doubleQuotedAttributeValue(char) {
    if (char === '"') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else {
        currentAttribute.value += char
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(char) {
    if (char === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else {
        currentAttribute.value += char
        return singleQuotedAttributeValue
    }
}

function afterQuotedAttributeValue(char) {
    if (char.match(/[\t\n\f ]/)) {
        return beforeAttributeName
    } else if (char === '/') {
        return selfClosingStartTag
    } else if (char === '>') {
        emit(currentToken)
        return data
    } else {
        return beforeAttributeName
    }
}

function unquotedAttributeValue(char) {
    if (char.match(/[\t\n\f ]/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (char === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if (char === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (char === '\u0000') {

    } else {
        currentAttribute.value += char
        return unquotedAttributeValue
    }
}

function sleep(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

module.exports.parserHTML = function parserHTML(html) {
    let state = data
    for (let c of html) {
        // await sleep(10) // 不加休眠方法，vscode 调试会出现问题，有时直接返回中途结束。
        state = state(c)
    }
    state = state(EOF)
}

