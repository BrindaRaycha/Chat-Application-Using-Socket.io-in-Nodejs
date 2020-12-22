//express import
const express = require('express')
const app = express()
const http = require('http').createServer(app)


const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//middleware use 
app.use(express.static(__dirname + '/public'))

//create route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket import http server call
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    //listen message event 
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg) //client connect with this
                                            // sever send message to all client
    })

})