import MentoringSessionList from '@/components/mypage/MentoringSessionList';
import MypageCase from '@/components/mypage/MypageCase';
import useInformerSession from '@/query/useInformerSession';
import getDurationTitle from '@/utils/getDurationTitle';
import { useRouter } from 'next/router';

const mentoringSessions = [
  {
    classSessionId: '1',
    title: '백수 구교현의 멘토링',
    name: '구교현',
    status: 'Pending',
    applyDate: '2022-11-25',
    bookingDay: '2022-12-22T09:00:00.000Z',
    duration: '1',
  },
  {
    classSessionId: '2',
    title: '백수 구교현의 멘토링',
    name: '구교현',
    status: 'Complete',
    applyDate: '2022-11-23',
    bookingDay: '2022-12-22T09:00:00.000Z',
    duration: '1',
  },
];

const mypageInformerMentoring = () => {
  const router = useRouter();
  const onDetailClick = (session: string) => {
    router.push(router.route + '/' + session);
  };
  const { data, status } = useInformerSession();

  return (
    <MypageCase>
      <MentoringSessionList
        status={status}
        mentoringSessions={data ? data.content.map((session) => ({ ...session, duration: getDurationTitle(session.duration) })) : []}
        onItemClick={onDetailClick}
      />
    </MypageCase>
  );
};

export default mypageInformerMentoring;
