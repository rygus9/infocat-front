import MentoringSessionList from '@/components/mypage/MentoringSessionList';
import MypageCase from '@/components/mypage/MypageCase';
import { useRouter } from 'next/router';

const mentoringSessions = [
  {
    classSessionId: '1',
    title: '백수 구교현의 멘토링',
    name: '구교현',
    status: 'pending',
    applyDay: '2022-11-25',
    mentoringDay: '2022-12-22T09:00:00.000Z',
    duration: '01:30',
  },
  {
    classSessionId: '2',
    title: '백수 구교현의 멘토링',
    name: '구교현',
    status: 'complete',
    applyDay: '2022-11-23',
    mentoringDay: '2022-12-22T09:00:00.000Z',
    duration: '01:30',
  },
];

const mypageMentoring = () => {
  const router = useRouter();
  const onDetailClick = (session: string) => {
    router.push(router.route + '/' + session);
  };

  return (
    <MypageCase>
      <MentoringSessionList mentoringSessions={mentoringSessions} onItemClick={onDetailClick} />
    </MypageCase>
  );
};

export default mypageMentoring;
