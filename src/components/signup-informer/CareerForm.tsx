import mentorRegistApi from '@/api/mentor/mentorRegistApi';
import { CareerFormValidation } from '@/contents/validation/signUpInformerFormValidation';
import useCurrentUser from '@/hooks/useCurrentUser';
import careerFormAtom from '@/recoil/form/informerRegist/careerFormAtom';
import getBasicInfoSelector from '@/recoil/form/informerRegist/getBasicInfoSelector';
import currentUserAtom from '@/recoil/user/currentUserAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { z } from 'zod';
import Button from '../shared/common/Button';
import TextInput from '../shared/input/TextInput';
import WrapLabel from '../shared/input/WrapLabel';
import CareersInput from './CareersInput';
import SignUpSuccessModal from './SignUpSuccessModal';

export type CareerFormType = z.infer<typeof CareerFormValidation>;

interface CareerFormProps {
  onPrev: () => void;
}

export default function CareerForm({ onPrev }: CareerFormProps) {
  const { mutateAsync: mentorRegistMutate, status: mentorRegistStatus } = useMutation(mentorRegistApi);
  const [careerForm, setCareerForm] = useRecoilState(careerFormAtom);
  const getBasicInfo = useRecoilValue(getBasicInfoSelector);
  const userState = useCurrentUser();
  const setCurrentUserState = useSetRecoilState(currentUserAtom);
  const [successModal, setSuccessModal] = useState(false);

  const {
    register,
    getValues,
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
  } = useForm<CareerFormType>({
    resolver: zodResolver(CareerFormValidation),
    mode: 'onChange',
    defaultValues: careerForm,
  });

  const onSubmit = async (data: CareerFormType) => {
    try {
      const res = await mentorRegistMutate({
        ...getBasicInfo,
        job: data.role,
        years: data.years,
        career: data.careers.map((elem) => elem.content).join('|'),
      });
      if (res.result) {
        setCurrentUserState({
          isInformer: true,
          nickName: userState?.nickName as string,
        });
        setSuccessModal(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  const onPrevClick = () => {
    setCareerForm({
      careers: getValues('careers'),
      role: getValues('role'),
      years: getValues('years'),
    });
    onPrev();
  };

  return (
    <>
      <header className="pt-20 pb-1">
        <h3 className="w-fit space-y-1 text-left text-xl text-darkGray xs:text-2xl">
          <p>
            <>
              {userState?.nickName} 님의 회사는 '{getBasicInfo.company}'입니다.
            </>
          </p>
          <p>당신의 커리어를 등록해주세요.</p>
        </h3>
      </header>
      <form className="pt-6 pb-10" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-4">
          <WrapLabel label="직무" id="role" errorMessage={errors.role?.message} moreInfo="예) 웹프론트엔드, 앱디자이너, 서비스PM" required>
            <TextInput id="role" {...register('role')} type="text" placeholder="직무를 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="연차" id="years" errorMessage={errors.years?.message} moreInfo="숫자만 입력해주세요. 예) 5년차 -> 5" required>
            <TextInput id="years" {...register('years')} type="number" placeholder="연차를 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="커리어" id="careers" errorMessage={errors.careers && '이력 사항을 입력하세요.'} required>
            <CareersInput
              register={register}
              name={'careers'}
              control={control}
              placeholder="가장 최신의 경력 사항부터 입력해주세요."
            ></CareersInput>
          </WrapLabel>
        </section>
        <section className="flex items-center justify-center space-x-2 pb-5 pt-10">
          <Button btnStyle="submitSub" type="button" onClick={onPrevClick}>
            이전
          </Button>
          <Button btnStyle="submitMain" type="submit">
            {isSubmitting ? '등록 중' : '등록하기'}
          </Button>
        </section>
      </form>
      <SignUpSuccessModal isOpen={successModal} closeModal={() => setSuccessModal(false)}></SignUpSuccessModal>
    </>
  );
}
