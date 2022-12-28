import TextAreaInput from '@/components/shared/input/TextAreaInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { useForm } from 'react-hook-form';
import QuestionsInput from './QuestionsInput';
import { z } from 'zod';
import CalendarInputWithForm from './CalendarInputWithForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import mentoringFormAtom from '@/recoil/form/mentoringApply/mentoringFormAtom';

const schema = z.object({
  schedule: z.string().min(1, '스케줄 입력은 필수입니다.'),
  questions: z.array(
    z.object({
      content: z.string(),
    })
  ),
  wanted: z.string(),
});

export type MentoringApplyMentoringType = z.infer<typeof schema>;

interface MentoringInfoFormProps {
  onPrev: () => void;
}

export default function MentoringInfoForm({ onPrev }: MentoringInfoFormProps) {
  const [mentoringFormState, setMentoringFormState] = useRecoilState(mentoringFormAtom);

  const { register, control, handleSubmit, getValues } = useForm<MentoringApplyMentoringType>({
    defaultValues: mentoringFormState,
  });

  const onPrevButton = () => {
    setMentoringFormState(getValues());
    onPrev();
  };

  const onSubmit = (data: MentoringApplyMentoringType) => {};

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <>
      <h1 className="mt-20 text-center text-2xl text-darkGray">인포머와 약속을 잡아보세요.</h1>
      <form className="pt-16 pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
          <WrapLabel label="날짜 및 시간 선택" id="schedule" required>
            <CalendarInputWithForm name="schedule" control={control}></CalendarInputWithForm>
          </WrapLabel>
          <WrapLabel
            label="사전 질문"
            id="question"
            moreInfo="멘토링에 앞서, 궁금한 내용을 멘토님에게 미리 알려주세요. 더욱 효과적인 멘토링이 가능해요."
          >
            <QuestionsInput register={register} name={'questions'} control={control} placeholder="질문을 입력하세요."></QuestionsInput>
          </WrapLabel>
          <WrapLabel label="바라는 점" id="wanted" moreInfo="본 멘토링에서 멘토님에게 바라는 점이 있다면 작성해주세요.">
            <TextAreaInput register={register('wanted')} placeholder="바라는 점을 입력하세요." rows={4}></TextAreaInput>
          </WrapLabel>
        </section>
        <section className="flex w-full items-center justify-center space-x-4 pt-10">
          <button className="rounded-full bg-darkWhite px-8 py-2 text-lg text-darkGray" type="button" onClick={onPrevButton}>
            이전
          </button>
          <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="submit">
            제출하기
          </button>
        </section>
      </form>
    </>
  );
}
