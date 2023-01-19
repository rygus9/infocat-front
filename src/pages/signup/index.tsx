import SignUpForm from '@/components/signup/SignUpForm';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
  return (
    <main className="m-auto w-full max-w-lg px-4 pt-8 md:pt-16">
      <SignUpForm></SignUpForm>
    </main>
  );
};

export default SignUp;
