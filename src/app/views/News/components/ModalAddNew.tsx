import React, { useState, Fragment } from 'react';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import PopUp from 'src/components/atoms/PopUp';
import NewService from 'src/services/new.service';
import { NewCreateModel } from 'src/models/new.model';
import { useAuth } from 'src/app/core/useAuth';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }]
  ],
};

const formats = [
  'list', 'bullet',
  'bold', 'italic', 'underline'
];

const ModalAddNew: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [messagePopUp, setMessagePopUp] = useState<string>('');
  const [typeMessage, setTypeMessage] = useState<'success' | 'warning' | undefined>(undefined);
  const [popUp, setPopUp] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { user } = useAuth();

  const validateForm = () => {
    if (title.length === 0 || title.length > 50) {
      setError('El título debe tener entre 1 y 50 caracteres.');
      return false;
    }
    if (text.length === 0 || text.length > 2040) {
      setError('El texto debe tener entre 1 y 2040 caracteres.');
      return false;
    }
    if (!image) {
      setError('Debe seleccionar una imagen.');
      return false;
    }
    const validImageTypes = ['image/jpeg', 'image/png', 'image/iphone'];
    if (!validImageTypes.includes(image.type)) {
      setError('El archivo debe ser una imagen de formato JPG, PNG o iPhone.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData: NewCreateModel = {
      file: image,
      new_text: text,
      new_title: title,
      user_id: user?.user_id
    };

    setIsSubmitting(true);
    
    NewService.createNew(formData, user?.token)
      .then(
        (data) => {
          if (data !== undefined && data.status >= 200 && data.status < 300) {
            setTypeMessage('success')
            setMessagePopUp('Noticia creada exitosamente')
            setTitle('');
            setText('');
            setImage(null);
            onClose();
          } else {
            setTypeMessage('warning')
            setMessagePopUp('Revisa los campos, no pudimos crear la notica')
          }
          
        }
      ).catch (
        (error) => {
          setTypeMessage('warning')
          setMessagePopUp('No pudimos crear la noticia intentalo nuevamente')
          console.log(error);
        }
      ).finally (
        () => {
          setPopUp(true);
          setIsSubmitting(false)
        }
      )
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 z-10 overflow-y-auto' onClose={onClose}>
          <div className='flex items-start justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 transition-opacity'>
                <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
              </div>
            </TransitionChild>

            <span className='hidden sm:inline-block sm:align-middle sm:h-screen'>&#8203;</span>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Crear Noticia
                </h3>
                <form onSubmit={handleSubmit} className='mt-2'>
                  {error && <p className='text-red-500 mb-4'>{error}</p>}
                  <label className='block mb-2'>
                    Título:
                    <input
                      type='text'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      maxLength={50}
                      className='w-full p-2 border border-gray-300 rounded mt-1'
                    />
                  </label>
                  <label className='block mb-2'>
                    Texto:
                    <ReactQuill
                      value={text}
                      onChange={setText}
                      className='mt-1'
                      theme='snow'
                      modules={modules}
                      formats={formats}
                    />
                  </label>
                  <label className='block mb-4'>
                    Imagen:
                    <input
                      type='file'
                      accept='.jpeg,.jpg,.png,.iphone'
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      className='ml-2 mt-1'
                    />
                  </label>

                  <div className='mt-4 flex justify-end'>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creando...' : 'Aceptar'}
                    </button>
                  </div>
                </form>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      {
        typeMessage &&  
          <PopUp isOpen={popUp} type={typeMessage} setIsOpen={setPopUp} message={messagePopUp}/>
      }
    </>
  );
};

export default ModalAddNew;
