import express from 'express'
import http from 'http'
import { getToken } from 'next-auth/jwt'
import { Server } from 'socket.io'

var cors = require("cors");

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  };
  
app.use(cors(corsOpts));

app.get('/test', (req, res) => {

    console.log(req.headers)
    //res.send(getToken({req, secret: "kjhkjhjhoikpoipioaloiuohoiuhbgfvliuyvuyftioqwu4yro19yetoiuov123iurc1oi23ro1i723ro123213rs"}))
    res.send({"asdfa": "sadfa"})
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

