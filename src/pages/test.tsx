import cls from '@/utils/cls';
import { range } from 'rambda';

const weekends = ['', '월', '화', '수', '목', '금', '토', '일'];
const TimeLines = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '24:00',
];

const test = () => {
  return (
    <>
      <div className="m-auto w-full max-w-lg pt-20">
        <div className="pb-2 text-base text-darkGray">스케줄러</div>
        <section className="h-fit w-full">
          <section className="grid grid-cols-8 justify-items-center border border-lightGray py-2">
            {weekends.map((weekend) => (
              <div className="text-darkGray">{weekend}</div>
            ))}
          </section>
          <section className="grid h-64 grid-cols-8 overflow-y-auto border border-t-0 border-lightGray"></section>
        </section>
      </div>
      <div className="m-auto w-full max-w-lg pt-20">
        <div className="pb-2 text-base text-darkGray">텍스트 에디터</div>
      </div>
    </>
  );
};

export default test;
