import { PageHeader } from '@/app/components/PageHeader'
import styles from './page.module.css'
import User from '@/models/User'
import { Form } from './Form'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import Providers from './Providers'

export default async function link({
  params
}: {
  params: {
    email: string,
    code: string
  }
}) {
  const email = params.email.replace("%40", "@").replace("%2B", "+")
  const code = params.code

  const [user, err] = await User.verifySignUpTwoFactor(email, code)
  
  if (!user) return (
    <div className={styles.container}>
      <PageHeader>Error</PageHeader>
      {email}<br/>
      {code}
    </div>
  )

  const {firstName, lastName} = user!

  return (
    <div className={styles.container}>
      <PageHeader>WELCOME {firstName.toUpperCase()} {lastName.toUpperCase()}</PageHeader>
      <div className={styles.register}>REGISTER</div>
      <div className={styles.wrapper}>
        <Form firstName={firstName} lastName={lastName} email={email} code={code}/>
        <hr style={{marginLeft: 20, marginRight: 20}}/>
        <Providers/>
      </div>
    </div>
  )
}