export function titleToCamel(title: string) {
    const words = title.split(' ')
    const lowerWords = words.map(word => word.toLowerCase())
    const withCapital = lowerWords.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    const joinedWord = withCapital.join("")
    const finalWord = joinedWord.charAt(0).toLowerCase() + joinedWord.slice(1)
    return finalWord
}

export function camelToTitle(title: string) {
    let words = []
    let buffer = ''
    for (let i=0;i<title.length;i++) {
        const currentLetter = title[i]
        if (currentLetter === currentLetter.toLowerCase()) {
            buffer += currentLetter
        }
        else {
            words.push(buffer.toUpperCase())
            buffer = ''
            buffer += currentLetter
        }
    }
    words.push(buffer.toUpperCase())
    const capitals = words.join(' ')
    return capitals
}