import Button from '@/components/shared/common/Button';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { Dialog, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/20/solid';

interface LoginModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, closeModal }: LoginModalProps) {
  const { register } = useForm<LoginForm>();

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
                <Dialog.Title as="h3" className="text-center text-2xl font-medium uppercase leading-6 text-purple-600">
                  Resumerry
                </Dialog.Title>
                <p className="pt-2 text-center text-gray-500">Resumerry에 오신걸 환영합니다.</p>
                <XMarkIcon className="absolute right-4 top-2 h-6 w-6 cursor-pointer text-purple-600" onClick={closeModal}></XMarkIcon>
                <form>
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
                  <div className="pt-2 text-center text-sm text-gray-500">
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
