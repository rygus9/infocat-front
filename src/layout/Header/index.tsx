import Button from '@/components/shared/common/Button';
import cls from '@/utils/cls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginModal from './LoginModal';

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const makeRouteFunc = (path: string) => () => {
    router.push(path);
  };
  const openLogin = () => {
    setLoginOpen(true);
  };
  const closeLogin = () => {
    setLoginOpen(false);
  };

  return (
    <>
      <nav className={cls('fixed z-40 h-20 w-full bg-white shadow-md shadow-gray-200 md:h-14', 'px-4 md:px-10')}>
        <div className="m-auto flex h-12 w-full max-w-6xl flex-wrap items-center md:h-full">
          <h3
            className={cls(
              'flex-1 cursor-pointer font-semibold uppercase tracking-wider text-purple-600 md:flex-initial',
              'text-[1.3rem] md:text-[1.4rem]'
            )}
            onClick={makeRouteFunc('/')}
          >
            Resumerry
          </h3>
          <div className="ml-10 hidden md:block md:flex-1">
            <PathList></PathList>
          </div>
          <AuthPanel makeRouteFunc={makeRouteFunc} openLogin={openLogin} />
        </div>
        <div className="flex h-8 items-start justify-start md:hidden">
          <PathList></PathList>
        </div>
      </nav>
      <div className="h-20 w-full md:h-14"></div>
      <LoginModal isOpen={loginOpen} closeModal={closeLogin}></LoginModal>
    </>
  );
}

const AuthPanel = ({ makeRouteFunc, openLogin }: { makeRouteFunc: (path: string) => () => void; openLogin: () => void }) => (
  <section className="flex items-center justify-center space-x-2 md:space-x-4">
    <Button type="button" buttonStyle="border" color="gray" size="text-sm w-16 h-7 md:w-24 sm:w-20 md:h-8 md:text-base" onClick={openLogin}>
      로그인
    </Button>
    <Button
      type="button"
      buttonStyle="fill"
      color="gray"
      size="text-sm w-16 h-7 sm:w-20 md:w-24 md:h-8 md:text-base"
      onClick={makeRouteFunc('/signup')}
    >
      회원가입
    </Button>
  </section>
);

const menus = [
  {
    title: '질문 게시판',
    path: '/post',
  },
  {
    title: '이력서 보기',
    path: '/resume',
  },
];

const PathList = () => (
  <ul className={cls('truncate text-base tracking-wide text-gray-600 md:text-[1.05rem]', 'flex items-center justify-start space-x-4')}>
    {menus.map((menu) => (
      <li className="hover:text-purple-500" key={menu.path}>
        <Link href={menu.path}>
          <a>{menu.title}</a>
        </Link>
      </li>
    ))}
  </ul>
);
