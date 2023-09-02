"use client"
import { signOut } from "next-auth/react";
import { PageHeader } from "../components/PageHeader";

export default function blocked() {
    return (
        <div>
            <PageHeader>Unauthorised</PageHeader>
            <p>
                Your account has been disabled by and administrator. Please email an administrator at&nbsp;
                <a href="mailto:admin@thereadingcorner.uk">admin@thereadingcorner.uk</a> to get your account enabled again.
            </p>
            <center>
                <button onClick={() => signOut()} style={{fontSize: "1.4em", padding: "10px 20px"}}>SIGN OUT</button>
            </center>
        </div>
    )
}