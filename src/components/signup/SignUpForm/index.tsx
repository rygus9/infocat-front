import { useState } from 'react';
import FinalPage from './FinalPage';
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

  const finalStep = () => {
    setStep(3);
  };

  return (
    <>
      {step === 1 && <FirstForm nextStep={nextStep}></FirstForm>}
      {step === 2 && <SecondForm backStep={backStep} finalStep={finalStep}></SecondForm>}
      {step === 3 && <FinalPage></FinalPage>}
    </>
  );
}
