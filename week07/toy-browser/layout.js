const getStyle = (element) => {
    if(!element.style) {
        element.style = {}
    }
    for(let prop in element.computeStyle) {
        const p = element.computeStyle.value
        element.style[prop] = element.computeStyle[prop].value
        
        if(element.style[prop].toString().match(/px$/)){
            element.style[prop] = parseInt(element.style[prop])
        }
        if(element.style[prop].toString().match(/^[0-9\.]+$/)){
            element.style[prop] = parseInt(element.style[prop])
        }
    }
    return element.style
}

const layout = (element) => {
    if(!element.computeStyle){
        return 
    }
    const elementStyle = getStyle(element)

    if(elementStyle.display !== 'flex'){
        return 
    }
    const items = element.children.filter(e => e.type === 'element')

    items.sort((a,b)=>{
        return (a.order || 0) - (b.order || 0)
    })

    const style = elementStyle;

    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === '') {
            style[size] = null
        } 
    });

    if(!style.flexDirection || style.flexDirection === 'auto') {
        style.flexDirection = 'row'
    }
    if(!style.alignItems || style.alignItems === 'auto'){
        style.alignItems = 'stretch'
    }
    if(!style.justifyContent || style.justifyContent === 'auto'){
        style.justifyContent = 'flex-start'
    }
    if(!style.flexWrap || style.flexWrap === 'auto') {
        style.flexWrap = 'nowrap'
    }
    if(!style.alignContent || style.alignContent === 'auto'){
        style.alignContent = 'stretch'
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase, 
        crossSize, crossStart, crossEnd, crossSign, crossBase
    
    if(style.flexDirection === 'row'){
        mainSize = 'width'
        mainStart = 'left'
        mainEnd = 'right'
        mainSign = +1
        mainBase = 0
    
        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    }
    if(style.flexDirection === 'row-reverse') {
        mainSize = 'width'
        mainStart = 'right'
        mainEnd = 'left'
        mainSign = -1
        mainBase = style.width
    
        crossSize = 'height'
        crossStart = 'top'
        crossEnd = 'bottom'
    }
    if(style.flexDirection === 'column') {
        mainSize = 'height'
        mainStart = 'top'
        mainEnd = 'bottom'
        mainSign = +1
        mainBase = 0
    
        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }
    if(style.flexDirection === 'column-reverse') {
        mainSize = 'height'
        mainStart = 'bottom'
        mainEnd = 'top'
        mainSign = -1
        mainBase = style.height
    
        crossSize = 'width'
        crossStart = 'left'
        crossEnd = 'right'
    }

    if(style.flexDirection === 'wrap-reverse') {
        crossSign = (-1)
        [crossStart, crossEnd] = [crossEnd, crossStart]
    }
    console.log(style)
}

module.exports.layout = layout