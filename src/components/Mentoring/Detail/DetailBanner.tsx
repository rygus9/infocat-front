export default function DetailBanner() {
  const hashText = ['자기소개서', '벡엔드'];

  return (
    <section className="flex h-[260px] w-full items-center bg-[#f2f2f2] sm:h-[330px]">
      <div className="m-auto w-full max-w-5xl px-6 sm:px-10">
        <div className="w-full text-[#707070] sm:w-[max(60%,500px)]">
          <section className="flex items-center space-x-2">
            {hashText.map((hash) => (
              <div key={hash} className="rounded-lg bg-[rgba(141,141,141,0.1)] py-0.5 px-2 text-[#8d8d8d]">
                # {hash}
              </div>
            ))}
          </section>
          <h2 className="py-3 text-2xl font-bold sm:text-3xl">예비 IT 개발자를 위한 취업 준비 가이드 : 자기소개서 특징</h2>
          <p>현직자와 함께하는 IT 개발 분야 자기소개서 특강</p>
        </div>
      </div>
    </section>
  );
}
