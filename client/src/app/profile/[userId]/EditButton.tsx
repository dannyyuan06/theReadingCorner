"use client"
import Image from 'next/image'
import styles from './EditButton.module.css'
import { useEffect, useState } from 'react'
import { Popup } from '@/app/components/Popup'
import { nameValidation } from '@/lib/validation/name'
import { emailValidation } from '@/lib/validation/Email'
import { getProfileInfoReturnType } from '@/models/User'

export function EditButton({user}: {user: getProfileInfoReturnType}) {

    const [clicked, setClicked] = useState(false)
    const [info, setInfo] = useState({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        description: user.description
    })
    const [err, setErr] = useState({
        firstName: "",
        lastName: "",
        email: ""
    })

    useEffect(() => {
        const [isFirstCorrect, isFirstErr] = nameValidation(info.firstname)
        if (info.firstname === "") setErr(prev => ({...prev, firstName: ""}))
        else if (!isFirstCorrect) setErr(prev => ({...prev, firstName: isFirstErr}))
        else setErr(prev => ({...prev, firstName: ""}))
        
        const [isLastCorrect, isLastErr] = nameValidation(info.lastname)
        if (info.lastname === "") setErr(prev => ({...prev, firstName: ""}))
        else if (!isLastCorrect) setErr(prev => ({...prev, lastName: isLastErr}))
        else setErr(prev => ({...prev, lastName: ""}))

        const [isEmailCorrect, isEmailErr] = emailValidation(info.email)
        if (info.email === "") setErr(prev => ({...prev, email: ""}))
        else if (!isEmailCorrect) setErr(prev => ({...prev, email: isEmailErr}))
        else setErr(prev => ({...prev, email: ""}))
    }, [info])

    const submitHandler = async () => {
        await fetch(`/api/users/${user.username}`,{
            method: 'PUT',
            body: JSON.stringify(info),
            headers: { "Content-Type": "application/json" }
        })
    }


    return (
        <>
            <span className={styles.container}>
                <button className={styles.buttonContainer} onClick={() => setClicked(true)}>
                    <Image src='/images/rightclick/Edit_icon.svg' width={20} height={20} alt='edit icon'/>
                </button>
            </span>
            {clicked
            && <Popup title='EDIT' setClicked={setClicked} confirm={submitHandler}>
                <form className={styles.input}>
                    <label htmlFor='firstname'><h3>First Name</h3></label>
                    <input type='text' name='firstname' value={info.firstname} onChange={(e) => setInfo(prev => ({...prev, firstname: e.target.value}))}/>
                    <div className={styles.err}>{err.firstName}</div>
                    <label htmlFor='firstname'><h3>Last Name</h3></label>
                    <input type='text' name='firstname' value={info.lastname} onChange={(e) => setInfo(prev => ({...prev, lastname: e.target.value}))}/>
                    <div className={styles.err}>{err.lastName}</div>
                    <label htmlFor='firstname'><h3>Email</h3></label>
                    <input type='text' name='firstname' value={info.email} onChange={(e) => setInfo(prev => ({...prev, email: e.target.value}))}/>
                    <div className={styles.err}>{err.email}</div>
                    <label htmlFor='firstname'><h3>Description</h3></label>
                    <textarea rows={7} className={styles.textarea} value={info.description} onChange={(e) => setInfo(prev => ({...prev, description: e.target.value}))}></textarea>
                </form>
            </Popup>
            }
        </>
    )
}