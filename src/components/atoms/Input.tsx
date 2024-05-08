import React, { useRef } from 'react'
import classNames from 'classnames'

type TInput = {
  autoComplete?: string;
  className?: string;
  disabled?: boolean;
  error?: boolean;
  helpText?: string;
  id?: string;
  inputProps?: React.ComponentProps<'input'>;
  isInteger?: boolean;
  label?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  questionMark?: string;
  trailingIcon?: React.ElementType;
  trailingIconColor?: string;
  trailingText?: string;
  type?: string;
  value?: string;
};

const Input = React.forwardRef<HTMLInputElement, TInput>(
  (
    {
      autoComplete,
      className,
      disabled,
      error,
      helpText,
      id,
      inputProps,
      isInteger,
      label,
      name,
      onChange,
      trailingIcon: TrailingIcon,
      trailingIconColor,
      trailingText,
      type,
      value,
    },
    ref
  ) => {
    const trailingRef = useRef<HTMLDivElement>(null);

    return (
      <div className='relative pt-4 font-poppins'>
        {label && (
          <label
            htmlFor={name}
            className={`absolute left-2 top-label z-10 flex items-center bg-white px-1 text-sm font-normal ${
              error ? 'text-vermillion' : 'text-gray-400'
            }`}
          >
            {label}
          </label>
        )}
        <div className='mt-1 flex items-center'>
          <input
            autoComplete={autoComplete}
            disabled={disabled}
            name={name}
            id={id}
            onChange={onChange}
            ref={ref}
            type={type}
            value={value}
            className={classNames(
              className,
              'block h-10 w-full border-6 rounded-md text-base font-normal focus:outline-none',
              error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-vermillion focus:ring-vermillion'
                : 'border-gray-200 placeholder-gray-400 focus:border-forest focus:ring-forest',
              { 'pr-10': TrailingIcon || error },
              disabled ? 'bg-gray-100 text-gray-400' : 'text-gray-900'
            )}
            style={{
              paddingRight: trailingRef.current
                ? trailingRef.current.offsetWidth + 15
                : 0,
            }}
            onKeyDown={(e) => {
              if (isInteger && ['.', ',', 'e'].includes(e.key)) {
                e.preventDefault();
              }
            }}
            {...inputProps}
          />
          {(TrailingIcon || trailingText) && (
            <div
              ref={trailingRef}
              className='absolute right-3 flex items-center'
            >
              {trailingText && (
                <div
                  className={`font-poppins text-sm ${
                    error ? 'text-vermillion' : 'text-gray-400'
                  }`}
                >
                  {trailingText}
                </div>
              )}
              {TrailingIcon && (
                <TrailingIcon className={`h-6 w-6 ${trailingIconColor}`} />
              )}
            </div>
          )}
        </div>
        {(helpText && error) && (
          <span
            className={`mt-1 block text-sm leading-6 ${
              error ? 'text-vermillion' : 'text-gray-500'
            }`}
          >
            {helpText}
          </span>
        )}
      </div>
    );
  }
);

export default Input;
