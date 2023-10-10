"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import styles from "./DropDownButton.module.css";
import { DropDownMenu } from "./DropDownMenu";

export function DropDownButton({
  buttons,
  state,
  setState,
}: {
  buttons: string[];
  state: string;
  setState: Dispatch<SetStateAction<any>> | ((score: string) => void);
}) {
  const [clicked, setClicked] = useState(false);
  const wrapperRef = useRef<any | HTMLElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const clickHandler = () => {
    setClicked(true);
  };

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={clickHandler} data-testid="drop-down-button">
        <h1>{state}</h1>
      </button>
      {clicked && (
        <DropDownMenu
          wrapperRef={wrapperRef}
          buttons={buttons}
          setState={setState}
          setClicked={setClicked}
        />
      )}
    </div>
  );
}
