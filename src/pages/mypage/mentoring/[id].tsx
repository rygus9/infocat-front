import MentoringSessionDetail from '@/components/mypage/MentoringSessionDetail';
import MypageCase from '@/components/mypage/MypageCase';

const mentoringSessionDetail = {
  mentoringSessionId: '1',
  status: 'pending', // done
  title: '백수 구교현의 멘토링', // done
  name: 'gugu', // done
  phone: '01048756823', // done
  email: 'rygus9@ajou.ac.kr', // done
  applyDay: '2022-11-25', // done
  mentoringDay: '2022-12-22T09:00:00.000Z', // done
  point: '10000', // done
  question: '질문 1| 질문 2',
  wanted: '저는 이런 걸 원합니다.',
  introduce: '안녕하세요 저는 이런 아입니다.',
  duration: '01:30', // done
};

const isInformer = false;

const mentoringDetailPage = () => {
  return (
    <MypageCase>
      <MentoringSessionDetail mentoringSessionDetail={mentoringSessionDetail} isInformer={isInformer}></MentoringSessionDetail>
    </MypageCase>
  );
};

export default mentoringDetailPage;
