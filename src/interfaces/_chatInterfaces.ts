export interface ChatRoomListItem {
  id: number
  study_name: string
  sender_id: number
  message_counter: number
  sender_nickname: string
  study_group_id: number
  content: string
  file_url: string | null
  is_read: boolean
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
