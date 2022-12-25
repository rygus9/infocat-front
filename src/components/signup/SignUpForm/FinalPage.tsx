import { useRouter } from 'next/router';

export default function FinalPage() {
  const router = useRouter();
  const onHomeClick = () => {
    router.replace('/');
  };
  const onLoginClick = () => {
    router.replace('/login');
  };

  return (
    <div>
      <header>
        <h2 className="text-gray-800 pt-10 text-center text-[1.6rem] md:text-3xl">회원가입이 완료되었습니다.</h2>
      </header>
      <section className="pt-4">
        <p className="text-center text-lg text-gray">Infocat에서 취업을 준비하세요.</p>
        <section className="flex items-center justify-center space-x-2 pt-20">
          <button className="rounded-full bg-darkWhite px-8 py-2 text-lg text-darkGray" type="button" onClick={onHomeClick}>
            홈으로
          </button>
          <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="button" onClick={onLoginClick}>
            로그인 페이지로
          </button>
        </section>
      </section>
    </div>
  );
}
