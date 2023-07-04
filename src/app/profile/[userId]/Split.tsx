import styles from './Split.module.css'


export function Split({title, value}: {title: string, value: string}) {
    return (
        <div className={styles.splitContainer}>
            <span className={styles.splitLeft}>{title}</span>
            <span className={styles.splitRight}>{value}</span>
        </div>
    )
}