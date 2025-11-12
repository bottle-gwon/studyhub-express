import { WebSocketServer } from 'ws'
import { Server } from 'http'

const ChatSocket = (server: Server) => {
  // 실제연결은 ws 이지만
  console.log(server, '서버')
  const wss = new WebSocketServer({ server })

  wss.on('connection', function connection(ws, req) {
    const studyGroupUuid = req.url
    console.log(studyGroupUuid)
    console.log('새 클라이언트가 연결되었습니다.')
    ws.on('message', function incoming(message) {
      console.log('받은 메시지: %s', message)
      ws.send(`${message} confirm`)
    })

    ws.send('WebSocket 서버에 오신 것을 환영합니다!')
  })
}

export default ChatSocket
