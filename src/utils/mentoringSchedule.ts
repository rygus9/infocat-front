import { add, format } from 'date-fns';
import durationToTime from './durationToTime';

// ISOString과 duration 받아서 { startDay : "맨토링 처음 시작 날짜 포맷", startTime: "시작 시간", endTime : "종료 시간"} 리턴
export default function mentoringSchedule(ISOString: string, duration: string) {
  const durationTime = durationToTime(duration);
  const startDate = new Date(ISOString);
  const startDay = format(startDate, 'yyyy-MM-dd');
  const startTime = format(startDate, 'HH:mm');
  const endTime = format(add(startDate, { hours: durationTime.hour, minutes: durationTime.min }), 'HH:mm');

  return {
    startDay,
    startTime,
    endTime,
  };
}
