'use client'
import Image from 'next/image'
import { PageHeader } from '../components/PageHeader'
import styles from './page.module.css'
import { signIn } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { usernameFormValidation } from '@/lib/validation/UsernameForm'
import { passwordValidation } from '@/lib/validation/Password'
import Link from 'next/link'


export default function SignInPage() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })
    const [error, setErr] = useState("")

    const submitHandler = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const [userPassed, userErr] = usernameFormValidation(credentials.username)
        if (!userPassed) return setErr(userErr)
        const [passPassed, passErr] = passwordValidation(credentials.password)
        if (!passPassed) return setErr(passErr)
        await signIn("credentials", {
            username: credentials.username,
            password: credentials.password,
        })
    }

    const lengths = 30
    return (
        <div className={styles.container}>
            <div className={styles.insideContainer}>
                <div className={styles.image}><Image src='/images/TRC_Logo_Primary_RGB_Lge.svg' width={500} height={500} alt='TRC Logo'/></div>
                <hr style={{marginTop: 25, marginBottom: 25}}/>
                <div className={styles.wrapper}>
                        <PageHeader>SIGN IN</PageHeader>
                        <h2 className={styles.subheading}>WITH CREDENTIALS</h2>
                        <div className={styles.error}>{error}</div>
                        <form className={styles.form} onSubmit={submitHandler}>
                            <label htmlFor='username'>Username:</label><br/>
                            <input type='text' name='username' onChange={(e) => {setCredentials(prev => ({...prev, username: e.target.value}));setErr("")}}/><br/>
                            <label htmlFor='password'>Password:</label><br/>
                            <input type='password' name='password' onChange={(e) => {setCredentials(prev => ({...prev, password: e.target.value}));setErr("")}}/><br/>
                            <input id={styles.submit} type='submit' value='SIGN IN'/>
                        </form>
                        
                        <div className={styles.oauth}>
                            <h2 className={styles.subheading}>OR WITH</h2>
                            <div className={styles.buttonContainer}>
                                <button onClick={async () => await signIn('google')}><Image src='/images/auth/auth_google.svg' width={lengths} height={lengths} alt='Google Image'/></button>
                                <button onClick={async () => await signIn('facebook')}><Image src='/images/auth/auth_facebook.svg' width={lengths} height={lengths} alt='Facebook Image'/></button>
                                <button onClick={async () => await signIn('twitch')}><Image src='/images/auth/auth_twitter.svg' width={lengths} height={lengths} alt='Twitter Image'/></button>
                            </div>
                            <div className={styles.backLink}>
                                <Link href='/'>BACK</Link>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}