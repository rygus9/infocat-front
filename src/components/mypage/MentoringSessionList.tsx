import { statusToLabel, StatusType } from '@/contents';
import cls from '@/utils/cls';
import mentoringSchedule from '@/utils/mentoringSchedule';
import { ChevronRightIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import StatusLabel from './StatusLabel';

interface MentoringSessionType {
  classSessionId: string;
  title: string;
  name: string;
  status: string;
  applyDate: string;
  bookingDay: string;
  duration: string;
}

interface MentoringSessionListProps {
  status: string;
  mentoringSessions: MentoringSessionType[];
  onItemClick: (session: string) => void;
}

export default function MentoringSessionList({ status, mentoringSessions, onItemClick }: MentoringSessionListProps) {
  return (
    <div>
      {/* 멘토링 리스트 표 */}
      <section className="w-full">
        <header className="-z-10 w-full rounded-t-lg bg-darkWhite py-3 text-darkGray shadow-custom">
          <div className="grid grid-cols-[2fr_3fr_3fr_1fr] justify-items-center xs:grid-cols-[2fr_3fr_2fr_3fr_2fr_1fr]">
            <div>상태</div>
            <div>멘토링명</div>
            <div className="hidden xs:block">이름</div>
            <div>일정</div>
            <div className="hidden xs:block">신청일시</div>
          </div>
        </header>
        <section className="space-y-1">
          {mentoringSessions.length === 0 ? (
            <div className="flex w-full flex-col  items-center pt-10">
              {status === 'loading' ? (
                <>
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray border-t-lightGray bg-white"></div>
                  <p className="pt-6 text-lg text-darkGray">로딩 중 입니다.</p>
                </>
              ) : (
                <>
                  <ExclamationCircleIcon className="h-20 w-20 text-darkGray"></ExclamationCircleIcon>
                  <p className="pt-6 text-lg text-darkGray">신청한 멘토링이 없습니다.</p>
                </>
              )}
            </div>
          ) : (
            mentoringSessions
              .map((mentoringSession) => {
                const MentoringDateInfo = mentoringSchedule(mentoringSession.bookingDay, mentoringSession.duration);
                return {
                  ...mentoringSession,
                  ...MentoringDateInfo,
                };
              })
              .map((mentoringSession) => (
                <div
                  key={mentoringSession.classSessionId}
                  className={cls(
                    'min-h-14 grid h-fit grid-cols-[2fr_3fr_3fr_1fr] place-items-center justify-items-center bg-white py-2 text-darkGray shadow-custom xs:grid-cols-[2fr_3fr_2fr_3fr_2fr_1fr]',
                    'cursor-pointer hover:bg-[#fafafa]'
                  )}
                  onClick={() => onItemClick(mentoringSession.classSessionId)}
                >
                  <div>
                    <StatusLabel label={statusToLabel[mentoringSession.status as StatusType]}></StatusLabel>
                  </div>
                  <div>{mentoringSession.title}</div>
                  <div className="hidden xs:block">{mentoringSession.name}</div>
                  <div className="flex flex-col justify-center">
                    <div>{mentoringSession.startDay}</div>
                    <div>
                      {mentoringSession.startTime}~{mentoringSession.endTime}
                    </div>
                  </div>
                  <div className="hidden xs:block">{mentoringSession.applyDate}</div>
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-6 w-6 text-lightPurple"></ChevronRightIcon>
                  </div>
                </div>
              ))
          )}
        </section>
      </section>
    </div>
  );
}
