export default function MainBanner() {
  return (
    <section className="h-[450px] w-full bg-[#8d8d8d]">
      <div className="m-auto flex h-full w-full max-w-6xl items-stretch px-10">
        <section className="flex flex-1 flex-col justify-center px-10 text-white">
          <h3 className="text-[30px]">1:1 멘토링</h3>
          <p className="text-[18px]">
            업계 재직중인 선배들에게 질문해보세요.<br></br> 빠르고 쉽게 해결할 수 있어요.
          </p>
        </section>
        <section className="flex flex-1 flex-col items-end justify-center px-10">
          <span className="w-fit pb-3 text-[18px] text-white">멘토 지원하기</span>
          <div className="h-[280px] w-full rounded-md bg-white"></div>
        </section>
      </div>
    </section>
  );
}
