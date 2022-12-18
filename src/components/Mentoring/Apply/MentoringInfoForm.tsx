import TextAreaInput from '@/components/shared/input/TextAreaInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { useForm } from 'react-hook-form';
import CalendarInput from './CalenderInput';
import QuestionsInput from './QuestionsInput';

interface MentoringInfoFormProps {
  onPrev: () => void;
}

export default function MentoringInfoForm({ onPrev }: MentoringInfoFormProps) {
  const { register, control, watch } = useForm<any>({
    defaultValues: {
      question: [{ content: '' }],
    },
  });

  return (
    <>
      <h1 className="mt-20 text-center text-2xl text-darkGray">인포머와 약속을 잡아보세요.</h1>
      <form className="pt-16 pb-20">
        <section className="space-y-5">
          <WrapLabel label="날짜 및 시간 선택" id="schedule" required>
            <CalendarInput></CalendarInput>
          </WrapLabel>
          <WrapLabel
            label="사전 질문"
            id="question"
            moreInfo="멘토링에 앞서, 궁금한 내용을 멘토님에게 미리 알려주세요. 더욱 효과적인 멘토링이 가능해요."
          >
            <QuestionsInput register={register} name={'question'} control={control} placeholder="질문을 입력하세요."></QuestionsInput>
          </WrapLabel>
          <WrapLabel label="바라는 점" id="wanted" moreInfo="본 멘토링에서 멘토님에게 바라는 점이 있다면 작성해주세요.">
            <TextAreaInput register={register('wanted')} placeholder="바라는 점을 입력하세요." rows={4}></TextAreaInput>
          </WrapLabel>
        </section>
        <section className="flex w-full items-center justify-center space-x-4 pt-10">
          <button className="rounded-full bg-darkWhite px-8 py-2 text-lg text-darkGray" type="button" onClick={onPrev}>
            이전
          </button>
          <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="button">
            제출하기
          </button>
        </section>
      </form>
    </>
  );
}
