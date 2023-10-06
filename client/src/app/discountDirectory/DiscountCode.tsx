"use client";
import { useState } from "react";
import styles from "./DiscountCode.module.css";

export function DiscountCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const clickHandler = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  return (
    <div className={styles.container}>
      <h2>
        <span className={styles.codeTitle}>CODE: </span>
        <span className={styles.code} onClick={clickHandler}>
          {code}
        </span>
      </h2>
      {copied && <div className={styles.copied}>Copied to clipboard</div>}
    </div>
  );
}
