import Image from "next/image";
import { PageHeader } from "../components/PageHeader";
import styles from './page.module.css'


export default function AboutOurClub() {
    return (
        <div>
            <PageHeader>ABOUT OUR CLUB</PageHeader>
            <section>
                <p>
                    The Reading Corner is a dedicated organisation committed to creating diverse and meaningful literary opportunities and experiences within our community. We strive to bridge the gap between literature and underprivileged communities, ensuring that everyone has access to the transformative power of books and storytelling.
                </p>
                <p>
                    We aspire to create a community where literature is seen as a catalyst for personal and societal transformation, where individuals are inspired to explore new ideas, cultivate empathy, and embrace the beauty of diverse perspectives.
                </p>
            </section>
            <section className={styles.splitContainer}>
                <div className={styles.splitWrapper + " " + styles.splitWrapperBold}>
                    <h2>We envision a world where literacy is the catalyst for change. We&apos;re here to make a difference.</h2>
                    <a className={styles.signUpForNews + " " + styles.buttons} href="https://www.thereadingcorner.uk/lead-collection">SIGN UP FOR NEWS AND OPPORTUNITIES</a>
                </div>
                <div className={styles.splitWrapper}>
                    <p style={{marginTop: 0}}>
                        The Reading Corner is a dedicated organisation that strives to bridge the literacy gap among marginalized youth in schools, hospitals, and underserved communities. By providing support, we empower children and young adults to discover stories and authors that resonate with them, ultimately fostering a lifelong love of reading.
                    </p>
                    <p>
                        We believe that access to reading materials and the ability to relate to stories and characters can make a significant impact on a child&apos;s educational and personal development. Our mission is to make reading accessible and enjoyable for all, regardless of their circumstances. 
                    </p>
                </div>
            </section>
            <section>
                <div className={styles.splitContainer + " " + styles.lastSection}>
                    <Image alt="our goals photo" src="/images/photo_our_goals.webp" height={540} width={447}></Image>
                    <div className={styles.splitWrapper} style={{paddingTop: 0}}>
                        <h2>OUR GOALS</h2>
                        <p style={{marginTop: 0}}>
                            The Reading Corner is an ambitious non-profit organization founded on the belief that literature has the power to change the world. Our mission is fueled by a commitment to the following long-term goals:
                        </p>
        ​                <ul className={styles.goalList}>
                            <li>We&apos;re defining a new generation of literacy access.</li>
                            <li>We foster a shared love of learning and knowledge.</li>
                            <li>We empower people to reach their fullest potential.</li>
                            <li>We create meaningful opportunities in literacy for all.</li>
                            <li>We empower the next generation of social change-makers.</li>
                        </ul>
                        <a className={styles.buttons + " " + styles.learnMore} href="">Learn more about our strategy</a>
                    </div>
                </div>
            </section>
        </div>
    )
}