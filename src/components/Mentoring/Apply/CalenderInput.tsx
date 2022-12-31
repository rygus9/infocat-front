import cls from '@/utils/cls';
import { DefaultDict } from '@/utils/defaultDict';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { startOfToday, format, parse, eachDayOfInterval, add, getDay, isEqual, isToday, endOfMonth, startOfDay } from 'date-fns';
import { useState } from 'react';

let colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

/* 서버에서 보낼 데이터 생성 중 */
let today = startOfToday();

/* 서버서는 01:30 이런 식으로 날라옴 */
function durationParse(duration: string) {
  let [hours, minutes] = duration.split(':').map((timeStr) => parseInt(timeStr));
  return {
    hours,
    minutes,
  };
}

function createScheduleTable(availableDays: string[]) {
  const obj = new DefaultDict(Array) as any;
  availableDays.forEach((ISOstring) => {
    const nowDate = new Date(ISOstring);
    const dayStart = startOfDay(nowDate);

    obj[dayStart.toISOString()].push(nowDate);
  });
  return obj;
}

function alreadyReserved(bookingTimes: string[], day: Date) {
  const time = day.toISOString();
  console.log('현재 날짜 시간', time);
  return bookingTimes.includes(time);
}

interface CalendarInputProps {
  selectTime: Date | null;
  setSelectTime: (time: Date) => void;
  duration: string;
  availableTimes: string[];
  bookingTimes: string[];
}

export default function CalendarInput({ selectTime, setSelectTime, availableTimes, bookingTimes, duration }: CalendarInputProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(selectTime ? startOfDay(selectTime) : undefined);
  const [currentMonth, setCurrentMonth] = useState(selectTime ? format(selectTime, 'MMM-yyyy') : format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = selectTime
    ? parse(currentMonth, 'MMM-yyyy', new Date(selectTime))
    : parse(currentMonth, 'MMM-yyyy', new Date());
  // parse는 data-fns => new Date로 바꾸어줌. (현재 date-fns 포맷을 알면)
  // 기본적으로 Date 객체를 기반으로 한다.

  console.log(bookingTimes);

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  const previousMonth = () => {
    let firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  const onTimeButton = (time: Date) => {
    setSelectTime(time);
  };

  const onDayButton = (day: Date) => {
    setSelectedDay(day);
    // setSelectTime(scheduleTable[day.toISOString()].map((ISOFormat: string) => new Date(ISOFormat))[0]);
  };

  const scheduleTable = createScheduleTable(availableTimes);
  const availableDays = Object.keys(scheduleTable);
  const nowTimeList = selectedDay ? scheduleTable[selectedDay.toISOString()].map((ISOFormat: string) => new Date(ISOFormat)) : [];

  return (
    <>
      <section className="h-full w-full border border-lightGray">
        <div className="m-auto max-w-lg py-5">
          <section className="grid grid-cols-7 text-center leading-6 text-darkGray">
            <button type="button" onClick={previousMonth} className="col-start-1 flex items-center justify-center rounded-full">
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="h-7 w-7" aria-hidden="true" />
            </button>
            <h2 className="col-span-5 flex-auto py-3 text-center text-xl">{format(firstDayCurrentMonth, 'yyyy.MM')}</h2>
            <button onClick={nextMonth} type="button" className="col-start-7 flex items-center justify-center rounded-full">
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </section>
          <section className="m-auto max-w-md">
            <div className="mt-3 grid grid-cols-7 text-center text-sm leading-6 text-lightGray">
              <div>일</div>
              <div>월</div>
              <div>화</div>
              <div>수</div>
              <div>목</div>
              <div>금</div>
              <div>토</div>
            </div>
            <div className="mt-2 grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => (
                <div key={day.toString()} className={cls(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1.5')}>
                  <button
                    type="button"
                    onClick={() => onDayButton(day)}
                    className={cls(
                      selectedDay !== undefined && isEqual(day, selectedDay) && 'bg-lightPurple text-white',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                      'disabled:text-lightGray'
                    )}
                    disabled={availableDays.filter((ISODay) => isEqual(new Date(ISODay), day)).length === 0}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
      <section className={cls('mt-3 border border-lightGray py-8 px-4', nowTimeList.length === 0 ? 'items-center' : 'items-start')}>
        <div className="m-auto max-w-lg">
          {nowTimeList.length === 0 ? (
            <div className="w-full text-darkGray">날짜를 먼저 선택해주세요.</div>
          ) : (
            <>
              <div className="w-full text-darkGray">시간을 선택해주세요.</div>
              <section className="mt-4 grid grid-cols-3 justify-items-center gap-3">
                {nowTimeList.map((day: Date) => (
                  <button
                    key={format(day, 'yyyy-MM-HH:mm')}
                    className={cls(
                      'rounded-2xl border border-darkWhite py-1.5 px-5 text-sm',
                      selectTime && isEqual(day, selectTime) ? 'bg-lightPurple text-white' : 'bg-darkWhite text-darkGray',
                      'disabled:border disabled:border-gray disabled:bg-white disabled:text-gray disabled:line-through'
                    )}
                    onClick={() => onTimeButton(day)}
                    disabled={alreadyReserved(bookingTimes, day)}
                    type="button"
                  >
                    {format(day, 'HH:mm')} - {format(add(day, durationParse(duration)), 'HH:mm')}
                  </button>
                ))}
              </section>
            </>
          )}
        </div>
      </section>
    </>
  );
}
