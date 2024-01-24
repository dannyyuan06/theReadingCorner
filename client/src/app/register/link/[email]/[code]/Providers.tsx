"use client"
import { signIn } from 'next-auth/react'
import styles from './page.module.css'
import Image from 'next/image'

export default function Providers() {
  return (
    <div className={styles.provideContainer}>
      <button className={styles.providers} onClick={() => signIn("google")}><Image src="/images/auth/auth_google.svg" alt='google auth' width={20} height={30}/> Register with Google</button>
      <button className={styles.providers} onClick={() => signIn("facebook")}><Image src="/images/auth/auth_facebook.svg" alt='facebook auth' width={20} height={30}/> Register with Facebook</button>
      <button className={styles.providers} onClick={() => signIn("twitter")}><Image src="/images/auth/auth_twitter.svg" alt='x auth' width={20} height={30}/> Register with X</button>
    </div>
  )
}