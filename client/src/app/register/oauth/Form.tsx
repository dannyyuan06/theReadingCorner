'use client'
import styles from '../Form.module.css'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Field } from '../Field'
import { usernameValidation } from '../../../lib/validation/Username'
import { emailValidation } from '../../../lib/validation/Email'
import { nameValidation } from '../../../lib/validation/name'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { usernameFormValidation } from '@/lib/validation/UsernameForm'

type propsType = {
    name: string | null | undefined,
    email: string | null | undefined,
    picture: string | null | undefined
}

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
    password: [true, ""],
    confirmPassword: [true, ""],
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
    password: (_: string):[boolean, string] => [true, ""],
    confirmPassword: (_: string):[boolean, string] => [true, ""],
    description: (_: string):[boolean, string] => [true, ""],
}

export function Form({name, email, picture}: propsType) { 

    const [formData, setFormData] = useState(userModel)
    const [isCorrect, setIsCorrect] = useState<isCorrectType>(initIsCorrect)
    const changedRef = useRef(false)

    useEffect(() => {
        changedRef.current = true
    }, [formData])

    useEffect(() => {
        if (name) {
            const obj:{[id: string]: string} = {
                firstName: name.split(" ")[0],
                lastName: name.split(" ").splice(1).join(" "),
                email: email!,
                profilePicture: picture!
            }
            setFormData(prev => ({
                ...prev,
                firstName: name.split(" ")[0],
                lastName: name.split(" ").splice(1).join(" "),
                email: email!,
            }))
            const objBool:{[id: string]: [boolean, ""]} = {
                firstName: [true, ""],
                lastName: [true, ""],
                email: [true, ""]
            }
            setIsCorrect(prev => ({...prev, ...objBool}))
        }
    }, [email, name, picture])

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const allResults = JSON.parse(JSON.stringify(isCorrect)) as typeof isCorrect
        const formDataKeys = Object.keys(formData) as any as nameType[];
        for (let i=0;i<formDataKeys.length;i++) {
            const res = await validationMap[formDataKeys[i]](formData[formDataKeys[i]])
            allResults[formDataKeys[i]] = res
        }
        const reduceCorrect = Object.values(allResults).reduce((prev, curr) => prev && curr[0], true)
        if (!reduceCorrect) return setIsCorrect(allResults)
        setIsCorrect(initIsCorrect)

        // const res = await fetch("/api/users",{
        //     method: 'POST',
        //     body: JSON.stringify({formData, type: "oauth"}),
        //     headers: { "Content-Type": "application/json" }
        // })
        // const body = await res.json()
        // if (body.body) console.error(body.body)
        // else signIn()
    }

    return (
        <form onSubmit={(e) => submitHandler(e)} className={styles.form}>
            <div className={styles.formGrid}>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='username' setFormData={setFormData} validation={usernameValidation}/>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='email' setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='firstName' setFormData={setFormData}/>
                <Field isCorrect={isCorrect} formData={formData} type='text' name='lastName' setFormData={setFormData}/>
            </div>
            <label htmlFor="description">Description:</label><br/>
            <textarea onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}/><br/>
            <Link href="/" className={styles.backButton} >BACK</Link>
            <input style={{backgroundColor: changedRef.current ? "var(--theme-green)" : "var(--theme-light-light-grey)", color: 'black'}} type='submit'  value={"SUBMIT"}/>
        </form>
    )
}
