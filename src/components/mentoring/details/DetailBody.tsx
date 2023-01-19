import Viewer from '@/components/shared/editor/Viewer';

interface DetailBodyProps {
  content: string;
  career: string;
  nickname: string;
  years: string;
  job: string;
}

export default function DetailBody({ content, career, nickname, years, job }: DetailBodyProps) {
  return (
    <section className="w-fit flex-1 sm:px-3">
      <div className="m-auto max-w-5xl">
        <section className="min-h-[24rem] w-full space-y-6 py-16 text-[#707070]">
          <h3 className="text-2xl">멘토링 소개</h3>
          <Viewer textBody={content}></Viewer>
        </section>
      </div>
      <hr className="text-lightGray" />
      <div className="m-auto max-w-5xl">
        <section className="w-full space-y-6 py-12 text-[#707070]">
          <h3 className="text-2xl">멘토 소개</h3>
          <section className="flex w-full flex-col items-center sm:flex-row">
            <div className="w-fit">
              <div className="h-24 w-24 rounded-full bg-[#8d8d8d]"></div>
              <div className="mt-2 w-full text-center text-[#707070]">
                <span className="text-lg">{nickname}</span> 멘토
              </div>
            </div>
            <div className="mt-8 min-w-[18rem] rounded-xl bg-[#f2f2f2] p-6 sm:mt-0 sm:ml-16">
              <p className="mb-4 font-bold">
                {years}년차 {job}
              </p>
              <>
                {career &&
                  career
                    .split('|')
                    .filter((elem) => elem)
                    .map((elem, index) => (
                      <p key={`${elem} ${index}`}>
                        {index === 0 ? '현)' : '전)'} {elem}
                      </p>
                    ))}
              </>
            </div>
          </section>
        </section>
      </div>
      <hr className="text-lightGray" />
      <div className="py-8"></div>
    </section>
  );
}
