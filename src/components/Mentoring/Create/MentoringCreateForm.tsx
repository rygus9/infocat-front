import ListBoxInput from '@/components/shared/input/ListBoxInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import FieldInput from '@/components/signup-mentor/FieldInput';
import { fieldCategoryOption } from '@/contents';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import EditorWithForm from './EditorWithForm';

const schema = z.object({
  mentoringName: z.string().min(1, '멘토링 이름은 필수 입력입니다.').max(50, '멘토링 이름은 50자 이하입니다.'),
  mentoringShortIntro: z.string().min(1, '멘토링 짧은 소개는 필수 입력입니다.').max(200, '짧은 소개는 200자 이하 입니다.'),
  mentoringField: z.object({ value: z.string(), name: z.string() }),
  mentoringContent: z.string(),
  price: z.string().min(1, '포인트 가격은 필수 입력입니다.'),
  hour: z.object({ value: z.string(), name: z.string() }),
  schedule: z.array(z.string()).min(1, '시간 하나 이상은 필수입력입니다.'),
});

export type MentoringFormType = z.infer<typeof schema>;

export default function MentoringCreateForm() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MentoringFormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      mentoringField: fieldCategoryOption[0],
    },
  });
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
        <section className="space-y-5"></section>
      </form>
    </>
  );
}
