import type { Notification } from '@/interfaces/_notificationInterfaces.js'

const dummyNotifications: Notification[] = [
  {
    id: Date.now(),
    user_id: 2023,
    content:
      '🎉 축하합니다! "JavaScript 마스터 되기" 스터디에 참여하게 되었습니다. 이제 콘솔.로그 말고 실제 프로그램을 만들어보죠!',
    type: 'STUDY_JOIN',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T09:30:00Z',
    updated_at: '2025-11-05T09:30:00Z',
  },
  {
    id: Date.now(),
    user_id: 2024,
    content:
      '📝 김코딩님이 "React 훅스 완전정복" 스터디에 새로운 노트를 작성했습니다. 제목: "useState가 이렇게 간단할 줄이야..."',
    type: 'STUDY_NOTE_CREATE',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T14:15:30Z',
    updated_at: '2025-11-05T14:20:00Z',
  },
  {
    id: Date.now(),
    user_id: 2025,
    content:
      '👀 박개발님이 당신의 코드 리뷰를 요청했습니다. "이 코드가 왜 안되는지 모르겠어요... 도와주세요 🥺"',
    type: 'STUDY_REVIEW_REQUEST',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T16:45:22Z',
    updated_at: '2025-11-05T16:45:22Z',
  },
  {
    id: Date.now(),
    user_id: 2026,
    content:
      '✅ 축하합니다! "알고리즘 정복단" 스터디 신청이 승인되었습니다. 이제 시간복잡도와 친해질 시간이에요!',
    type: 'APLLICATION_ACCPET',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-04T20:30:15Z',
    updated_at: '2025-11-04T21:00:00Z',
  },
  {
    id: Date.now(),
    user_id: 2027,
    content:
      '❌ 아쉽게도 "백엔드 신들의 모임" 스터디 신청이 거절되었습니다. 아직 당신의 때가 아닌 것 같아요... 다음 기회에!',
    type: 'APPLICATION_REJECT',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-04T18:22:33Z',
    updated_at: '2025-11-04T18:22:33Z',
  },
  {
    id: Date.now(),
    user_id: 2028,
    content:
      '📨 새로운 지원자가 있습니다! 이준혁님이 "프론트엔드 마법사들" 스터디에 지원했어요. 프로필: "HTML도 프로그래밍 언어라고 생각합니다"',
    type: 'APPLICATIONS_CREATED',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T11:20:45Z',
    updated_at: '2025-11-05T11:25:00Z',
  },
  {
    id: Date.now(),
    user_id: 2029,
    content:
      '⏰ 오늘 일정 알림: 오후 7시 "Python 뱀 길들이기" 스터디 모임이 있어요! 늦지 마세요~ (커피와 과자 준비됨)',
    type: 'TODY_SCHEDULE',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T10:00:00Z',
    updated_at: '2025-11-05T10:00:00Z',
  },
  {
    id: Date.now(),
    user_id: 2030,
    content:
      '📅 내일 오후 2시 "데이터베이스 마스터" 스터디가 예정되어 있습니다. 주제: "JOIN이 이렇게 복잡할 줄 몰랐다..." 미리 준비하세요!',
    type: 'UPCOMING_SCHEDULE',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-04T22:30:00Z',
    updated_at: '2025-11-05T08:00:00Z',
  },
  {
    id: Date.now(),
    user_id: 2031,
    content:
      '🚀 최민수님이 "Node.js 정복기" 스터디에 참여했습니다. 비동기의 늪에서 함께 헤엄쳐봐요!',
    type: 'STUDY_JOIN',
    is_read: false,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T13:45:12Z',
    updated_at: '2025-11-05T13:45:12Z',
  },
  {
    id: Date.now(),
    user_id: 2032,
    content:
      '📝 정소영님이 "CSS 마법사 되기" 스터디에 새 노트를 올렸어요. 제목: "Flexbox vs Grid - 둘 다 헷갈린다면 이 글을 보세요"',
    type: 'STUDY_NOTE_CREATE',
    is_read: true,
    back_url_link: 'https://www.google.com',
    created_at: '2025-11-05T15:20:30Z',
    updated_at: '2025-11-05T15:25:15Z',
  },
]

export default dummyNotifications
