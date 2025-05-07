import { Fragment } from 'react';

import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import { ExclamationCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface PopUpProps {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
  type: 'success' | 'warning';
  message: string;
}

const types = {
  'success': {
    message: 'Operacion exitosa',
    icon: <CheckIcon className='w-12 h-12 text-green-600 mx-auto' />,
  },
  'warning': {
    message: 'Advertencia',
    icon: <ExclamationCircleIcon className='w-12 h-12 text-red-600 mx-auto' />
  }
}

const PopUp = (props:PopUpProps) => {

  const { message, type, isOpen, setIsOpen } = props
  const { icon, message: titleMessage } = types[type];
  
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        role='dialog'
        className='fixed inset-0 z-10 overflow-y-auto'
        onClose={() => setIsOpen(false)}
      >
        <div className='min-h-screen px-4 text-center'>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-30' />
          </TransitionChild>

          <span className='inline-block h-screen align-middle' aria-hidden='true'>
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <div className='inline-block w-full max-w-sm p-6 my-8 transition-all transform bg-white shadow-xl rounded-2xl'>      
              {icon}
              <h4 className='text-lg font-medium leading-6 text-gray-900 mb-5'>
                {titleMessage}
              </h4>
              <p className='text-gray-500 text-s'>
                {message}
              </p>
              <Button
                className='mt-5'
                type='submit'
                variant='secondary'
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </Button>
            </div>          
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PopUp;