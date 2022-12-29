import MypageCase from '@/components/mypage/MypageCase';
import WrapLabelShort from '@/components/mypage/WrapLabelShort';
import TextDisabledInput from '@/components/shared/input/TextDisabledInput';
import TextInput from '@/components/shared/input/TextInput';
import WrapLabel from '@/components/shared/input/WrapLabel';
import CareersInput from '@/components/signup-mentor/CareersInput';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const informer = {
  years: '1',
  email: 'sdhg12@ajou.ac.kr',
  career: '저는 카카오 모빌리티 5년 다녔습니다 | 백수입니다.',
  job: '프론트엔드',
  phone: '01048756823',
  name: '구교현',
  company: '아주대학교',
};

const schema = z.object({
  name: z.string().min(1, '이름은 필수 입력입니다.'),
  phone: z
    .string()
    .min(1, '휴대전화 번호는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  years: z
    .string()
    .min(1, '연차는 필수 입력입니다.')
    .regex(/^[0-9]*$/, '숫자만 입력하세요.'),
  role: z.string().min(1, '직무는 필수 입력입니다.'),
  careers: z
    .array(
      z.object({
        content: z.string().min(1, '이력 사항은 필수 입력입니다.'),
      })
    )
    .min(1),
});

export type BasicFormType = z.infer<typeof schema>;

const mypageInformer = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useForm<BasicFormType>({
    defaultValues: {
      name: informer.name,
      careers: informer.career.split('|').map((career) => ({ content: career })),
      phone: informer.phone,
      role: informer.job,
      years: informer.years,
    },
  });

  return (
    <MypageCase>
      <div className="pb-10">
        <div className="space-y-2">
          <WrapLabelShort label="회사">
            <TextDisabledInput value={informer.company}></TextDisabledInput>
          </WrapLabelShort>
          <div className="flex flex-col items-start justify-start space-y-2 sm:flex-row sm:items-center sm:space-x-2">
            <WrapLabelShort label="이메일">
              <TextDisabledInput value={informer.email}></TextDisabledInput>
            </WrapLabelShort>
            <button className="rounded-full bg-lightPurple px-4 py-1 text-base text-darkWhite" type="button">
              재인증
            </button>
          </div>
        </div>
        <hr className="my-5 text-lightGray"></hr>
        <div>
          <h2 className="pb-4 text-xl text-darkGray">인포머 정보 수정</h2>
          <form className="space-y-2 pr-6">
            <WrapLabel label="이름(실명)" id="name" errorMessage={errors.name?.message}>
              <TextInput id="name" register={register('name')} type="text" placeholder="실명을 입력해주세요."></TextInput>
            </WrapLabel>
            <WrapLabel label="연락처" id="phone" errorMessage={errors.phone?.message}>
              <TextInput id="phone" register={register('phone')} type="text" placeholder="-를 제외하고 입력해주세요."></TextInput>
            </WrapLabel>
            <WrapLabel label="직무" id="role" errorMessage={errors.role?.message}>
              <TextInput id="role" register={register('role')} type="text" placeholder="직무를 입력해주세요."></TextInput>
            </WrapLabel>
            <WrapLabel label="연차" id="years" errorMessage={errors.years?.message}>
              <TextInput id="years" register={register('years')} type="number" placeholder="연차를 입력해주세요."></TextInput>
            </WrapLabel>
            <WrapLabel label="커리어" id="careers" errorMessage={errors.careers && '이력 사항을 입력하세요.'} required>
              <CareersInput
                register={register}
                name={'careers'}
                control={control}
                placeholder="가장 최신의 경력 사항부터 입력해주세요."
              ></CareersInput>
            </WrapLabel>
            <section className="flex w-full justify-center pt-6">
              <button className="rounded-full bg-lightPurple px-6 py-2 text-lg text-darkWhite" type="submit">
                수정하기
              </button>
            </section>
          </form>
        </div>
      </div>
    </MypageCase>
  );
};

export default mypageInformer;
