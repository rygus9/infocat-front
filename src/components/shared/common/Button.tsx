import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

const buttonStyle = {
  submitMain: 'rounded-full bg-lightPurple px-7 py-1.5 text-lg text-darkWhite',
  submitSub: 'rounded-full bg-darkWhite px-7 py-1.5 text-lg text-darkGray',
  controlMain: 'rounded-lg bg-lightPurple py-1 px-3 text-sm text-white',
  controlSub: 'rounded-lg bg-darkWhite py-1 px-3 text-sm text-gray',
  inputBtn: 'w-20 bg-lightPurple text-white disabled:bg-darkWhite disabled:text-darkGray',
  modalMain: 'rounded-lg bg-lightPurple px-4 py-1 text-base text-darkWhite',
  modalSub: 'rounded-lg border border-lightPurple px-4 py-1 text-base text-lightPurple',
  textWhite: 'w-fit text-lg text-white',
};

interface ButtonProps {
  btnStyle: keyof typeof buttonStyle;
}
type OriginButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({ btnStyle, children, ...props }: ButtonProps & OriginButtonProps) {
  return (
    <button {...props} className={buttonStyle[btnStyle]}>
      {children}
    </button>
  );
}
