import { useState } from 'react';
import FirstForm from './FirstForm';
import SecondForm from './SecondForm';

export default function ResiterForm() {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((elem) => elem + 1);
  };
  const backStep = () => {
    setStep((elem) => elem - 1);
  };

  return (
    <>
      {step == 1 && <FirstForm nextStep={nextStep}></FirstForm>}
      {step == 2 && <SecondForm backStep={backStep}></SecondForm>}
    </>
  );
}
