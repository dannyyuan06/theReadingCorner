import Image from "next/image"
import styles from "./DropDownMenu.module.css"
import { getImageSize } from "next/dist/server/image-optimizer"

//{position} : props

export function DropDownMenu({ buttons, imageSize} : {buttons: string[], imageSize?: [number, number]}) {
    //style={{top: position[0], left: position[1]}}
    return (
        <div className={styles.container} >
            {buttons.map((button: string) => <DropDownMenuButton key={button} name={button} imageSize={imageSize}/>)}
        </div>
    )
}

function DropDownMenuButton({ name, imageSize }: {name: string, imageSize?: [number, number]}) {
    return (
        <button className={styles.button}>
            {imageSize && <Image src={`/images/rightclick/${name}_icon.svg`} width={imageSize[0]} height={imageSize[1]} alt={`Right Click ${name}`}/>}
            <span>{name}</span>
        </button>
    )
}