"use client";
import Image from "next/image";
import styles from "./ProfileStandard.module.css";
import { TitleSplit } from "./TitleSplit";
import { MoreButton } from "../components/MoreButton";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Popup } from "../components/Popup";
import Link from "next/link";
import { MemberType } from "@/models/User";

const accessLevelKey: { [id: string]: string } = {
  "-1": "Blocked",
  "1": "User",
  "3": "Admin",
};

export function ProfileStandard({
  user,
  setUsers,
  index,
}: {
  user: MemberType;
  setUsers: Dispatch<SetStateAction<MemberType[]>>;
  index: number;
}) {
  // If the states are true, then popup shows
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [disableConfirm, setDisableConfirm] = useState(false);
  const [enableConfirm, setEnableConfirm] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  // These are the button handlers for pressing their respective buttons
  const deleteAccount = async () => {
    await fetch(`/api/users/${user.username}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  };

  const disableAccount = async () => {
    await fetch(`/api/users/${user.username}`, {
      method: "PATCH",
      body: JSON.stringify({ accessLevel: -1 }),
      headers: { "Content-Type": "application/json" },
    });
    // Update the list
    setUsers((prev) =>
      // New list
      prev.map((use) => {
        // return original if user doesn't match
        if (use.username !== user.username) return use;
        // return a change if the user is different
        return { ...use, accessLevel: -1 };
      })
    );
  };

  const enableAccount = async () => {
    await fetch(`/api/users/${user.username}`, {
      method: "PATCH",
      body: JSON.stringify({ accessLevel: 1 }),
      headers: { "Content-Type": "application/json" },
    });
    setUsers((prev) =>
      prev.map((use) => {
        if (use.username !== user.username) return use;
        return { ...use, accessLevel: 1 };
      })
    );
  };

  const resetPasswordAccount = async () => {
    const newPassword = inputPasswordRef.current?.value;
    await fetch(`/api/users/updatePassword/${user.username}`, {
      body: JSON.stringify({ password: newPassword }),
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    });
  };
  // Dictionary of buttons
  let moreButtons: { [id: string]: () => void } = {
    "Reset password": () => {
      setResetPassword(true);
    },
    "Delete account": () => {
      setDeleteConfirm(true);
    },
  };
  
  user.accessLevel === -1
    ? (moreButtons["Enable account"] = () => {
        setEnableConfirm(true);
      })
    : (moreButtons["Disable account"] = () => {
        setDisableConfirm(true);
      });

  console.log(user.accessLevel);
  
  return (
    <>
      <hr />
      <div className={styles.container} data-testid="profile-standard">
        <Link href={`/profile/${user.username}`} id={styles.imagelink}>
          <Image
            alt="profile picture placeholder"
            src={user.profilePicture}
            style={{ borderRadius: "50%" }}
            width={40}
            height={40}
          />
        </Link>
        <TitleSplit tAlign="left" flex={1}>
          <Link href={`/profile/${user.username}`}>
            <span style={{ fontFamily: "var(--font-mono)" }}>
              {user.username}
            </span>
          </Link>
        </TitleSplit>
        <TitleSplit
          tAlign="left"
          flex={1}
        >{`${user.firstName} ${user.lastName}`}</TitleSplit>
        <TitleSplit tAlign="left" flex={1}>
          {new Date(user.joinDate).toDateString().split(" ").slice(1).join(" ")}
        </TitleSplit>
        <TitleSplit tAlign="left" flex={1}>
          {new Date(user.lastOnline)
            .toDateString()
            .split(" ")
            .slice(1)
            .join(" ")}
        </TitleSplit>
        <TitleSplit tAlign="left" flex={2}>
          {user.email}
        </TitleSplit>
        <TitleSplit tAlign="left" flex={1}>
          {accessLevelKey[`${user.accessLevel}`]}
        </TitleSplit>
        <MoreButton buttons={moreButtons} />
      </div>
      {deleteConfirm && (
        <Popup
          title="CONFIRMATION"
          setClicked={setDeleteConfirm}
          confirm={deleteAccount}
        >
          Are you sure you want to delete {user.username}&apos;s account?
          <br />
          This action is <b style={{ color: "red" }}>IRREVERSIBLE</b>.
        </Popup>
      )}
      {disableConfirm && (
        <Popup
          title="CONFIRMATION"
          setClicked={setDisableConfirm}
          confirm={disableAccount}
        >
          Are you sure you want to disable {user.username}&apos;s account?
        </Popup>
      )}
      {enableConfirm && (
        <Popup
          title="CONFIRMATION"
          setClicked={setEnableConfirm}
          confirm={enableAccount}
        >
          Are you sure you want to enable {user.username}&apos;s account?
        </Popup>
      )}
      {resetPassword && (
        <Popup
          title="SET NEW PASSWORD"
          setClicked={setResetPassword}
          confirm={resetPasswordAccount}
        >
          Set new password for user {user.username}?<br />
          <input
            ref={inputPasswordRef}
            className={styles.resetPassword}
            type="text"
            placeholder="New Password"
          />
        </Popup>
      )}
    </>
  );
}
