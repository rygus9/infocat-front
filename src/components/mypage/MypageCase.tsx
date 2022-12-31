import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cls from '@/utils/cls';
import { Bars3Icon } from '@heroicons/react/20/solid';
import useCurrentUser from '@/hooks/useCurrentUser';

const LinkInfo = [
  {
    title: '내 정보',
    subLinks: [
      {
        title: '내 프로필',
        link: '/mypage',
      },
      {
        title: '계정 정보 관리',
        link: '/mypage/account',
      },
      {
        title: '포인트 정보 관리',
        link: '/mypage/point',
      },
    ],
  },
  {
    title: '내 멘토링',
    subLinks: [
      {
        title: '멘토링 신청 정보',
        link: '/mypage/mentoring',
      },
      {
        title: '저장한 멘토링',
        link: '/mypage/mentoring/store',
      },
    ],
  },
  {
    title: '인포머 관련 정보',
    subLinks: [
      {
        title: '인포머 정보 관리',
        link: '/mypage/informer',
      },
      {
        title: '멘토링 관리',
        link: '/mypage/informer/mentoring',
      },
    ],
  },
];

export default function MypageCase({ children }: { children: ReactNode }) {
  const router = useRouter();
  // [id] 빼버리기....
  const nowPath =
    '/' +
    router.route
      .split('/')
      .filter((elem) => elem !== '[id]' && elem)
      .join('/');
  const links = LinkInfo.flatMap((mainCategory) => mainCategory.subLinks);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="m-auto w-full max-w-4xl md:px-10">
      <div className="md:flex md:pt-10">
        {/* 데스크탑 네비게이션 */}
        <section className="hidden divide-y divide-darkWhite pr-8 md:block">
          <NavigationPart></NavigationPart>
        </section>
        {/* 모바일 내비게이션 ㅠㅠ */}
        <section className={cls('m-auto flex w-full max-w-xl items-center justify-start py-4 pl-3', 'md:hidden')}>
          <Bars3Icon className="mr-3 inline-block h-6 w-6 cursor-pointer text-darkGray" onClick={() => setMobileOpen(true)}></Bars3Icon>
          <h3 className="cursor-pointer text-xl text-darkGray xs:text-2xl" onClick={() => setMobileOpen(true)}>
            {links.filter((subLink) => subLink.link === nowPath)[0].title}
          </h3>
          {mobileOpen && <MobileNav onClose={() => setMobileOpen(false)}></MobileNav>}
        </section>
        {/* management Part */}
        <section className="m-auto max-w-xl flex-1 py-4 px-3  md:m-0 md:max-w-none md:px-0 md:pl-5 lg:pl-10 xl:pl-16">{children}</section>
      </div>
    </main>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  const headerNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const onMyClose = () => {
    headerNavRef.current?.classList.remove('animate-moveRight');
    headerNavRef.current?.classList.add('animate-moveLeft');
    setTimeout(() => {
      onClose();
    }, 280);
  };

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    const clicked = (e.target as HTMLElement).closest('.inner');
    if (clicked) return;
    onMyClose();
  };

  return (
    <div onClick={onClick} className="fixed top-0 left-0 z-40 flex h-screen w-full bg-black bg-opacity-50">
      {/* 왼쪽에서 나오는 시나리오 가자 */}
      <div
        className="inner relative w-[13rem] transform-gpu animate-moveRight items-center overflow-y-scroll bg-white pl-6 pt-10 xs:w-[16rem]"
        ref={headerNavRef}
      >
        <NavigationPart></NavigationPart>
      </div>

      {/* 화면 깔아줄 아이 */}
      <div className="flex-auto"></div>
    </div>
  );
}

function NavigationPart() {
  const router = useRouter();
  // [id] 빼버리기....
  const nowPath =
    '/' +
    router.route
      .split('/')
      .filter((elem) => elem !== '[id]' && elem)
      .join('/');
  const userState = useCurrentUser();

  return (
    <>
      {LinkInfo.filter((mainSection) => (userState?.isInformer === true ? mainSection.title !== '인포머 정보 관련' : true)).map(
        (mainSection) => (
          <div key={mainSection.title} className="space-y-2 py-4 text-[1.05rem]">
            <h4 className="font-semibold text-darkGray">{mainSection.title}</h4>
            <div className="space-y-2">
              {mainSection.subLinks.map((subSection) => (
                <div key={subSection.title}>
                  <Link href={subSection.link}>
                    <a className={cls(nowPath === subSection.link ? 'text-lightPurple' : 'text-gray')}>{subSection.title}</a>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </>
  );
}
