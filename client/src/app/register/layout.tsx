import styles from './layout.module.css'
import { ReactNode } from "react";

export default function registerLayout({children}: {children: ReactNode}) {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {children}
            </div>
        </div>
    )
}