import styles from './PageHeader.module.css'


export function PageHeader({ children }: { children: React.ReactNode }) {
    return(
        <h1 className={styles.header}>
            {children}
        </h1>
    )
}