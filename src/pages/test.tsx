import WeekScheduler from '@/components/Mentoring/Create/WeekScheduler';
import { useState } from 'react';

const test = () => {
  const [timeTable, setTimeTable] = useState([]);

  return (
    <div className="m-auto h-[40rem] w-3/5 pt-20">
      <WeekScheduler startTimes={timeTable} onChange={(startTimes: any) => setTimeTable(startTimes)} timeScale={3}></WeekScheduler>
    </div>
  );
};

export default test;
