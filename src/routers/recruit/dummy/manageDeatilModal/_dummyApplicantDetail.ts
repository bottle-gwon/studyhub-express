import type { ApplicantDetail } from '@/interfaces/_applicantDetailInterface.js'

export const dummyApplicantDetail: ApplicantDetail[] = [
  {
    id: 12,
    nickname: '홍길동',
    profile_image: 'https://cdn.example.com/profiles/juwon.png',
    introduction:
      '안녕하세요! 프론트엔드 개발을 배우고 있는 홍길동입니다. 현재 React를 활용한 프로젝트를 진행하고 있으며, Unity를 통한 게임 개발에 관심이 생겨 지원했습니다.',
    motivation:
      'Unity 게임 개발을 통해 새로운 영역에 도전하고 싶습니다. 특히 3D 게임 개발 경험을 쌓고 향후 게임 개발자로 전향하는 것이 목표입니다.',
    goal: '3개월 후에는 Unity를 활용한 완성도 높은 3D 게임을 개발할 수 있는 능력을 갖추고 싶습니다.',
    available_times: ['월 18:00-20:00', '수 19:00-21:00'],
    has_study_experience: true,
    study_experience_detail:
      '작년에 React 스터디를 6개월간 진행했으며, 팀 프로젝트로 쇼핑몰 웹사이트를 완성했습니다.',
    status: 'pending',
    created_at: '2024-11-25 14:30',
    gender: '남성',
  },
  {
    id: 13,
    nickname: 'frontend_park',
    gender: '여성',
    profile_image: 'https://cdn.example.com/profiles/juwon.png',
    introduction:
      '안녕하세요! 프론트엔드 개발을 배우고 있는 홍길동입니다. 현재 React를 활용한 프로젝트를 진행하고 있으며, Unity를 통한 게임 개발에 관심이 생겨 지원했습니다.',
    motivation:
      'Unity 게임 개발을 통해 새로운 영역에 도전하고 싶습니다. 특히 3D 게임 개발 경험을 쌓고 향후 게임 개발자로 전향하는 것이 목표입니다.',
    goal: '3개월 후에는 Unity를 활용한 완성도 높은 3D 게임을 개발할 수 있는 능력을 갖추고 싶습니다.',
    available_times: ['월 18:00-20:00', '수 19:00-21:00'],
    has_study_experience: false,
    study_experience_detail:
      '작년에 React 스터디를 6개월간 진행했으며, 팀 프로젝트로 쇼핑몰 웹사이트를 완성했습니다.',
    status: 'accepted',
    created_at: '2025-10-15 19:48',
  },
]
