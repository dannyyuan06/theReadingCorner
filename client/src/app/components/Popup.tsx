"use client";
import { Dispatch, ReactNode, SetStateAction } from "react";
import styles from "./Popup.module.css";
import { PageHeader } from "./PageHeader";
import { useRouter } from "next/navigation";

export function Popup({
  children,
  title,
  setClicked,
  confirm,
}: {
  children: ReactNode;
  title?: string;
  setClicked: Dispatch<SetStateAction<boolean>>;
  confirm: () => Promise<void>;
}) {
  const router = useRouter();
  const onCancel = () => {
    setClicked(false);
  };

  const onConfirm = async () => {
    await confirm();
    router.refresh();
    setClicked(false);
  };

  return (
    <div className={styles.container} data-testid="popup">
      <div className={styles.wrapper}>
        <PageHeader>{title}</PageHeader>
        <div>{children}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.cancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
