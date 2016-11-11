import express from 'express'
import http from 'http'
import compress from 'compression'
import io from 'socket.io'

import _debug from 'debug'
var debug = _debug('server:web')
var debugSocket = _debug('server:socket')

/**
 * Static web server
 */

const app = express()

app.set('port', process.env.PORT || 11110)
app.use(compress())
app.use(express.static('dist'))

const server = http.createServer(app)

server.listen(app.get('port'), function (err, result) {
  if (err) return debug(err)
  debug(`server is running on ${app.get('port')} port`)
})

/**
 * Socket.IO
 */

const socketServer = io(server)

socketServer.on('connection', function (socket) {
  socket.emit('connected')
  debugSocket('emit [connected]')
})
