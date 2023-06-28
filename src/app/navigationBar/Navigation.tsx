import styles from './navigation.module.css'
import Image from 'next/image'


export function Navigation() {
    const imageStyle = {
        margin: 5,
        objectFit: 'cover',
        height:  'auto'
    }

    return (
        <nav className={styles.container}>
            <Image src='/images/TRC_Logo_Primary_RGB_Lge.png' width={200} height={200} alt='TRC Logo' style={imageStyle}/>
            <ul>
                <li>Admin dashboard</li>
                <li>About our club</li>
                <li>Members</li>
                <li>Currently reading</li>
                <li>Meetings</li>
            </ul>
        </nav>

    )
}