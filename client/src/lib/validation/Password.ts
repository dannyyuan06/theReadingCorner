export const passwordValidation = (text: string):[boolean, string] => {

    // is char check
    const characterRegex = /(?=.[a-zA-Z])/
    if (!(characterRegex.test(text))) return [false, "Password must contain at least one alphabetical character."]

    // is num check 
    const numRegex = /(?=.[0-9])/
    if (!(numRegex.test(text))) return [false, "Password must contain at least one numerical character."]

    const lengthRegex = /^(.){8,16}$/
    if (!(lengthRegex.test(text))) return [false, "Password must be between 8 and 16 valid characters."]
    
    return [true, "Valid"]
}