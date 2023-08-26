import { NextRequest, NextResponse } from "next/server";
import { apiMiddleware } from "../../middleware";
import { Meetings } from "@/models/Meetings";

export async function DELETE(req: NextRequest, {params}: {params: {meetingid: string}}) {
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res

    const [meeting, err] = await Meetings.deleteMeeting(parseInt(params.meetingid))
    if (!meeting) NextResponse.json({err}, {status: 400})
    return NextResponse.json({meeting})
}

export async function PATCH(req: NextRequest, {params}: {params: {meetingid: string}}) {
    const body = await req.json()
    const [access, res] = await apiMiddleware(req, 3)
    if (!access) return res

    const [meeting, err] = await Meetings.updateMeeting(parseInt(params.meetingid), body)
    if (!meeting) NextResponse.json({err}, {status: 400})
    return NextResponse.json({meeting})
}