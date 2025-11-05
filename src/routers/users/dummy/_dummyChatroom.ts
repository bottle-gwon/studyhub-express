const dummyChatRoom = {
  status: 'success',
  code: 'SUCCESS',
  message: '채팅방 목록 조회 성공',
  data: {
    messages: [
      {
        id: 201,
        sender_id: 5,
        sender_nickname: '홍길동',
        study_group_id: 100,
        content: '오늘 스터디 7시에 시작합니다.',
        file_url: null,
        is_read: true,
        created_at: '2025-10-15T10:30:00Z',
      },
    ],
    pagination: {
      page: 1,
      page_size: 20,
      total_count: 102,
    },
  },
}

export default dummyChatRoom
