import useMentoringSchedule from '@/query/useMentoringSchedule';
import getDurationTitle from '@/contents/translate/getDurationTitle';
import { UseControllerProps, useController } from 'react-hook-form';
import CalendarInput from './CalenderInput';

interface CalendarInputContainerProps {
  value: any;
  onChange: (event: any) => void;
}

export default function CalendarInputContainer({ value, onChange }: CalendarInputContainerProps) {
  const path = location.pathname.split('/')[2];

  const { data, status } = useMentoringSchedule(path);
  const nowTime = value ? new Date(value) : null;
  const duration = data && getDurationTitle(data.duration);
  const availableTimes = data?.totalDays;
  const bookingTimes = data?.bookingDays;
  return (
    <CalendarInput
      selectTime={nowTime}
      setSelectTime={(time) => onChange(time.toISOString())}
      availableTimes={availableTimes || []}
      duration={duration || '01:00'}
      bookingTimes={bookingTimes || []}
    ></CalendarInput>
  );
}
