export default function DetailBody() {
  return (
    <section>
      <div className="m-auto max-w-5xl">
        <section className="w-3/5 space-y-6 py-16 text-[#707070]">
          <h3 className="text-2xl">멘토링 소개</h3>
          <p className="w-fit bg-[#e8d6ff]">"안녕하세요 전)카카오뱅크 / 현)LINE 신기용입니다.</p>
          <p>
            취업 / 이직의 최종 관문인 "면접"
            <br /> 그 문턱에서 어떻게 하면 합격할 수 있을까?
            <br /> IT 회사의 면접은 어떻게 진행될까? <br /> IT 회사의 면접에 합격하기 위해선 무엇이 중요할까?
            <br />
            라는 고민은 누구나 한 번쯤은 해보셨을 거라 생각이 듭니다.
          </p>
          <p>
            저 또한 비슷한 고민을 했었고
            <br /> 그 고민 끝에 합격할 수 있는 노하우를 터득할 수 있었고
            <br /> 그 결과 원하는 기업에 합격할 수 있었습니다.
            <br />
            "LINE+ 신입 공채"와 "삼성전자 무선사업부 신입 공채" 동시 합격 <br />
            "카카오뱅크"로 경력 이직
          </p>
          <p>
            이런 노하우를 혼자만 알고 있기엔 아까워
            <br /> 면접에서 합격하기 위한 키 포인트가 무엇이며
            <br /> 그러한 노하우들을 주제로 여러 강연을 하면서
            <br />
            실제로 많은 분의 합격에 도움을 드렸던 경험이 있습니다.
            <br /> 네이버 / 카카오 / LINE / 쿠팡 / 삼성전자 / 삼성 SDS / 현대 등등
          </p>
          <p>
            그래서 혹시 "자소서"와 "면접"에 대해
            <br /> 고민이 있으시다면 부담 갖지 마시고 연락해주세요.
            <br /> 갖고 계신 고민을 해결할 수 있도록 최대한 도와드리겠습니다 !
          </p>
        </section>
      </div>
      <hr />
      <div className="m-auto max-w-5xl">
        <section className="w-3/5 space-y-6 py-12 text-[#707070]">
          <h3 className="text-2xl">멘토 소개</h3>
          <section className="flex w-fit items-center">
            <div className="w-fit">
              <div className="h-24 w-24 rounded-full bg-[#8d8d8d]"></div>
              <div className="mt-2 w-full text-center text-[#707070]">
                <span className="text-lg">신기용</span> 멘토
              </div>
            </div>
            <div className="ml-16 min-w-[400px] rounded-xl bg-[#f2f2f2] p-6">
              <p className="mb-4 font-bold">7년차 벡엔드 개발</p>
              <p>현) 카카오뱅크 개발</p>
              <p>전) LINE+ 신입 공채 합격 및 입사</p>
              <p>전) 삼성전자 무선사업부 신입 공채 합격</p>
            </div>
          </section>
        </section>
      </div>
      <hr />
      <div className="py-8"></div>
    </section>
  );
}
