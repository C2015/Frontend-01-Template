const css = require('css')
let rules = []
let match = (element, selector) => {
    if (!selector || !element.attributes){
        return false
    }
    if(selector.charAt(0) === '#') {
        const attr = element.attributes.filter(attr => attr.name === 'id')[0]
        if(attr && attr.value === selector.replace('#', '')){
            return true
        }
    } else if(selector.charAt(0) === '.') {
        const attr = element.attributes.filter(attr => attr.name === 'class')[0]
        if(attr && attr.value === selector.replace('.', '')) {// TODO: 修改成支持空格的Class 选择器
            return true
        }
    } else  {
        if(element.tagName === selector) {
            return true
        }
    }
    return false
}
const specificity = (selector) => {
    let p = [0, 0, 0]
    let selectorParts = selector.split(' ')
    for(let part of selectorParts) {
        if(part.charAt(0) === '#') {
            p[0] += 1
        } else if(part.charAt(0) === '.') {
            p[1] += 1
        } else {
            p[2] += 1
        }

    }
    return p
}

const compare = (sp1, sp2) => {
    if(sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0]
    }
    if(sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    }
    if(sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2]
    }
    return 0
}

module.exports.addCSSRules = function addCSSRules(text) {
    let ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
}

module.exports.computeCSS = function (element) {
    const parents = element.parents

    if (!element.computeStyle) {
        element.computeStyle = {}
    }
    for (let rule of rules) {
        let selectorParts = rule.selectors[0].split(" ").reverse()
        
        if(!match(element, selectorParts[0])) {
            continue
        }

        let j = 1
        let matched = false
        for(let i = 0; i < parents.length; i++) {
            if(match(parents[i]), selectorParts[j]) {
                j++
            }
        }
        if(j >= selectorParts.length) {
            matched = true
        }
        if(matched) {
            const sp = specificity(rule.selectors[0])
            let computeStyle = element.computeStyle

            for(let declaration of rule.declarations) {
                if(!computeStyle[declaration.property]) {
                    computeStyle[declaration.property] = {}
                }
                if(!computeStyle[declaration.property].specificity) {
                    computeStyle[declaration.property].value = declaration.value
                    computeStyle[declaration.property].specificity =sp
                } else if(compare(computeStyle[declaration.property].specificity, sp) < 0){
                    computeStyle[declaration.property].value = declaration.value
                    computeStyle[declaration.property].specificity =sp
                }
            }
            console.log('computeStyle', element.computeStyle)
        }
    }
}



