function lexicalAnalysis(expression) {
    const symbol = ['(', ')', '+', '-', '*', '/']
    const re = /\d|\./
    const tokens = []
    const chars = expression.trim().split('')
    let token = ''
    chars.forEach(c => {
        if (re.test(c)) {
            token += c
        } else if (c == ' ' && token) {
            tokens.push(token)
            token = ''
        } else if (symbol.includes(c)) {
            if (token) {
                tokens.push(token)
                token = ''
            } 

            tokens.push(c)
        }
    })

    if (token) {
        tokens.push(token)
    }

    return tokens
}

const expression = '(2+3)*2.03'
console.log(lexicalAnalysis(expression))