"use client";
import Image from "next/image";
import styles from "./ResetButton.module.css";
import { useRouter } from "next/navigation";

export function ResetButton() {
  const router = useRouter();

  return (
    <button className={styles.container} onClick={() => router.refresh()}>
      <Image
        src="/images/rightclick/Reset password_icon.svg"
        width={50}
        height={50}
        alt="refresh"
      />
    </button>
  );
}
