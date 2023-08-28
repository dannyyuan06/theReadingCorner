"use client"
import styles from './UpdateButton.module.css'


export default function UpdateButton() {
    const clickHandler = () => {
        fetch("/api/statisitics", {
            method: "PUT"
        })
    }
    return (
        <button className={styles.updateButton} onClick={clickHandler}>Update Statistics</button>
    )
}