import MentoringSessionList from '@/components/mypage/MentoringSessionList';
import MypageCase from '@/components/mypage/MypageCase';
import useMenteeSession from '@/query/useMenteeSession';
import getDurationTitle from '@/contents/translate/getDurationTitle';
import { useRouter } from 'next/router';

const mypageMentoring = () => {
  const { data, status } = useMenteeSession();

  const router = useRouter();
  const onDetailClick = (session: string) => {
    router.push(router.route + '/' + session);
  };

  console.log(data);

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

export default mypageMentoring;
