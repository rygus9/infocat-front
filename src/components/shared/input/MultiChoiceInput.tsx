import cls from '@/utils/cls';
import { UseFormRegisterReturn } from 'react-hook-form/dist/types';
import ToggleInput from './ToggleInput';

interface MultiChoiceInputProps {
  type?: 'radio' | 'checkbox';
  id?: string;
  options: { title: string; value: string }[];
  register: UseFormRegisterReturn;
}

const MultiChoiceInput = ({ id, type = 'checkbox', options, register }: MultiChoiceInputProps) => {
  return (
    <fieldset id={id} className={cls('flex flex-wrap items-center')}>
      {options.map((value, index) => (
        <div key={index} className={cls('py-1.5', 'mr-2')}>
          <ToggleInput label={value.title} register={register} type={type} value={value.value}></ToggleInput>
        </div>
      ))}
    </fieldset>
  );
};

export default MultiChoiceInput;
