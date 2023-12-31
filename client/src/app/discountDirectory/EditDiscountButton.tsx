"use client"
import { useState } from "react";
import { MoreButton } from "../components/MoreButton";
import { EditDiscount } from "./EditDiscount";
import { DiscountDirectory } from "@prisma/client";
import { Popup } from "../components/Popup";

export function EditDiscountButton({discountDetails}: {discountDetails: DiscountDirectory}) {

    const [inEdit, setInEdit] = useState(false)
    const [inDelete, setInDelete] = useState(false)
    
    const deleted = async () => {
        await fetch(`/api/discountDirectory/${discountDetails.discountdirectoryid}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
    }

    const buttons = {
        Edit: () => {setInEdit(true)},
        Delete: () => {setInDelete(true)}
    }

    return (
        <>
            <MoreButton buttons={buttons}/>
            { inEdit
            && <EditDiscount discountDetails={discountDetails} setClicked={setInEdit}/>
            }
            { inDelete
            && <Popup title="CONFIRMATION" setClicked={setInDelete} confirm={deleted}>
                <p>
                    Are you sure you want to delete the <q>{discountDetails.title}</q> discount?<br/>
                    This action is <b style={{color: 'red'}}>IRREVERSIBLE</b>.
                </p>
            </Popup>
            }
        </>
    )
}