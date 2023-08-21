import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

io.on('connection', (socket) => {
    // prisma.bulletinBoardMessages.findMany({
    //     take: 10,
    //     orderBy: {
    //         messageid: 'desc'
    //     },
    //     include: {
    //         Book: true,
    //         Users: true
    //     }
    // })
    // .then((res) => socket.emit("connected", res))
    console.log("connection")
    socket.on('message', (message) => {
        io.emit("message", message)
        // console.log("message sent")

        // console.log(message, typeof message)
        // try {
        //     const prisma = new PrismaClient()
        //     prisma.bulletinBoardMessages.create({
        //         data: {
        //             title: message.title,
        //             body: message.body,
        //             bookid: message.bookid,
        //             username: message.username,
        //         }
        //     })
        //     .then((res) => console.log(res))
        // }
        // catch (err) {
        //     console.log(err)
        // }
    })
})

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on port ${process.env.PORT || 8080}`)
})