import TextAreaInput from '@/components/shared/input/TextAreaInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { useForm } from 'react-hook-form';
import QuestionsInput from './QuestionsInput';
import { z } from 'zod';
import CalendarInputWithForm from './CalendarInputWithForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import mentoringFormAtom from '@/recoil/form/mentoringApply/mentoringFormAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import mentoringApplyApi from '@/api/mentoring/mentoringApplyApi';
import { useMutation } from 'react-query';
import menteeFormAtom from '@/recoil/form/mentoringApply/menteeFormAtom';
import ApplySuccessModal from './ApplySuccessModal';
import { useState } from 'react';
import Button from '@/components/shared/common/Button';

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
  const { mutateAsync: mentoringApplyMutate, status: mentoringApplyState } = useMutation(mentoringApplyApi);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const menteeFormState = useRecoilValue(menteeFormAtom);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<MentoringApplyMentoringType>({
    resolver: zodResolver(schema),
    defaultValues: mentoringFormState,
  });

  const onPrevButton = () => {
    setMentoringFormState(getValues());
    onPrev();
  };

  const onSubmit = async (data: MentoringApplyMentoringType) => {
    const path = location.pathname.split('/')[2];
    const serverData = {
      introduce: menteeFormState.introduce,
      major: menteeFormState.major,
      name: menteeFormState.name,
      phone: menteeFormState.phoneNumber,
      userCondition: menteeFormState.status.title,
      wanted: data.wanted,
      schedule: data.schedule,
      questions: data.questions
        .map((elem) => elem.content)
        .filter((elem) => elem)
        .join('|'),
      mentoringId: path,
    };
    console.log(serverData);

    try {
      const res = await mentoringApplyMutate(serverData);
      if (res.result) {
        setSuccessModalOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };
  return (
    <>
      <h1 className="mt-20 text-center text-2xl text-darkGray">인포머와 약속을 잡아보세요.</h1>
      <form className="pt-16 pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
          <WrapLabel label="날짜 및 시간 선택" id="schedule" required errorMessage={errors.schedule?.message}>
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
          <Button btnStyle="submitSub" type="button" onClick={onPrevButton}>
            이전
          </Button>
          <Button btnStyle="submitMain" type="submit">
            {isSubmitting ? '제출 중' : '제출하기'}
          </Button>
        </section>
      </form>
      <ApplySuccessModal isOpen={successModalOpen} closeModal={() => setSuccessModalOpen(false)}></ApplySuccessModal>
    </>
  );
}
