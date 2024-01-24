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


type nameType = "username"|"password"|"confirmPassword"

const userModelInput  = {
  username: "",
  password: "",
  confirmPassword: "",
}

export type userModelInputType = typeof userModelInput

const userModel = {
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    description: "",
    password: "",
    confirmPassword: "",
    code: ""
}

export type userModelType = typeof userModel

const initIsCorrect: isCorrectType = {
    username: [false, ""],
    password: [false, ""],
    confirmPassword: [false, ""],
}

export type isCorrectType = {
    username: [boolean, string],
    password: [boolean, string],
    confirmPassword: [boolean, string]
}

const validationMap = {
    username: usernameFormValidation,
    password: passwordValidation,
    confirmPassword: (_: string):[boolean, string] => [false, ""],
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
}
