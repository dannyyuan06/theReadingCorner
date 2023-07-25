'use client'
import styles from './Form.module.css'
import { FormEvent, useState } from 'react'
import { Field } from '../Field'
import { usernameValidation } from '../../../lib/validation/Username'
import { passwordValidation } from '../../../lib/validation/Password'
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

export function Form() {
    

    const [formData, setFormData] = useState(userModel)
    const [isCorrect, setIsCorrect] = useState<{[id: string]: boolean}>({})

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!reduceCorrect) return
        const res = await fetch(process.env.NEXT_PUBLIC_HOST! + "/api/users/addUser",{
            method: 'POST',
            body: JSON.stringify({...formData, type: "credentials"}),
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
            <Field type='text' name='username' validation={usernameValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='password' name='password' validation={passwordValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='text' name='email' validation={emailValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='text' name='firstName' validation={nameValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <Field type='text' name='lastName' validation={nameValidation} setIsCorrect={setIsCorrect} setFormData={setFormData}/>
            <label htmlFor="description">Description:</label><br/>
            <textarea onChange={e => setFormData(prev => ({...prev, description: e.target.value}))}/><br/>
            <input style={reduceCorrect ? {}: {backgroundColor: "var(--theme-light-light-grey)", color: 'black'}} type='submit'/>
        </form>
    )
}
