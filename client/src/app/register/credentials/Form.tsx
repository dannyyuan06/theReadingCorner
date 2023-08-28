'use client'
import styles from '../Form.module.css'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Field } from '../Field'
import { usernameValidation } from '../../../lib/validation/Username'
import { passwordValidation } from '../../../lib/validation/Password'
import { emailValidation } from '../../../lib/validation/Email'
import { nameValidation } from '../../../lib/validation/name'
import { signIn } from 'next-auth/react'
import { usernameFormValidation } from '@/lib/validation/UsernameForm'
import confirmPasswordValidation from '@/lib/validation/ConfirmPassword'
import Link from 'next/link'


type nameType = "username"|"email"|"firstName"|"lastName"|"password"|"confirmPassword"

const userModel = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    description: "",
    password: "",
    confirmPassword: "",
}

export type userModelType = typeof userModel

const initIsCorrect: isCorrectType = {
    username: [false, ""],
    email: [false, ""],
    firstName: [false, ""],
    lastName: [false, ""],
    password: [false, ""],
    confirmPassword: [false, ""],
    description: [true, ""],
}

export type isCorrectType = {
    username: [boolean, string],
    email: [boolean, string],
    firstName: [boolean, string],
    lastName: [boolean, string],
    password: [boolean, string],
    confirmPassword: [boolean, string],
    description: [boolean, string]
}

const validationMap = {
    username: usernameFormValidation,
    email: emailValidation,
    firstName: nameValidation,
    lastName: nameValidation,
    password: passwordValidation,
    confirmPassword: (_: string):[boolean, string] => [false, ""],
    description: (_: string):[boolean, string] => [true, ""],
}


export function Form() {

    const [formData, setFormData] = useState(userModel)
    const [isCorrect, setIsCorrect] = useState<isCorrectType>(initIsCorrect)
    const changedRef = useRef(false)

    useEffect(() => {
        changedRef.current = true
    }, [formData])

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allResults = JSON.parse(JSON.stringify(isCorrect)) as typeof isCorrect
        const formDataKeys = Object.keys(formData) as any as nameType[];
        for (let i=0;i<formDataKeys.length;i++) {
            if (formDataKeys[i] !== "confirmPassword") {
                const res = await validationMap[formDataKeys[i]](formData[formDataKeys[i]])
                allResults[formDataKeys[i]] = res
            } else {
                const res = confirmPasswordValidation(formData.password, formData.confirmPassword)
                allResults[formDataKeys[i]] = res
            }
        }
        const reduceCorrect = Object.values(allResults).reduce((prev, curr) => prev && curr[0], true)
        if (!reduceCorrect) return setIsCorrect(allResults)
        setIsCorrect(initIsCorrect)

        const res = await fetch("/api/users",{
            method: 'POST',
            body: JSON.stringify({formData, type: "credentials"}),
            headers: { "Content-Type": "application/json" }
        })
        const body = await res.json()
        if (body.body) console.error(body.body)
        else signIn()
    }

    const correctBool = Object.values(isCorrect)
    const reduceCorrect = correctBool.length === 5 && correctBool.reduce((bool1, bool2) => bool1 && bool2)

    return (
        <form onSubmit={(e) => submitHandler(e)} className={styles.form}>
            <div className={styles.formGrid}>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='username' validation={usernameValidation} setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='email'setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='firstName' setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='lastName' setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='password' name='password' setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='password' name='confirmPassword' setFormData={setFormData}/>
            </div>
            <label htmlFor="description">Description:</label>
            <textarea onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}/>
            <Link href="/" className={styles.backButton} >BACK</Link>
            <input style={{backgroundColor: changedRef.current ? "var(--theme-green)" : "var(--theme-light-light-grey)", color: 'black'}} type='submit'  value={"SUBMIT"}/>
        </form>
    )
}
