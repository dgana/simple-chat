const express = require('express')
var path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const cors = require('cors')

app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket) => {
  console.log('Socket Connected')
  socket.on('disconnect', () => {
    console.log('User disconnected')
  })
  socket.on('chat message', (msg) => {
    console.log('Message: ' + msg)
  })
  socket.broadcast.emit('HI')
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

http.listen(8080, () => {
  console.log('listening on 8080')
})
