import Image from 'next/image'
import styles from './DiscountTile.module.css'
import { DiscountDirectory } from '@prisma/client'
import { DiscountCode } from './DiscountCode'
import { EditDiscountButton } from './EditDiscountButton'

export function DiscountTile({discount, accessLevel}: {discount: DiscountDirectory, accessLevel: number}) {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <Image style={{objectFit: 'cover'}} src={discount.imageLink} width={400} height={150} alt={discount.title} />
                <h2 className={styles.title}>{discount.title.toUpperCase()}</h2>
                { accessLevel === 3
                && <div className={styles.editDiscountButton}><EditDiscountButton discountDetails={discount}/></div>
                }
            </div>
            <div className={styles.textContainer}>
                <div className={styles.code}>
                    <DiscountCode code={discount.code}/>
                </div>
                <div className={styles.description}>{discount.description}</div>
                <div className={styles.link}>
                    Link: <a href={discount.link} target='_blank'>{discount.link}</a>
                </div>
                <div className={styles.dates}>
                    <div className={styles.startDate}>
                        Starts From:&nbsp;
                        {new Date(discount.startDate).toLocaleDateString("en-GB")}
                    </div>
                    <div className={styles.expireDate}>
                        Expires By:&nbsp;
                        {new Date(discount.expireDate).toLocaleDateString("en-GB")}
                    </div>
                </div>
            </div>
        </div>
    )
}