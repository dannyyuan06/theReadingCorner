'use client'
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { userModelType } from "./credentials/Form";


type propsType = { 
    setIsCorrect: Dispatch<SetStateAction<{[id: string]: boolean}>> ,
    setFormData: Dispatch<SetStateAction<userModelType>>,
    validation: (text: string) => [boolean, string]|Promise<[boolean, string]>,
    type: string,
    name: string
}

export function Field({name, setIsCorrect, setFormData, validation, type}: propsType) {
    const [err, setErr] = useState([false, ""])
    

    const changeHander = async (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setErr([false, "Checking Username"])
        const [passed, err] = await validation(text)
        setErr([passed, err])
        if (!passed) setIsCorrect(prev => ({...prev, [name]: false})) 
        else {
            setIsCorrect(prev => ({...prev, [name]: true}))
            setFormData(prev => ({...prev, [name]: text}))
        }
    }

    const lastBitOfName = name.slice(1)
    const lastBitOfNameArr = lastBitOfName.split("")
    const addSpace = lastBitOfNameArr.map(char => char.toUpperCase() === char ? " "+char : char)
    const changedName = name[0].toUpperCase() + addSpace.join("")

    return (
        <>
            <label htmlFor={name}>{changedName}:</label><br/>
            <input type={type} id={name} name={name} onChange={changeHander}/><br/>
            <div style={{height: 10, color: err[0] ? "var(--theme-green)": ""}}>{err[1]}</div>
        </>
    )
}