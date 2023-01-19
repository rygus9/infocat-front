import MentoringSessionList from '@/components/mypage/MentoringSessionList';
import MypageCase from '@/components/mypage/MypageCase';
import useInformerSession from '@/query/useInformerSession';
import getDurationTitle from '@/contents/translate/getDurationTitle';
import { useRouter } from 'next/router';

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
