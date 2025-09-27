import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import Input from '@components/atoms/Input'

type TPasswordInput = React.ComponentProps<typeof Input>

const PasswordInput = React.forwardRef<HTMLInputElement, TPasswordInput>(
  (props, ref) => {

    const [passwordMasked, setPasswordMasked] = useState(true)
    const {trailingIconColor} = props
    
    return (
      <Input
        {...props}
        type={passwordMasked ? 'password' : 'text'}
        className='flex-grow'
        ref={ref}
        trailingIcon={() => (
          <button
            type='button'
            onClick={() => setPasswordMasked((mask) => !mask)}
          >
            {passwordMasked ? (
              <EyeSlashIcon className={`h-6 w-6 ${trailingIconColor}`} />
            ) : (
              <EyeIcon className={`h-6 w-6 ${trailingIconColor}`} />
            )}
          </button>
        )}
      />
    );
  }
);

export default PasswordInput;
