import cls from '@/utils/cls';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropsWithChildren, useState } from 'react';
import LoginModal from './LoginModal';

const MenuList = [
  {
    memu: '멘토링',
    link: '/mentoring',
  },
  {
    memu: '블로그',
    link: '/blog',
  },
  {
    memu: '커뮤니티',
    link: '/community',
  },
];

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false);
  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);

  const router = useRouter();
  const onRegistClick = () => router.push('/register');

  return (
    <>
      <header className={'fixed z-40 h-[6.5rem] w-full bg-white shadow-md'}>
        <div className="m-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <figure className="text-xl font-bold">LOGO</figure>
          <div className="flex items-center justify-center space-x-2">
            <Button onClick={openLogin}>로그인</Button>
            <Button onClick={onRegistClick}>회원가입</Button>
          </div>
        </div>
        <nav className="flex h-10 items-center justify-center bg-psPurple">
          {MenuList.map((menu) => (
            <Link href={menu.link} key={menu.memu}>
              <a
                className={cls(
                  'flex h-full items-center justify-center border-2 border-psPurple px-5 tracking-wide text-white',
                  'hover:border-b-white'
                )}
              >
                {menu.memu}
              </a>
            </Link>
          ))}
        </nav>
        <LoginModal isOpen={loginOpen} closeModal={closeLogin}></LoginModal>
      </header>
      <div className="h-[6.5rem]"></div>
    </>
  );
}

function Button({ onClick, children }: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button className="rounded-lg bg-psGray-light py-1 px-3 text-sm text-psGray-middle" onClick={onClick}>
      {children}
    </button>
  );
}
