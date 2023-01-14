import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import loginApi from '@/api/auth/loginApi';
import HeaderLogo from '@/layout/Header/HeaderLogo';
import { useState } from 'react';
import { getErrorMessage } from '@/contents/errorMessage';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import currentUserAtom from '@/recoil/user/currentUserAtom';
import Button from '@/components/shared/common/Button';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { mutateAsync: loginMutate, isLoading: loginLoading } = useMutation(loginApi);
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const { register, handleSubmit } = useForm<LoginForm>();
  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: LoginForm) => {
    try {
      const loginResult = await loginMutate(data);
      console.log(loginResult);
      setCurrentUser({ isInformer: loginResult.isMentor, nickName: loginResult.nickname });
      // mocking용 추후 지워야 하는 부분
      localStorage.setItem('email', data.email);
      //
      router.push('/');
    } catch (errorCode) {
      setServerError(getErrorMessage(errorCode as string));
      return;
    }
  };

  const onError = () => {};
  return (
    <main className="m-auto max-w-md pt-16">
      <figure className="flex h-10 w-full items-center justify-center font-bold">
        <HeaderLogo></HeaderLogo>
      </figure>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="px-4">
        <section className="mt-4 space-y-2">
          <WrapLabel label="이메일" id="email">
            <TextInput id="email" register={register('email')} type="text" placeholder="이메일"></TextInput>
          </WrapLabel>
          <WrapLabel label="비밀번호" id="password">
            <TextInput id="password" register={register('password')} type="password" placeholder="비밀번호"></TextInput>
          </WrapLabel>
        </section>

        <div className="pt-6 text-center">
          {serverError && <div className="pb-1 text-center text-sm text-red-500">{serverError}</div>}
          <Button type="submit" btnStyle="submitMain">
            {loginLoading ? '로딩 중...' : '로그인'}
          </Button>
        </div>
        <div className="text-gray-500 pt-2 text-center text-sm">
          아직 회원이 아니신가요?{' '}
          <Link href="/signup">
            <a className="pl-1 text-base text-purple-500 hover:underline hover:underline-offset-2">회원가입</a>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
