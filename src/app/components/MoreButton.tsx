'use client'
import { useEffect, useState } from 'react'
import styles from './MoreButton.module.css'
import { DropDownMenu } from './DropDownMenu'

export function MoreButton({buttons} : {buttons: string[]}) {
    const [clicked, setClicked] = useState(false)
    const [clickedButton, setClickedButton] = useState("") 

    const handleClickOutside = () => {
        setClicked(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const clickHandler = () => {
        setClicked(true)
    }

    return (
        <button className={styles.dotsButton} onClick={clickHandler}>
            <svg fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em"><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
            {clicked && <DropDownMenu buttons={buttons} imageSize={[25, 25]} setState={setClickedButton}/>}
        </button>
    )
}