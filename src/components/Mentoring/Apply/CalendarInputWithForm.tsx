import { timeScaleOption } from '@/contents';
import useMentoringSchedule from '@/query/useMentoringSchedule';
import getDurationTitle from '@/utils/getDurationTitle';
import { UseControllerProps, useController } from 'react-hook-form';
import CalendarInput from './CalenderInput';

export default function CalendarInputWithForm({ ...props }: UseControllerProps<any, any>) {
  const {
    field: { value, onChange, ref },
  } = useController(props);

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
