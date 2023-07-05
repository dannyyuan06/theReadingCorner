import styles from './QuickInfo.module.css'

export function QuickInfo({title, value}: {title: string, value: string|string[]}) {
    return (
        <>
            <hr/>
            <div className={styles.container}>
                <h3 className={styles.title}>{title.toUpperCase()}: </h3>
                <h3 className={styles.value}>{typeof value === "object" ? value.map(v => <div>{v}</div>): value}</h3>
            </div>
        </>
    )
}