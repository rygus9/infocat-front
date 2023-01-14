import cls from '@/utils/cls';
import { range } from 'rambda';
import { useEffect, useState } from 'react';

const weeks = ['월', '화', '수', '목', '금', '토', '일'];

const gridStyle = 'grid grid-cols-7 items-center justify-items-center';
const timeLinePadding = 'pl-14';

// 타임 라인 그려주는 함수.
const printTimeLine = (time: number) => `${time.toString().length === 1 ? '0' + time.toString() : time.toString()}:00`;
// useState에 들어갈 배열을 생성하는 함수.
const createTimeTable = () => {
  const timeTable = [];
  for (let i = 0; i < 48; i++) {
    timeTable.push([0, 0, 0, 0, 0, 0, 0]);
  }
  return timeTable;
};
// 다음 시간을 구해주는 함수.
const nextTime = (row: number, col: number) => {
  let next_row = row + 1;
  if (next_row >= 48) {
    if (col + 1 >= 7) return [0, 0];
    return [0, col + 1];
  }
  return [row + 1, col];
};
// 이전 시간을 구해주는 함수.
const prevTime = (row: number, col: number) => {
  let next_row = row - 1;
  if (next_row < 0) {
    if (col - 1 < 0) return [47, 6];
    return [47, col - 1];
  }
  return [next_row, col];
};
// row와 col을 주:시각:분으로 나타내는 함수.
const indexToStartTime = (row: number, col: number) => {
  let hour = (row / 2) << 0;
  let half = row % 2;
  return `${col}:${hour.toString().length == 1 ? '0' : ''}${hour.toString()}:${half === 1 ? '30' : '00'}`;
};

// 주:시각:분을 [row, col]로
const startTimeToIndex = (startTime: string) => {
  let [week, hour, min] = startTime.split(':').map((elem) => parseInt(elem));
  return [hour * 2 + ((min / 30) << 0), week];
};

interface WeekSchedulerProps {
  timeScale: number;
  onChange: (startTimes: string[]) => void;
  startTimes: string[];
}

export default function WeekScheduler({ timeScale, onChange, startTimes }: WeekSchedulerProps) {
  const [timeTable, setTimeTable] = useState(createTimeTable);
  let scale = timeScale;

  useEffect(() => {
    let nextTable = createTimeTable();
    startTimes.forEach((startTime) => {
      let [now_row, now_col] = startTimeToIndex(startTime);
      if (scale == 1) {
        nextTable[now_row][now_col] = 1;
      } else {
        for (const i of range(0, scale)) {
          if (i === 0) {
            nextTable[now_row][now_col] = 3;
          } else if (i === scale - 1) {
            nextTable[now_row][now_col] = 4;
          } else {
            nextTable[now_row][now_col] = 2;
          }
          [now_row, now_col] = nextTime(now_row, now_col);
        }
      }
    });
    setTimeTable(nextTable);
  }, [startTimes]);

  // 스케줄 없는 공간 클릭 시 채워두기
  const onBlankClick = (row: number, col: number) => {
    onChange(startTimes.concat(indexToStartTime(row, col)));
  };

  // 스케줄 있는 버튼 클릭시 지움
  const onFilledClick = (row: number, col: number) => {
    const nowType = timeTable[row][col];

    if (!(nowType == 1)) {
      let [prev_row, prev_col] = prevTime(row, col);
      while (!(timeTable[prev_row][prev_col] === 0 || timeTable[prev_row][prev_col] === 4)) {
        [prev_row, prev_col] = prevTime(prev_row, prev_col);
      }
      // prev_row, prev_col의 다음이 시작 시간임.
      let [time_row, time_col] = nextTime(prev_row, prev_col);
      onChange(startTimes.filter((startTime) => startTime !== indexToStartTime(time_row, time_col)));
    } else {
      onChange(startTimes.filter((startTime) => startTime !== indexToStartTime(row, col)));
    }
  };

  // scale에 따라 눌리면 안될 부분은 막아주자.
  const isDisabled = (row: number, col: number) => {
    if (timeTable[row][col] !== 0) return false;

    let count = scale;
    while (count > 1) {
      [row, col] = nextTime(row, col);
      count--;
    }
    return timeTable[row][col] !== 0;
  };

  return (
    <section className="h-full w-full overflow-y-scroll border border-lightGray">
      <header
        className={`${gridStyle} ${timeLinePadding} sticky top-0 z-10 h-12 rounded-t-md border-b border-lightGray  bg-white text-base text-darkGray`}
      >
        {weeks.map((elem) => (
          <div key={elem}>{elem}</div>
        ))}
      </header>
      <section>
        {range(0, 48).map((row) => (
          <section className={`${timeLinePadding} relative`} key={row}>
            {row % 2 === 0 && (
              <div className={cls('absolute left-3.5 text-sm text-darkGray', row === 0 ? '-top-1' : '-top-3')}>
                {printTimeLine((row / 2) << 0)}
              </div>
            )}
            {row === 47 && <div className={cls('absolute left-3.5 bottom-0 text-sm text-darkGray')}>{printTimeLine(24)}</div>}
            <div
              className={cls(
                gridStyle,
                'h-8 border-b border-lightGray',
                row % 2 === 1 ? 'border-solid' : 'border-dashed',
                row === 47 && 'border-none'
              )}
            >
              {range(0, 7).map((col) => (
                <CalenderButton
                  key={`${row}${col}`}
                  onClick={timeTable[row][col] === 0 ? () => onBlankClick(row, col) : () => onFilledClick(row, col)}
                  type={timeTable[row][col]}
                  disabled={isDisabled(row, col)}
                ></CalenderButton>
              ))}
            </div>
          </section>
        ))}
      </section>
    </section>
  );
}

// 1 : 하나, 2 : 양 옆만 패딩, 3: 양 옆 + 위, 4 : 양 옆 + 아래
function CalenderButton({ onClick, type, disabled }: { onClick: () => void; type: number; disabled: boolean }) {
  return (
    <button
      className={cls(
        'h-full w-full border-l border-lightGray',
        'disabled:cursor-not-allowed',
        type === 1 && 'p-0.5',
        type === 2 && 'px-0.5',
        type === 3 && 'px-0.5 pt-0.5',
        type === 4 && 'px-0.5 pb-0.5'
      )}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {type !== 0 && (
        <div className={cls('h-full w-full bg-lightPurple', type === 3 && 'rounded-t-md', type === 4 && 'rounded-b-md')}></div>
      )}
    </button>
  );
}
