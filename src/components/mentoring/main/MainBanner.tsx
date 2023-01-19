import Button from '@/components/shared/common/Button';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePathPush from '@/hooks/useReplace';
import cls from '@/utils/cls';

export default function MainBanner() {
  const currentUser = useCurrentUser();
  const onMentorSignUpClick = usePathPush('signup/informer');
  const onMentoringCreate = usePathPush('mentoring/create');

  return (
    <section className="h-56 w-full bg-[#1e344b] md:h-80 lg:h-[22rem]">
      <div className="relative m-auto h-full max-w-5xl">
        <section className={cls('absolute bottom-10 left-10 z-10 text-white', 'md:top-1/2 md:-translate-y-1/2')}>
          <h3 className="text-3xl">1:1 멘토링</h3>
          <p className="text-md pt-3">
            업계 재직중인 선배들에게 질문해보세요.<br></br> 빠르고 쉽게 해결할 수 있어요.
          </p>
        </section>
        <section className="absolute right-10 top-10 md:top-1/2 md:-translate-y-1/2 ">
          <div className="flex justify-end pb-2">
            {currentUser && currentUser.isInformer ? (
              <Button btnStyle="textWhite" onClick={onMentoringCreate}>
                멘토링 생성하기
              </Button>
            ) : (
              <>
                {currentUser && (
                  <Button btnStyle="textWhite" onClick={onMentorSignUpClick}>
                    인포머 지원하기
                  </Button>
                )}
              </>
            )}
          </div>
          <figure className="hidden aspect-square h-52 w-80 overflow-hidden rounded-md md:block">
            <img src="/mentoring.webp" className="h-full w-full object-cover"></img>
          </figure>
        </section>
      </div>
    </section>
  );
}
