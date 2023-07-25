import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

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
    socket.on('message', (message) => {
        io.emit("message", message)
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

server.listen(3001, () => {
    console.log('Server listening on port 3001')
})



function verifyJwt(token: string) {
    try {
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey!);
      return decoded as JwtPayload;
    } catch (error) {
      console.log(error);
      return null;
    }
  }