import { statusToLabel, StatusType } from '@/contents';
import mentoringSchedule from '@/utils/mentoringSchedule';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import StatusLabel from './StatusLabel';

interface MentoringSessionType {
  mentoringSessionId: string;
  status: string;
  title: string;
  name: string;
  phone: string;
  email: string;
  applyDay: string;
  mentoringDay: string;
  point: string;
  question: string;
  wanted: string;
  introduce: string;
  duration: string;

  // 추가적으로
  answer?: string; // <= approveDone 이후
  reason?: string; // <= approveFail 이후
  // isReview: false; // 멘티 입장 리뷰를 남겼는지.
}

interface MentoringSessionDetailProps {
  mentoringSessionDetail: MentoringSessionType;
  isInformer: boolean;
}

export default function MentoringSessionDetail({ mentoringSessionDetail, isInformer }: MentoringSessionDetailProps) {
  const MentoringDateInfo = mentoringSchedule(mentoringSessionDetail.mentoringDay, mentoringSessionDetail.duration);
  const router = useRouter();
  const onBack = () => {
    router.back();
  };

  const answerList = mentoringSessionDetail.answer && mentoringSessionDetail.answer.split('|');

  return (
    <div className="pb-10">
      <header className="flex items-center justify-start">
        <h3 className="pr-4 text-xl text-darkGray">{mentoringSessionDetail.title}</h3>
        <div className="flex-1">
          <StatusLabel label={statusToLabel[mentoringSessionDetail.status as StatusType]}></StatusLabel>
        </div>
        <button className="flex items-center text-sm text-darkGray underline" onClick={onBack}>
          <ChevronLeftIcon className="h-4 w-4"></ChevronLeftIcon>
          뒤로가기
        </button>
      </header>
      <section className="mt-6 space-y-2 border border-lightGray p-4">
        <InfoViewer label="이름">{mentoringSessionDetail.name}</InfoViewer>
        <InfoViewer label="전화번호">{mentoringSessionDetail.phone}</InfoViewer>
        <InfoViewer label="이메일">{mentoringSessionDetail.email}</InfoViewer>
        <InfoViewer label="신청일자">{mentoringSessionDetail.applyDay}</InfoViewer>
        <InfoViewer label="멘토링 일정">
          {MentoringDateInfo.startDay} : {MentoringDateInfo.startTime} ~ {MentoringDateInfo.endTime}
        </InfoViewer>
        <InfoViewer label="결재 포인트">{mentoringSessionDetail.point}</InfoViewer>
      </section>
      <section className="mt-4 space-y-4">
        <TextAreaViewer label="멘티 소개">{mentoringSessionDetail.introduce}</TextAreaViewer>
        <TextAreaViewer label="바라는 점">{mentoringSessionDetail.wanted}</TextAreaViewer>
        <TextAreaViewer label="질문사항">
          {mentoringSessionDetail.question.split('|').map((question, index) => (
            <div key={question} className="py-2">
              <h5 className="font-bold">
                {index + 1}. {question}
              </h5>
              {answerList && <p className="pt-1 pl-2">{answerList[index]}</p>}
            </div>
          ))}
        </TextAreaViewer>
      </section>
      {/* pending, assign, done, expiredDate, mentorRefuse */}
      <ControlPart isInformer={isInformer} status={mentoringSessionDetail.status}></ControlPart>
    </div>
  );
}

interface ControlPartProps {
  isInformer: boolean;
  status: string;
}

function ControlPart({ isInformer, status }: ControlPartProps) {
  return (
    <section className="mt-6 flex items-center justify-end space-x-2">
      {status === 'Pending' && isInformer && (
        <>
          <button className="rounded-full border border-lightPurple px-4 py-1 text-base text-lightPurple" type="button">
            거절하기
          </button>
          <button className="rounded-full bg-lightPurple px-4 py-1 text-base text-darkWhite" type="button">
            수락하기
          </button>
        </>
      )}
      {status === 'MentorRefuse' && (
        <button className="rounded-full bg-lightPurple px-4 py-1 text-base text-darkWhite" type="button">
          거절사유보기
        </button>
      )}
    </section>
  );
}

// 간단한 라인 뷰어
interface SimpleInfoViewerProps {
  label: string;
  children: ReactNode;
}

function InfoViewer({ label, children }: SimpleInfoViewerProps) {
  return (
    <div className="flex items-center justify-start text-base">
      <div className="w-24 text-left font-semibold text-darkGray">{label}</div> <div className="text-gray">{children}</div>
    </div>
  );
}

// 간단한 TextArea뷰어
interface TextAreaViewerProps {
  label: string;
  children: ReactNode;
}

function TextAreaViewer({ label, children }: TextAreaViewerProps) {
  return (
    <div>
      <p className="pb-1 text-base font-bold text-darkGray">{label}</p>
      <div className="h-fit min-h-[5rem] border border-lightGray p-2 text-darkGray">{children}</div>
    </div>
  );
}
