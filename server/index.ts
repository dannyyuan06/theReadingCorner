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
    socket.on('message', (message:string) => {
        console.log(message),
        io.emit('message', message)
    })
})

server.listen(3001, () => {
    console.log('Server listening on port 3001')
})