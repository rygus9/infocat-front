import ListBox from '@/components/shared/input/ListBox';
import TextArea from '@/components/shared/input/TextArea';
import Input from '@/components/shared/input/Input';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { menteeStatusOption } from '@/contents/option/menteeStatusOption';
import menteeFormAtom from '@/recoil/form/mentoringApply/menteeFormAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import useCurrentUser from '@/hooks/useCurrentUser';
import Button from '@/components/shared/common/Button';
import { MenteeInfoFormValidation } from '@/contents/validation/mentoringApplyFormValidation';

export type MentoringApplyMenteeType = z.infer<typeof MenteeInfoFormValidation>;

interface MenteeInfoFormProps {
  onNext: () => void;
}

export default function MenteeInfoForm({ onNext }: MenteeInfoFormProps) {
  const [menteeFormState, setMenteeFormState] = useRecoilState(menteeFormAtom);
  const currentUser = useCurrentUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MentoringApplyMenteeType>({
    resolver: zodResolver(MenteeInfoFormValidation),
    mode: 'onChange',
    defaultValues: menteeFormState,
  });

  const onSubmit = (data: any) => {
    console.log('ManteeForm Data', data);
    setMenteeFormState(data);
    onNext();
  };

  const onError = (error: any) => {
    console.log('ManteeForm Info Error : ', error);
  };

  const statusController = useController({ control: control, name: 'status' });

  return (
    <>
      <h1 className="mt-20 text-center text-2xl text-darkGray">
        멘토링에 앞서, <span>{currentUser?.nickName}</span>님을 소개해보세요.
      </h1>
      <form className="pt-16 pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
          <WrapLabel label="이름" id="name" moreInfo="실명으로 입력하세요." required errorMessage={errors.name?.message}>
            <Input {...register('name')} type="text" placeholder="이름을 입력하세요."></Input>
          </WrapLabel>
          <WrapLabel
            label="휴대전화 번호"
            id="phoneNumber"
            moreInfo="멘토링관련 정보를 보내드립니다. 정확하게 기입해주세요!"
            required
            errorMessage={errors.phoneNumber?.message}
          >
            <Input {...register('phoneNumber')} type="number" placeholder="휴대전화 번호 (-빼고 입력)"></Input>
          </WrapLabel>
          <WrapLabel label="상태" id="status" required errorMessage={errors.status?.title?.message}>
            <ListBox
              list={menteeStatusOption}
              id={'status'}
              placeholder="눌러서 선택"
              value={statusController.field.value}
              onChange={statusController.field.onChange}
            ></ListBox>
          </WrapLabel>
          <WrapLabel
            label="전공"
            id="major"
            required
            errorMessage={errors.major?.message}
            moreInfo="전공을 정확하게 입력해주세요. 예) 컴퓨터공학과, 경영학과"
          >
            <Input {...register('major')} type="text" placeholder="전공을 입력해주세요."></Input>
          </WrapLabel>
          <WrapLabel label="자기소개" id="introduce" required errorMessage={errors.introduce?.message}>
            <TextArea {...register('introduce')} placeholder="간단한 자기 소개 부탁드립니다." rows={5}></TextArea>
          </WrapLabel>
        </section>
        <section className="flex items-center justify-center py-5">
          <Button btnStyle="submitMain" type="submit">
            다음
          </Button>
        </section>
      </form>
    </>
  );
}
