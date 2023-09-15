// This function is not used but it might be useful in the future.
export function titleToCamel(title: string) {
    const words = title.split(' ')
    const lowerWords = words.map(word => word.toLowerCase())
    // Add a capital letter for every word
    const withCapital = lowerWords.map(word => word.charAt(0).toUpperCase() + word.slice(1))
    const joinedWord = withCapital.join("")
    // Removed first capital letter
    const finalWord = joinedWord.charAt(0).toLowerCase() + joinedWord.slice(1)
    return finalWord
}

export function camelToTitle(title: string) {
    let words = []
    let buffer = ''
    // Loop through every character
    for (let i=0;i<title.length;i++) {
        const currentLetter = title[i]
        // Start a new word every lowercase letter
        if (currentLetter === currentLetter.toLowerCase()) {
            buffer += currentLetter
        }
        // Else append to the current word
        else {
            words.push(buffer.toUpperCase())
            buffer = ''
            buffer += currentLetter
        }
    }
    // Display everything in uppercase
    words.push(buffer.toUpperCase())
    const capitals = words.join(' ')
    return capitals
}