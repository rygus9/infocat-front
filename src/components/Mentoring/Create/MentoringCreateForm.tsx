import ListBoxInput from '@/components/shared/input/ListBoxInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import CareersInput from '@/components/signup-mentor/CareersInput';
import FieldInput from '@/components/signup-mentor/FieldInput';
import { fieldCategoryOption, timeScaleOption } from '@/contents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm, useFormContext, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import EditorWithForm from './EditorWithForm';
import WeekSchedulerWithForm from './WeekSchedulerWithForm';

const schema = z.object({
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phoneNumber: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  job: z.string().min(1, '직무는 필수 입력입니다.'),
  years: z
    .string()
    .min(1, '연차는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
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
      <form className="pt-16 pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
          <h3 className="text-xl text-darkGray">계정 정보</h3>
          <WrapLabel label="이름" id="name" moreInfo="실명으로 입력하세요." required errorMessage={errors.name?.message}>
            <TextInput register={register('name')} type="text" placeholder="이름을 입력하세요."></TextInput>
          </WrapLabel>
          <WrapLabel
            label="휴대전화 번호"
            id="phoneNumber"
            moreInfo="멘토링관련 정보를 보내드립니다. 정확하게 기입해주세요!"
            required
            errorMessage={errors.phoneNumber?.message}
          >
            <TextInput register={register('phoneNumber')} type="number" placeholder="휴대전화 번호 (-빼고 입력)"></TextInput>
          </WrapLabel>
        </section>
        <hr className="my-5 text-lightGray"></hr>
        <section className="space-y-5">
          <h3 className="pt-6 text-xl text-darkGray">인포머 정보</h3>
          <WrapLabel label="직무" id="job" errorMessage={errors.job?.message} moreInfo="예) 웹프론트엔드, 앱디자이너, 서비스PM" required>
            <TextInput id="job" register={register('job')} type="text" placeholder="직무를 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="연차" id="years" errorMessage={errors.years?.message} moreInfo="숫자만 입력해주세요. 예) 5년차 -> 5" required>
            <TextInput id="years" register={register('years')} type="number" placeholder="연차를 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="커리어" id="careers" errorMessage={errors.careers?.message}>
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
