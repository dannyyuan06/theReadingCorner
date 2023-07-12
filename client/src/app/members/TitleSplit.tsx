import styles from './TitleSplit.module.css'

export function TitleSplit({ value, flex, tAlign}: { value: string, flex: number, tAlign?: "left" | "right"}) {
    return (
        <div style={{flex: flex, textAlign: tAlign}} className={styles.container}>
            <div className={styles.value}>{value}</div>
        </div>
    )
}