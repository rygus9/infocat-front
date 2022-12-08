import SignUpForm from '@/components/signup/SignUpForm';
import SignUpHeader from '@/components/signup/SignUpHeader';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
  return (
    <main className="m-auto w-full max-w-lg px-4 pt-8 md:pt-16">
      <SignUpHeader></SignUpHeader>
      <SignUpForm></SignUpForm>
    </main>
  );
};

export default SignUp;
