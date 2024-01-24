"use client";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { isCorrectType, userModelInputType, userModelType } from "./credentials/Form";
import styles from "./Field.module.css";

type nameType =
  | "username"
  | "password"
  | "confirmPassword";

type propsType = {
  setFormData: Dispatch<SetStateAction<userModelInputType>>;
  formData: userModelInputType;
  validation?: (text: string) => [boolean, string] | Promise<[boolean, string]>;
  isCorrect: isCorrectType;
  type: string;
  name: nameType;
};

export function Field({
  name,
  setFormData,
  type,
  validation,
  isCorrect,
  formData,
}: propsType) {
  const [err, setErr] = useState("");

  useEffect(() => {
    setErr(isCorrect[name][1]);
  }, [isCorrect, name]);

  const changeHander = async (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: text }));
    if (validation) {
      setErr("Checking Username");
      const [passed, err] = await validation(text);
      if (passed) {
        setErr(err);
      } else {
        setErr(err);
      }
      if (text === "") {
        setErr("");
      }
    }
  };

  const lastBitOfName = name.slice(1);
  const lastBitOfNameArr = lastBitOfName.split("");
  const addSpace = lastBitOfNameArr.map((char) =>
    char.toUpperCase() === char ? " " + char : char
  );
  const changedName = name[0].toUpperCase() + addSpace.join("");

  return (
    <div>
      <label htmlFor={name}>{changedName}:</label>
      &nbsp;
      <div
        className={styles.validation}
        style={{
          minHeight: "1em",
          color: err === "Valid" ? "var(--theme-green)" : "",
        }}
      >
        {err}
      </div>
      <br />
      <input
        type={type}
        id={name}
        name={name}
        onChange={changeHander}
        value={formData[name]}
        data-testid="input"
      />
      <br />
    </div>
  );
}
