import { statusToLabel, StatusType } from '@/contents';
import cls from '@/utils/cls';
import mentoringSchedule from '@/utils/mentoringSchedule';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import StatusLabel from './StatusLabel';

interface MentoringSessionType {
  classSessionId: string;
  title: string;
  name: string;
  status: string;
  applyDay: string;
  mentoringDay: string;
  duration: string;
}

interface MentoringSessionListProps {
  mentoringSessions: MentoringSessionType[];
  onItemClick: (session: string) => void;
}

export default function MentoringSessionList({ mentoringSessions, onItemClick }: MentoringSessionListProps) {
  return (
    <div>
      {/* 멘토링 리스트 표 */}
      <section className="w-full">
        <header className="-z-10 w-full rounded-t-lg bg-darkWhite py-3 text-darkGray shadow-custom">
          <div className="grid grid-cols-[2fr_3fr_2fr_3fr_2fr_1fr] justify-items-center">
            <div>상태</div>
            <div>멘토링명</div>
            <div>멘토</div>
            <div>일정</div>
            <div>신청일시</div>
          </div>
        </header>
        <section className="space-y-1">
          {mentoringSessions
            .map((mentoringSession) => {
              const MentoringDateInfo = mentoringSchedule(mentoringSession.mentoringDay, mentoringSession.duration);
              return {
                ...mentoringSession,
                ...MentoringDateInfo,
              };
            })
            .map((mentoringSession) => (
              <div
                key={mentoringSession.classSessionId}
                className={cls(
                  'grid h-14 grid-cols-[2fr_3fr_2fr_3fr_2fr_1fr] place-items-center justify-items-center bg-white text-darkGray shadow-custom',
                  'cursor-pointer hover:bg-[#fafafa]'
                )}
                onClick={() => onItemClick(mentoringSession.classSessionId)}
              >
                <div>
                  <StatusLabel label={statusToLabel[mentoringSession.status as StatusType]}></StatusLabel>
                </div>
                <div>{mentoringSession.title}</div>
                <div>{mentoringSession.name}</div>
                <div className="flex flex-col justify-center">
                  <div>{mentoringSession.startDay}</div>
                  <div>
                    {mentoringSession.startTime}~{mentoringSession.endTime}
                  </div>
                </div>
                <div>{mentoringSession.applyDay}</div>
                <div className="flex items-center">
                  <ChevronRightIcon className="h-6 w-6 text-lightPurple"></ChevronRightIcon>
                </div>
              </div>
            ))}
        </section>
      </section>
    </div>
  );
}
