import Link from 'next/link'
import { PageHeader } from './components/PageHeader'
import { SignInButton } from './components/SignInButton'
import styles from './page.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Image src='/images/TRC_Master_Logos_RGB_TRC_Logo_Primary_RGB.svg' width={510} height={515} style={{transform: 'scale(1.17)'}} alt='Logo'/>
        <div className={styles.textContainer}>
          <PageHeader>WECOME TO THE READING CORNER</PageHeader>
          <p>
            Our Book Club brings together intersectional readers from all walks of life to celebrate unique stories from underrepresented authors, highlighting cultures, identities and experiences from diverse backgrounds. When you join our community, you&apos;ll connect with people who share your enthusiasm for lifelong learning. Engage in meaningful discussions, exchange book recommendations, and discover new perspectives that broaden your horizons.
          </p>
          <p>
            By becoming a member, you&apos;ll have access to exclusive events, workshops, and discussions led by experts in various fields. Immerse yourself in a supportive environment where curiosity is celebrated and knowledge is shared.
          </p>
          <div className={styles.buttonContainer}>
            <SignInButton className={styles.authButton}/>
            <Link href="/register/credentials" className={styles.authButton}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
