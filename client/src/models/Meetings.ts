import { AddMeetingType } from "@/lib/types/fetchTypes/addMeeting";
import { prisma } from "@/prisma/db";


export class Meetings {
    static async getMeetings() {
        const res = await prisma.meetings.findMany({
            take: 5,
            orderBy: {
                dateOfMeeting: 'asc'
            },
            where: {
                dateOfMeeting: {
                    gte: new Date()
                }
            }
        })
        prisma.$disconnect()
        return res
    }

    static async updateMeeting(meetingid: number, data:AddMeetingType) {
        try {
            const res = await prisma.meetings.update({
                where: {meetingid},
                data: data
            })
            prisma.$disconnect()
            return [res, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }

    static async addMeeting(data:AddMeetingType) {
        const res = await prisma.meetings.create({
            data: data
        })
        prisma.$disconnect()
        return res
    }

    static async deleteMeeting(meetingid: number) {
        try {
            const meeting = await prisma.meetings.delete({
                where: {meetingid}
            })
            prisma.$disconnect()
            return [meeting, ""]
        } catch (err) {
            return [null, `${err}`]
        }
    }
}