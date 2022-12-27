import ListBoxInput from '@/components/shared/input/ListBoxInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import FieldInput from '@/components/signup-mentor/FieldInput';
import { fieldCategoryOption, timeScaleOption } from '@/contents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { FormProvider, useForm, useFormContext, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';
import EditorWithForm from './EditorWithForm';
import WeekSchedulerWithForm from './WeekSchedulerWithForm';

const schema = z.object({
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
        <hr className="my-5 text-gray"></hr>
        <section className="space-y-5">
          <FormProvider {...method}>
            <SchedulePart />
          </FormProvider>
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
