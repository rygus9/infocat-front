import Button from '@/components/shared/common/Button';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useMutation } from 'react-query';
import loginApi from '@/api/auth/loginApi';
import testCookieApi from '@/api/auth/testCookieApi';
import HeaderLogo from './HeaderLogo';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, closeModal }: LoginModalProps) {
  const { mutateAsync: loginMutate, isLoading: loginLoading } = useMutation(loginApi);

  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const result = await loginMutate(data);
    console.log(result);
  };

  const onClick = async () => {
    const data = await testCookieApi();
    console.log(data);
  };

  const onError = () => {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-sm transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="relative top-1 flex items-center justify-center pt-2 font-bold">
                  <figure className="h-10 w-40">
                    <HeaderLogo></HeaderLogo>
                  </figure>
                </Dialog.Title>
                {/* <p className="text-gray-500 pt-2 text-center">
                  <span className="pr-1 font-bold text-darkPurPle">INFO CAT</span>에 오신걸 환영합니다.
                </p> */}
                <XMarkIcon className="absolute right-4 top-2 h-6 w-6 cursor-pointer text-purple-600" onClick={closeModal}></XMarkIcon>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                  <section className="mt-4 space-y-2">
                    <WrapLabel label="이메일" id="email">
                      <TextInput id="email" register={register('email')} type="email" placeholder="이메일"></TextInput>
                    </WrapLabel>
                    <WrapLabel label="비밀번호" id="password">
                      <TextInput id="password" register={register('password')} type="password" placeholder="비밀번호"></TextInput>
                    </WrapLabel>
                  </section>

                  <div className="pt-6">
                    <Button type="submit" color="purple" buttonStyle="fill" size="w-full h-10">
                      로그인
                    </Button>
                  </div>
                  <div className="text-gray-500 pt-2 text-center text-sm">
                    아직 회원이 아니신가요?{' '}
                    <Link href="/signup">
                      <a onClick={closeModal} className="pl-1 text-base text-purple-500 hover:underline hover:underline-offset-2">
                        회원가입
                      </a>
                    </Link>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
