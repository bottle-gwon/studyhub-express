import type { Notification } from '@/interfaces/_notificationInterfaces.js'

const dummyNotifications: Notification[] = [
  {
    id: Date.now(),
    user_id: Date.now(),
    content: '크하하하하하 아하하하하 이히히히히ㅣ 야호',
    type: 'STUDY_JOIN',
    is_read: true,
    back_url_link: 'string',
    created_at: '2025-11-01',
    updated_at: '2025-11-01',
  },
]

export default dummyNotifications
