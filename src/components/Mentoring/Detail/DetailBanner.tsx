export default function DetailBanner() {
  const hashText = ['자기소개서', '벡엔드'];

  return (
    <section className="flex h-[330px] w-full items-center bg-[#f2f2f2]">
      <div className="m-auto w-full max-w-5xl">
        <div className="w-3/5 text-[#707070]">
          <section className="flex items-center space-x-2">
            {hashText.map((hash) => (
              <div className="rounded-lg bg-[rgba(141,141,141,0.1)] py-0.5 px-2 text-[#8d8d8d]"># {hash}</div>
            ))}
          </section>
          <h2 className="py-3 text-3xl font-bold">예비 IT 개발자를 위한 취업 준비 가이드 : 자기소개서 특징</h2>
          <p>현직자와 함께하는 IT 개발 분야 자기소개서 특강</p>
        </div>
      </div>
    </section>
  );
}
