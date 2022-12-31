import ListBoxInput from '@/components/shared/input/ListBoxInput';
import TextAreaInput from '@/components/shared/input/TextAreaInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import { menteeStatusOption } from '@/contents';
import menteeFormAtom from '@/recoil/form/mentoringApply/menteeFormAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { z } from 'zod';
import useCurrentUser from '@/hooks/useCurrentUser';

const schema = z.object({
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phoneNumber: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  status: z.object({
    title: z.string().min(1, '현재 상태는 필수 입력입니다.'),
    value: z.string(),
  }),
  major: z.string().min(1, '전공은 필수 입력입니다.'),
  introduce: z.string().min(10, '최소한 10글자 이상은 입력해주세요.'),
});

export type MentoringApplyMenteeType = z.infer<typeof schema>;

interface ManteeInfoFormProps {
  onNext: () => void;
}

export default function ManteeInfoForm({ onNext }: ManteeInfoFormProps) {
  const [menteeFormState, setMenteeFormState] = useRecoilState(menteeFormAtom);
  const currentUser = useCurrentUser();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MentoringApplyMenteeType>({
    resolver: zodResolver(schema),
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

  return (
    <>
      <h1 className="mt-20 text-center text-2xl text-darkGray">
        멘토링에 앞서, <span>{currentUser?.nickName}</span>님을 소개해보세요.
      </h1>
      <form className="pt-16 pb-20" onSubmit={handleSubmit(onSubmit, onError)}>
        <section className="space-y-5">
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
          <WrapLabel label="상태" id="status" required errorMessage={errors.status?.title?.message}>
            <ListBoxInput
              list={menteeStatusOption}
              control={control}
              name={'status'}
              id={'status'}
              placeholder="눌러서 선택"
            ></ListBoxInput>
          </WrapLabel>
          <WrapLabel
            label="전공"
            id="major"
            required
            errorMessage={errors.major?.message}
            moreInfo="전공을 정확하게 입력해주세요. 예) 컴퓨터공학과, 경영학과"
          >
            <TextInput register={register('major')} type="text" placeholder="전공을 입력해주세요."></TextInput>
          </WrapLabel>
          <WrapLabel label="자기소개" id="introduce" required errorMessage={errors.introduce?.message}>
            <TextAreaInput register={register('introduce')} placeholder="간단한 자기 소개 부탁드립니다." rows={5}></TextAreaInput>
          </WrapLabel>
        </section>
        <section className="flex items-center justify-center py-5">
          <button className="rounded-full bg-lightPurple px-8 py-2 text-lg text-darkWhite" type="submit">
            다음
          </button>
        </section>
      </form>
    </>
  );
}
