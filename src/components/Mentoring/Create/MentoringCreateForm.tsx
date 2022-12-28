import ListBoxInput from '@/components/shared/input/ListBoxInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import CareersInput from '@/components/signup-mentor/CareersInput';
import FieldInput from '@/components/signup-mentor/FieldInput';
import { fieldCategoryOption, timeScaleOption } from '@/contents';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import { FormProvider, useForm, useFormContext, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import EditorWithForm from './EditorWithForm';
import WeekSchedulerWithForm from './WeekSchedulerWithForm';

const schema = z.object({
  careers: z.array(
    z.object({
      content: z.string(),
    })
  ),
  mentoringName: z.string().min(1, '멘토링 이름은 필수 입력입니다.').max(50, '멘토링 이름은 50자 이하입니다.'),
  mentoringShortIntro: z.string().min(1, '멘토링 짧은 소개는 필수 입력입니다.').max(200, '짧은 소개는 200자 이하 입니다.'),
  mentoringField: z.object({ value: z.string(), name: z.string() }),
  mentoringContent: z.string(),
  price: z.string().min(1, '포인트 가격은 필수 입력입니다.'),
  timeScale: z.object({ value: z.string(), name: z.string() }),
  startTimes: z.array(z.string()).min(1, '시간 하나 이상은 필수입력입니다.'),
});

export type MentoringFormType = z.infer<typeof schema>;

export default function MentoringCreateForm() {
  const method = useForm<MentoringFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      mentoringField: fieldCategoryOption[0],
      timeScale: timeScaleOption[0],
      startTimes: [],
      careers: [{ content: '' }],
    },
  });
  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = method;
  const onSubmit = (data: any) => {
    console.log('Mentoring Create Data', data);
  };
  const onError = (error: any) => {
    console.log('Mentoring Create Error : ', error);
  };

  return (
    <>
      <h1 className="mt-20 text-center text-2xl text-darkGray">인포머님 멘토링을 생성해보세요.</h1>
      <section className="pt-10">
        <div className="flex items-center justify-between pt-6">
          <h3 className="text-xl text-darkGray">등록된 인포머 정보</h3>
          <Link href="/mypage">
            <a className="inline-flex text-lightPurple">
              수정하기 <ArrowRightIcon className="h-6 w-6"></ArrowRightIcon>
            </a>
          </Link>
        </div>
        <section className="space-y-2 py-3">
          <InfoViewer label="이름">구교현</InfoViewer>
          <InfoViewer label="전화번호">01048756823</InfoViewer>
          <InfoViewer label="회사">아주대학교</InfoViewer>
          <InfoViewer label="직무">프론트엔드</InfoViewer>
          <InfoViewer label="연차">4</InfoViewer>
        </section>
      </section>
      <hr className="my-5 text-lightGray"></hr>
      <form className="pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
          <h3 className="pt-6 text-xl text-darkGray">멘토링 정보</h3>
          <WrapLabel label="멘토링 이름" id="mentoringName" required errorMessage={errors.mentoringName?.message}>
            <TextInput register={register('mentoringName')} type="text" placeholder="예 ) 예비 개발자를 위한 자기소개서 첨삭"></TextInput>
          </WrapLabel>
          <WrapLabel label="멘토링 한줄소개" id="mentoringShortIntro" required errorMessage={errors.mentoringShortIntro?.message}>
            <TextInput
              register={register('mentoringShortIntro')}
              type="text"
              placeholder="예 ) 현직자와 함께하는 IT개발분야 자기소개서 특강"
            ></TextInput>
          </WrapLabel>
          <WrapLabel id="mentoringField" label="멘토링 희망분야" errorMessage={errors.mentoringField?.message}>
            <ListBoxInput list={fieldCategoryOption} name="mentoringField" control={control}></ListBoxInput>
          </WrapLabel>
          <WrapLabel id="mentoringCategory" label="멘토링 카테고리">
            <FieldInput></FieldInput>
          </WrapLabel>
          <WrapLabel label="멘토링 소개" id="mentoringContent" required errorMessage={errors.mentoringContent?.message}>
            <EditorWithForm name="mentoringContent" control={control}></EditorWithForm>
          </WrapLabel>
          <WrapLabel label="이력사항" id="careers" errorMessage={errors.careers?.message}>
            <CareersInput
              register={register}
              name={'careers'}
              control={control}
              placeholder="가장 최신의 경력 사항부터 입력해주세요."
            ></CareersInput>
          </WrapLabel>
        </section>
        <hr className="my-5 text-lightGray"></hr>
        <section className="space-y-5">
          <h3 className="pt-6 text-xl text-darkGray">스케줄 정보</h3>
          <FormProvider {...method}>
            <SchedulePart />
          </FormProvider>
        </section>
        <section className="flex items-center justify-center pt-10">
          <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="submit">
            등록하기
          </button>
        </section>
      </form>
    </>
  );
}

function SchedulePart() {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext<MentoringFormType>();
  useEffect(() => {}, [watch().timeScale]);
  return (
    <>
      <WrapLabel label="회당 포인트 가격" id="price" required moreInfo="숫자만 포인트 단위로 입력해주세요. 예) 10000p -> 10000">
        <TextInput type="number" register={register('price')} placeholder="여기에 입력해주세요."></TextInput>
      </WrapLabel>
      <WrapLabel id="timeScale" label="회당 멘토링 시간." errorMessage={errors.timeScale?.message} required>
        <ListBoxInput list={timeScaleOption} name="timeScale" control={control}></ListBoxInput>
      </WrapLabel>
      <WrapLabel id="" label="스케줄 선택" required>
        <WeekSchedulerWithForm control={control} name="startTimes" timeScale={parseInt(watch().timeScale.value)}></WeekSchedulerWithForm>
      </WrapLabel>
    </>
  );
}

interface SimpleInfoViewerProps {
  label: string;
  children: ReactNode;
}

function InfoViewer({ label, children }: SimpleInfoViewerProps) {
  return (
    <div className="flex items-center justify-start text-base">
      <div className="w-24 text-left font-semibold text-darkGray">{label}</div> <div className="text-gray">{children}</div>
    </div>
  );
}
