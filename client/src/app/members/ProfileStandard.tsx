'use client'
import Image from "next/image";
import styles from './ProfileStandard.module.css'
import { TitleSplit } from "./TitleSplit";
import { MoreButton } from "../components/MoreButton";
import { Users } from "@prisma/client";
import { useRef, useState } from "react";
import { Popup } from "../components/Popup";

export function ProfileStandard(user: Users) {

    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [disableConfirm, setDisableConfirm] = useState(false)
    const [enableConfirm, setEnableConfirm] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const inputPasswordRef = useRef<HTMLInputElement>(null)

    const deleteAccount = () => {
        const res = fetch(`/api/users/deleteUser/${user.username}`,{
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
    }

    const disableAccount = () => {
        const res = fetch(`/api/users/disableUser/${user.username}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        })
    }

    const enableAccount = () => {
        const res = fetch(`/api/users/enableUser/${user.username}`, {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        })
    }

    const resetPasswordAccount = () => {
        const newPassword = inputPasswordRef.current?.value
        const res = fetch(`/api/users/updatePassword/${user.username}`, {
            body: JSON.stringify({password: newPassword}),
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        })
    }

    let moreButtons:{[id: string]: () => void} = {
        "Reset password": () => {setResetPassword(true)}, 
        "Delete account": () => {setDeleteConfirm(true)}
    }

    user.accessLevel === -1 ? moreButtons["Enable account"] = () => {setEnableConfirm(true)} : moreButtons["Disable account"] = () => {setDisableConfirm(true)}

    return (
        <>
            <hr/>
            <div className={styles.container}>
                <Image alt='profile picture placeholder' src={user.profilePicture} style={{borderRadius: '50%'}} width={40} height={40}/>
                <TitleSplit tAlign="left" value={user.username} flex={1}/>
                <TitleSplit tAlign="left" value={`${user.firstName} ${user.lastName}`} flex={1}/>
                <TitleSplit tAlign="left" value={(new Date(user.joinDate).toLocaleDateString("en-GB"))} flex={1}/>
                <TitleSplit tAlign="left"value={(new Date(user.lastOnline).toLocaleDateString("en-GB"))} flex={1}/>
                <TitleSplit tAlign="left" value={user.email} flex={2}/>
                <TitleSplit tAlign="right" value={`${user.numBooksRead}`} flex={1}/>
                <MoreButton buttons={moreButtons}/>
            </div>
            {deleteConfirm
            && <Popup title="CONFIRMATION" setClicked={setDeleteConfirm} confirm={deleteAccount}>
                Are you sure you want to delete {user.username}'s account?<br/>
                This action is <b style={{color: 'red'}}>IRREVERSIBLE</b>.
            </Popup>
            }
            {disableConfirm
            && <Popup title="CONFIRMATION" setClicked={setDisableConfirm} confirm={disableAccount}>
                Are you sure you want to disable {user.username}'s account?
            </Popup>
            }
            {enableConfirm
            && <Popup title="CONFIRMATION" setClicked={setEnableConfirm} confirm={enableAccount}>
                Are you sure you want to enable {user.username}'s account?
            </Popup>
            }
            {resetPassword
            && <Popup title="SET NEW PASSWORD" setClicked={setResetPassword} confirm={resetPasswordAccount}>
                Set new password for user {user.username}?<br/>
                <input ref={inputPasswordRef} className={styles.resetPassword} type="text" placeholder="New Password"/>
            </Popup>
            }
        </>
        
    )
}