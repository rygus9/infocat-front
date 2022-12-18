import cls from '@/utils/cls';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { startOfToday, format, parse, eachDayOfInterval, add, getDay, isEqual, isSameMonth, isToday, endOfMonth } from 'date-fns';
import { useState } from 'react';

let colStartClasses = ['', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7'];

export default function CalendarInput() {
  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  // parse는 data-fns => new Date로 바꾸어줌. (현재 date-fns 포맷을 알면)
  // 기본적으로 Date 객체를 기반으로 한다.

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  let availableDays = eachDayOfInterval({
    start: add(firstDayCurrentMonth, { days: 14 }),
    end: add(endOfMonth(firstDayCurrentMonth), { days: -2 }),
  }).map((elem) => elem.toISOString());

  const previousMonth = () => {
    let firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'));
  };

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  };

  return (
    <section className="h-full w-full border border-lightGray">
      <div className="m-auto max-w-lg py-3">
        <section className="text-gray-500 grid grid-cols-7 text-center leading-6">
          <button type="button" onClick={previousMonth} className="col-start-1 flex items-center justify-center rounded-full">
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5 font-light text-black" aria-hidden="true" />
          </button>
          <h2 className="col-span-5 flex-auto py-3 text-center text-xl text-black">{format(firstDayCurrentMonth, 'yyyy.MM')}</h2>
          <button onClick={nextMonth} type="button" className="col-start-7 flex items-center justify-center rounded-full">
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5 text-black" aria-hidden="true" />
          </button>
        </section>
        <section>
          <div className="text-gray-500 mt-3 grid grid-cols-7 text-center text-sm leading-6 text-darkGray">
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
                  onClick={() => setSelectedDay(day)}
                  className={cls(
                    isEqual(day, selectedDay) && 'bg-darkPurPle text-white',
                    isToday(day) && 'text-lightPurple',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                    'disabled:text-lightGray disabled:line-through'
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
  );
}
