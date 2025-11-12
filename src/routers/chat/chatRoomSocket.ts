import { WebSocketServer } from 'ws'
import { Server } from 'http'

const ChatSocket = (server: Server) => {
  // 실제연결은 ws(http) 이지만 네이밍 편의상 wss(https)로 작성
  const wss = new WebSocketServer({ server })
  let testId = 0
  wss.on('connection', (ws, req) => {
    const url = req.url
    console.log(url)
    console.log('새 클라이언트가 연결되었습니다.')

    // 사용자가 보낸 메시지 처리
    ws.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message.toString())
        console.log('받은 메시지: %s', parsedMessage)
        // throw new Error('hello')

        // 되돌려줄 메시지
        const reMessage = {
          type: 'chat.message',
          id: ++testId, //임시
          sender: {
            id: 5, //임시
            nickname: '스터디장_김',
          },
          content: parsedMessage.content,
          created_at: new Date().toISOString(),
        }
        ws.send(JSON.stringify(reMessage))
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message, '에러')

          const errorMessage = {
            error: e?.message,
          }
          ws.send(JSON.stringify(errorMessage))
        }
      }
    })

    // 일정 주기마다 메시지 보내기 3초마다
    const messageInterval = setInterval(() => {
      const testMessage = {
        type: 'chat.message',
        id: ++testId,
        sender: {
          id: 7,
          nickname: 'test',
        },
        content: '테스트 메시지입니다~~~~~~',
        created_at: new Date().toISOString(),
      }

      ws.send(JSON.stringify(testMessage))
    }, 3000)

    // 이 부분 테스트 추후 제거
    ws.send('채팅 연결완')

    ws.on('close', () => {
      clearInterval(messageInterval)
    })
  })
}

export default ChatSocket
