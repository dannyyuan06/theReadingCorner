'use client'
import { useEffect, useRef, useState } from 'react'
import styles from './MoreButton.module.css'
import { DropDownMenu } from './DropDownMenu'

export function MoreButton({buttons} : {buttons: {[id: string]: () => void}}) {
    const [buttonClicked, setButtonClicked] = useState("")
    const [clicked, setClicked] = useState(false)
    const wrapperRef = useRef<any|HTMLElement>(null)

    const handleClickOutside = (e:MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setClicked(false)
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    useEffect(() => {
        if (buttonClicked !== '') {
            buttons[buttonClicked]()
            setClicked(false)
            setButtonClicked('')
        }
    }, [buttonClicked])

    const clickHandler = () => {
        setClicked(true)
    }

    return (
            <div className={styles.container}>
                <button className={styles.dotsButton} onClick={clickHandler}>
                    <svg fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em"><g fillRule="evenodd" transform="translate(-446 -350)"><path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path></g></svg>
                </button>
                {clicked && <DropDownMenu wrapperRef={wrapperRef} buttons={Object.keys(buttons)} setState={setButtonClicked} setClicked={setClicked} imageSize={[25, 25]}/>}
            </div>
    )
}