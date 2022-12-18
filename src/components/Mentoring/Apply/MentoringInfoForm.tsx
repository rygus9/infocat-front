import WrapLabel from '@/components/shared/input/WrapLabel';
import { useForm } from 'react-hook-form';
import CalendarInput from './CalenderInput';
import QuestionsInput from './QuestionsInput';

interface MentoringInfoFormProps {
  onPrev: () => void;
}

export default function MentoringInfoForm({ onPrev }: MentoringInfoFormProps) {
  const { register, control, watch } = useForm({
    defaultValues: {
      question: [{ content: '' }],
    },
  });
  console.log(watch());

  return (
    <>
      <h1 className="mt-20 text-center text-3xl font-semibold text-darkGray">멘토링과 관련된 정보를 입력해주세요.</h1>
      <form className="pt-16 pb-20">
        <section className="space-y-5">
          <WrapLabel label="질문 내용" id="question" moreInfo="인포머분께 질문하실 내용을 작성하세요.">
            <QuestionsInput register={register} name={'question'} control={control} placeholder="질문을 입력하세요."></QuestionsInput>
          </WrapLabel>
          <WrapLabel label="스케줄 입력" id="schedule" moreInfo="멘토링을 원하는 시간을 선택하세요.">
            <CalendarInput></CalendarInput>
          </WrapLabel>
        </section>
        <section className="flex w-full items-center justify-center space-x-4 pt-10">
          <button className="bg-lightPurple py-3 px-6 text-lg font-bold text-darkWhite" type="button" onClick={onPrev}>
            이전 단계
          </button>
          <button className="bg-lightPurple py-3 px-6 text-lg font-bold text-darkWhite" type="button">
            결재하기
          </button>
        </section>
      </form>
    </>
  );
}
