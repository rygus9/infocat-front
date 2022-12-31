import { useEffect } from 'react';
import { UseControllerProps, useController } from 'react-hook-form';
import WeekScheduler from './WeekScheduler';

export default function WeekSchedulerWithForm({
  timeScale,
  ...props
}: UseControllerProps<any, any> & {
  timeScale: number;
}) {
  const {
    field: { value, onChange, ref },
  } = useController(props);

  useEffect(() => {
    if (value.length !== 0) onChange([]);
  }, [timeScale]);

  return (
    <div className="h-[30rem]">
      <WeekScheduler startTimes={value} onChange={onChange} timeScale={timeScale}></WeekScheduler>
    </div>
  );
}
