export interface ChatRoomListItem {
  uuid: string
  name: string
  unread_message_count: number
  last_message_sender_nickname: string
  last_message_content: string
  created_at: string
}
export interface Message {
  id: number
  is_read: boolean
  content: string
  sender_nickname: string
  sender_id: number
  created_at: string
  updated_at: string
}
