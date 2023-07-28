export const emailValidation = (text: string):[boolean, string] => {

    // is email check
    const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    if (!(emailRegex.test(text))) return [false, "Invalid Email Address"]
    
    return [true, "Valid"]
}