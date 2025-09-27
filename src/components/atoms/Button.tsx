import { PropsWithChildren } from 'react';

const buttonVariants = {
  default:
    'bg-primary text-white shadow-sm font-semibold hover:bg-vermillion-600 active:bg-vermillion-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:font-normal',
  primary:
    'bg-forest text-white shadow-sm font-semibold hover:bg-forest-600 active:bg-forest-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:font-normal',
  secondary:
    'bg-gray-300 text-black shadow-sm font-semibold hover:bg-gray-400 active:bg-gray-600 disabled:bg-gray-300 disabled:text-gray-400 disabled:font-normal',
  link: 'bg-transparent text-vermillion underline underline-offset-[0.5em] hover:text-black active:text-black disabled:text-gray-200',
};

type TButtonVariants = keyof typeof buttonVariants;

type TButton = {
  id?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: TButtonVariants;
  bigger?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const Button = ({
  id,
  type = 'button',
  variant = 'default',
  bigger,
  className,
  disabled,
  onClick,
  children,
}: PropsWithChildren<TButton>) => (
  <button
    id={id}
    disabled={disabled}
    onClick={onClick}
    type={type}
    className={`
      ${className}
      ${buttonVariants[variant]}
      ${bigger ? 'py-4 text-base' : 'py-2 text-sm'}
      rounded-2xl px-6 font-poppins
    `}
  >
    {children}
  </button>
);

export default Button;
