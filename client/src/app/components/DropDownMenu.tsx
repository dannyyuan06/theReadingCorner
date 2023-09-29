import Image from "next/image";
import styles from "./DropDownMenu.module.css";
import { Dispatch, LegacyRef, SetStateAction, useRef } from "react";

//{position} : props

export function DropDownMenu({
  wrapperRef,
  buttons,
  imageSize,
  setState,
  setClicked,
}: {
  wrapperRef: LegacyRef<HTMLDivElement> | undefined;
  buttons: string[];
  imageSize?: [number, number];
  setState: Dispatch<SetStateAction<any>>;
  setClicked: Dispatch<SetStateAction<boolean>>;
}) {
  //style={{top: position[0], left: position[1]}}
  return (
    <div className={styles.container} ref={wrapperRef} data-testid="drop-down-menu">
      {buttons.map((button: string) => (
        <DropDownMenuButton
          key={button}
          name={button}
          imageSize={imageSize}
          setState={setState}
          setClicked={setClicked}
        />
      ))}
    </div>
  );
}

function DropDownMenuButton({
  name,
  imageSize,
  setState,
  setClicked,
}: {
  name: string;
  imageSize?: [number, number];
  setState: Dispatch<SetStateAction<any>>;
  setClicked: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <button
      className={styles.button}
      onClick={() => {
        setState(name);
        setClicked(false);
      }}
    >
      {imageSize !== undefined && (
        <Image
          src={`/images/rightclick/${name}_icon.svg`}
          width={imageSize[0]}
          height={imageSize[1]}
          alt={`Right Click ${name}`}
        />
      )}
      <span>{name}</span>
    </button>
  );
}
