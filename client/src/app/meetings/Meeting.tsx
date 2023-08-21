'use client'
import Image from "next/image";
import styles from "./Meeting.module.css"
import { Meetings } from "@prisma/client";
import { MoreButton } from "../components/MoreButton";
import { useState } from "react";
import { EditMeeting } from "./EditMeeting";
import { Popup } from "../components/Popup";
import { useSession } from "next-auth/react";


export function Meeting(props: Meetings) {
    const {title, dateOfMeeting, description, host, link, imageLink, meetingid} = props

    const [editMeeting, setEditMeeting] = useState(false)
    const [deleteMeeting, setDeleteMeeting] = useState(false)
    const { data }:any = useSession()

    const moreButtons = {
        "Edit": () => {setEditMeeting(true)},
        "Delete": () => {setDeleteMeeting(true)}
    }

    const deleteMeetingHandler = () => {
        fetch(`/api/meetings/deleteMeeting/${meetingid}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            setDeleteMeeting(false)
        })
    }
    return (
        <div className={styles.container}>
            <div style={{width: 450, height: 330}}>
                <Image loading="eager" alt="book placeholder" src={imageLink} width={450} height={330} style={{objectFit: 'cover'}}/>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.headerBodySeparator}>
                    <div className={styles.titles}>
                        <h2 className={styles.title}>
                            <div>{title}</div>
                            {data?.accessLevel === 3
                            && <div className={styles.moreButton}>
                                <MoreButton buttons={moreButtons}/>    
                            </div>
                            }
                        </h2>
                        <h3>HOST: <span>{host}</span></h3>
                        <h3>DATE: <span>{dateOfMeeting.toLocaleDateString("en-GB")}</span></h3>
                        <h3>TIME: <span>{dateOfMeeting.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</span></h3>
                        <h3>LINK: <span><a href={link} target="_blank">{link}</a></span></h3>
                    </div>
                </div>
                <div className={styles.bodyWrapper}>
                    {description}
                </div>
            </div>
            {editMeeting
            && <EditMeeting meetingDetails={props} setClicked={setEditMeeting}/>
            }
            {deleteMeeting
            && <Popup title="Confirmation" setClicked={setDeleteMeeting} confirm={deleteMeetingHandler}>
                Are you sure you want to delete the <q>{title}</q> meeting?<br/>
                This action is <b style={{color: 'red'}}>IRREVERSIBLE</b>.
            </Popup>
            }
        </div>
    )
}