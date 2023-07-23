export const usernameFastValidation = async (text: string):Promise<[boolean, string]> => {
    // No spaces \S => non whitespace char, $ => End of expression
    const noSpacesRegex = /^\w*$/
    if (!noSpacesRegex.test(text)) return [false, "Username can only contain alphanumeric characters and underscores."]

    // Between 6 to 20 chars
    const lengthRegex = /^(.){8,16}$/
    if (!(lengthRegex.test(text))) return [false, "Username must be between 8 and 16 valid characters."]

    // Start with alph char
    const alphRegex = /[A-Za-z]/
    if (!(alphRegex.test(text[0]))) return [false, "The first character of the username must be an alphabetic character "]
    
    // Final Check
    const finalRegex = /^([A-Za-z]\w{5,19})$/
    if (!(finalRegex.test(text))) return [false, "Username is invalid"]

    // Database Check
    const res = await fetch(process.env.NEXT_PUBLIC_HOST! + "/api/users/findUser",{
        method: 'POST',
        body: JSON.stringify({username: text}),
        headers: { "Content-Type": "application/json" }
    })

    const js = await res.json()

    if (js.res[0]) return [false, "Username taken!"]

    return [true, "Valid"]
}