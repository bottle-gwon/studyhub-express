import type { Notification } from '@/interfaces/_notificationInterfaces.js'

const dummyNotifications: Notification[] = [
  {
    id: Date.now(),
    user_id: 2023,
    content:
      '📨 새로운 지원자가 있습니다! 김코딩님이 "JavaScript 마스터 되기" 스터디에 지원했어요. 자기소개: "Hello World가 제 첫사랑입니다 💕"',
    type: 'APPLICATION_CREATED',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T09:30:00Z',
    updated_at: '2025-11-05T09:30:00Z',
  },
  {
    id: Date.now(),
    user_id: 2024,
    content:
      '✅ 축하합니다! "React 훅스 완전정복" 스터디 신청이 승인되었습니다. 이제 useEffect 지옥에서 함께 놀아봐요!',
    type: 'APPLICATION_STATUS_APPROVAL',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T14:15:30Z',
    updated_at: '2025-11-05T14:20:00Z',
  },
  {
    id: Date.now(),
    user_id: 2025,
    content:
      '❌ 아쉽게도 "백엔드 신들의 모임" 스터디 신청이 거절되었습니다. 아직 당신의 때가 아닌 것 같네요... 더 수련하고 오세요!',
    type: 'APPLICATION_STATUS_REJECTION',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T16:45:22Z',
    updated_at: '2025-11-05T16:45:22Z',
  },
  {
    id: Date.now(),
    user_id: 2026,
    content:
      '🎉 박개발님이 "알고리즘 정복단" 스터디에 새로 합류했습니다! 이제 Big O 표기법의 늪에서 함께 헤맬 동료가 생겼어요!',
    type: 'STUDY_MEMBER_JOINED',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-04T20:30:15Z',
    updated_at: '2025-11-04T21:00:00Z',
  },
  {
    id: Date.now(),
    user_id: 2027,
    content:
      '👀 이준혁님이 당신의 코드 리뷰를 요청했습니다. 메시지: "이 코드가 왜 안되는지 정말 모르겠어요... SOS 🆘"',
    type: 'STUDY_REVIEW_REQUEST',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-04T18:22:33Z',
    updated_at: '2025-11-04T18:22:33Z',
  },
  {
    id: Date.now(),
    user_id: 2028,
    content:
      '📅 내일 오후 2시 "데이터베이스 마스터" 스터디가 예정되어 있습니다. 주제: "JOIN의 비밀 - 왜 이렇게 복잡하게 만들었을까?" 각오하세요!',
    type: 'STUDY_SCHEDULE_UPCOMING',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T11:20:45Z',
    updated_at: '2025-11-05T11:25:00Z',
  },
  {
    id: Date.now(),
    user_id: 2029,
    content:
      '⏰ 오늘 일정 알림: 오후 7시 "Python 뱀 길들이기" 스터디 모임이 있어요! 늦지 마세요~ (피자와 콜라 준비완료 🍕)',
    type: 'STUDY_SCHEDULE_TODAY',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T10:00:00Z',
    updated_at: '2025-11-05T10:00:00Z',
  },
  {
    id: Date.now(),
    user_id: 2030,
    content:
      '📝 최민수님이 "Node.js 정복기" 스터디에 새로운 기록을 작성했습니다. 제목: "콜백지옥 탈출기 - 내가 async/await를 만난 날"',
    type: 'STUDY_RECORD_CREATED',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-04T22:30:00Z',
    updated_at: '2025-11-05T08:00:00Z',
  },
  {
    id: Date.now(),
    user_id: 2031,
    content:
      '🔧 시스템 점검 안내: 내일 새벽 2시-4시 서버 업그레이드를 진행합니다. 혹시 새벽에 코딩하시는 올빼미 개발자분들 참고하세요!',
    type: 'SYSTEM',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T13:45:12Z',
    updated_at: '2025-11-05T13:45:12Z',
  },
  {
    id: Date.now(),
    user_id: 2032,
    content:
      '🎯 정소영님이 맞춤 메시지를 보냈습니다: "CSS Grid 마스터하고 나니 세상이 달라 보여요! 다들 화이팅! 💪"',
    type: 'CUSTOM',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T15:20:30Z',
    updated_at: '2025-11-05T15:25:15Z',
  },
]

export default dummyNotifications
