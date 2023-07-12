import styles from './AStatistic.module.css'

export function AStatistic({title, value}: {title: string, value: string}) {
    return (
        <>
            <hr/>
            <div className={styles.container}>
                <div className={styles.key}>
                    {title.toUpperCase()}
                </div>
                <div className={styles.value}>
                    {value}
                </div>
            </div>
        </>
    )
}