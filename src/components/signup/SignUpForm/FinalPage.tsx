import Button from '@/components/shared/common/Button';
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
          <Button btnStyle="submitSub" type="button" onClick={onHomeClick}>
            홈으로
          </Button>
          <Button btnStyle="submitMain" type="button" onClick={onLoginClick}>
            로그인 페이지로
          </Button>
        </section>
      </section>
    </div>
  );
}
