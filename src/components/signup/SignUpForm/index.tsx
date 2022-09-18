import { useState } from 'react';
import { useForm } from 'react-hook-form';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';

export interface ResiterForm {
  email: string;
  nickName: string;
  password: string;
  passwordValid: string;
  validationCode: string;
}

export default function ResiterForm() {
  const [step, setStep] = useState(1);
  const nextStep = () => {
    setStep((elem) => elem + 1);
  };
  const backStep = () => {
    setStep((elem) => elem - 1);
  };
  const method = useForm<ResiterForm>();

  return (
    <>
      {step == 1 && <FirstForm method={method} nextStep={nextStep}></FirstForm>}
      {step == 2 && <SecondForm method={method} backStep={backStep}></SecondForm>}
    </>
  );
}
