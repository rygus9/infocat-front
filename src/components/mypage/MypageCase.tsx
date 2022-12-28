import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cls from '@/utils/cls';

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
        title: '멘토링 관리하기',
        link: '/mypage/informer/mentoring',
      },
      {
        title: '인포머 정보 관리',
        link: '/mypage/informer',
      },
    ],
  },
];

export default function MypageCase({ children }: { children: ReactNode }) {
  const router = useRouter();
  const nowPath = router.route;

  return (
    <main className="m-auto w-full max-w-4xl px-4">
      <div className="flex pt-10">
        {/* navigation Part */}
        <section className="divide-y divide-darkWhite">
          {LinkInfo.map((mainSection) => (
            <div key={mainSection.title} className="space-y-2 py-4 pr-10">
              <h4 className="text-lg font-semibold text-darkGray">{mainSection.title}</h4>
              <div className="space-y-2">
                {mainSection.subLinks.map((subSection) => (
                  <div key={subSection.title}>
                    <Link href={subSection.link}>
                      <a className={cls('text-lg', nowPath === subSection.link ? 'text-lightPurple' : 'text-gray')}>{subSection.title}</a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
        {/* management Part */}
        <section className="flex-1 py-4 pl-16">{children}</section>
      </div>
    </main>
  );
}
