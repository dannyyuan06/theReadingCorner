import { ReactNode } from 'react'
import styles from './TitleSplit.module.css'

export function TitleSplit({ children, flex, tAlign}: { children: ReactNode, flex: number, tAlign?: "left" | "right"}) {
    return (
        <div style={{flex: flex, textAlign: tAlign}} className={styles.container} data-testid="title-split">
            {children}
        </div>
    )
}