import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import { Meetings } from "@/models/Meetings";
import { AddMeetingType } from "@/lib/types/fetchTypes/addMeeting";

export async function POST(req: NextRequest) {
    const body:AddMeetingType = await req.json()

    const [access, errRes] = await apiMiddleware(req, 3)
    if (!access) return errRes

    const sendData:AddMeetingType = {...body, dateOfMeeting: new Date(body.dateOfMeeting)}

    const res = await Meetings.addMeeting(sendData)
    return NextResponse.json(res)
}