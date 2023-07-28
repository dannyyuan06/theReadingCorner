'use client'
import styles from './Form.module.css'
import { FormEvent, useEffect, useState } from 'react'
import { Field } from '../Field'
import { usernameValidation } from '../../../lib/validation/Username'
import { emailValidation } from '../../../lib/validation/Email'
import { nameValidation } from '../../../lib/validation/name'
import { signIn } from 'next-auth/react'
const userModel = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    accessLevel: 1,
    description: "",
    password: "",
    profilePicture: "/images/profile_picture_placeholder.png"
}

export type userModelType = typeof userModel

type propsType = {
    name: string | null | undefined,
    email: string | null | undefined,
    picture: string | null | undefined
}

export function Form({name, email, picture}: propsType) { 

    const [formData, setFormData] = useState(name ? 
        {...userModel, 
            email: email!, 
            firstName: name.split(" ")[0], 
            lastName: name.split(" ").splice(1).join(" "),
            profilePicture: picture!
        } 
        : 
        userModel
        )
    const [isCorrect, setIsCorrect] = useState<{[id: string]: boolean}>({})

    useEffect(() => {
        if (name) {
            const obj:{[id: string]: string} = {
                firstName: name.split(" ")[0],
                lastName: name.split(" ").splice(1).join(" "),
                email: email!,
                profilePicture: picture!
            }
            const objK = Object.keys(obj)
            for (let i=0;i<objK.length;i++) {
                document.getElementById(objK[i])?.setAttribute("value", obj[objK[i]])
            }

            const objBool = {
                firstName: true,
                lastName: true,
                email: true
            }

            setIsCorrect(prev => ({...prev, ...objBool}))
        }
    }, [email, name, picture])

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!reduceCorrect) return
        const res = await fetch("/api/users/addUser",{
            method: 'POST',
            body: JSON.stringify({...formData, type: "oauth"}),
            headers: { "Content-Type": "application/json" }
        })
        const body = await res.json()
        if (body.body) console.error(body.body)
        else signIn()
    }
    const correctBool = Object.values(isCorrect)
    const reduceCorrect = correctBool.length === 4 && correctBool.reduce((bool1, bool2) => bool1 && bool2)

    return (
        <form onSubmit={(e) => submitHandler(e)} className={styles.form}>
            <Field type='text' name='username' validation={usernameValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='text' name='email' validation={emailValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='text' name='firstName' validation={nameValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='text' name='lastName' validation={nameValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <label htmlFor="description">Description:</label><br/>
            <textarea onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}/><br/>
            <input style={reduceCorrect ? {}: {backgroundColor: "var(--theme-light-light-grey)", color: 'black'}} type='submit'/>
        </form>
    )
}
