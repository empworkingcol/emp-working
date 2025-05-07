import React, { useState, useEffect, Fragment, ChangeEvent, FormEvent } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Dialog, Transition, TransitionChild } from '@headlessui/react';
import PopUp from 'src/components/atoms/PopUp';
import Input from 'src/components/atoms/Input';
import JobService from 'src/services/job.service';
import { JobCreateModel } from 'src/models/job.model';
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

const ModalAddJob: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const initialState = {
    offer_title: { value: '', error: false, helpMessage: 'Escribe el título de la oferta (máx. 50 caracteres)' },
    offer_text: { value: '', error: false, helpMessage: 'Escribe el texto de la oferta' },
    country: { value: '', error: false, helpMessage: 'Elige tu país' },
    city: { value: '', error: false, helpMessage: 'Elige tu ciudad' },
  };

  const [formState, setFormState] = useState(initialState);
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [messagePopUp, setMessagePopUp] = useState<string>('');
  const [typeMessage, setTypeMessage] = useState<'success' | 'warning' | undefined>(undefined);
  const [popUp, setPopUp] = useState<boolean>(true);
  const { user } = useAuth();

  let error;

  useEffect(() => {
    // Fetch countries from API
    const fetchCountries = async () => {
      // Reemplazar con la llamada real a la API
      const fetchedCountries = ['Colombia', 'Argentina', 'Chile', 'Brazil', 'Peru'];
      setCountries(fetchedCountries);
      setFilteredCountries(fetchedCountries);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Fetch cities when country changes
    const fetchCities = async () => {
      if (formState.country.value) {
        // Reemplazar con la llamada real a la API
        const fetchedCities = formState.country.value === 'Colombia'
          ? ['Bogotá', 'Medellín', 'Cali']
          : formState.country.value === 'Argentina'
          ? ['Buenos Aires', 'Córdoba', 'Rosario']
          : [];
        setCities(fetchedCities);
        setFilteredCities(fetchedCities);
      }
    };

    fetchCities();
  }, [formState.country.value]);

  const validate = (value: string, rule?: RegExp) => {
    return rule ? !rule.test(value) : value === '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string, field?: string) => {
    if (typeof e === 'string' && field) {
      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          value: e,
          error: validate(e, prevState[field]?.rule),
        },
      }));
    } else {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      const { name, value, type, checked } = target;
      const newValue = type === 'checkbox' ? checked : value;

      setFormState((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          value: newValue,
          error: validate(newValue, prevState[name]?.rule),
        },
      }));
    }
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setFilteredCountries(countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      ));
      setShowCountryDropdown(true);
    } else if (name === 'city') {
      setFilteredCities(cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      ));
      setShowCityDropdown(true);
    }
    handleChange(e);
  };

  const handleSelect = (name: string, value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: {
        ...prevState[name],
        value,
        error: validate(value, prevState[name]?.rule),
      },
    }));
    if (name === 'country') {
      setShowCountryDropdown(false);
    } else if (name === 'city') {
      setShowCityDropdown(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedState = { ...formState };
    let valid = true;

    Object.keys(updatedState).forEach((key) => {
      if (validate(updatedState[key].value, updatedState[key]?.rule)) {
        //updatedState[key].error = true;
        valid = false;
      }
    });

    setFormState(updatedState);

    if (valid) {
      const submitData: JobCreateModel = {
        offer_text: formState.offer_text.value,
        offer_title: formState.offer_title.value,
        user_id: user?.user_id,
        city_id: formState.city.value,
      };

      setIsSubmitting(true);
      
      JobService.createJob(submitData, user?.token)
        .then(
          (data) => {
            if (data !== undefined && data.status >= 200 && data.status < 300) {
              setTypeMessage('success');
              setMessagePopUp('Oferta creada exitosamente');
              setFormState(initialState);
              onClose();
            } else {
              setTypeMessage('warning');
              setMessagePopUp('Revisa los campos, no pudimos crear la oferta');
            }
          }
        ).catch (
          (error) => {
            setTypeMessage('warning');
            setMessagePopUp('No pudimos crear la oferta, inténtalo nuevamente');
            throw new Error(error);
          }
        ).finally (
          () => {
            setPopUp(true);
            setIsSubmitting(false);
          }
        );
    }
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
                  Crear Oferta
                </h3>
                <form onSubmit={handleSubmit} className='mt-2'>
                  {error && <p className='text-red-500 mb-4'>{error}</p>}
                  <div className='my-4'>
                    <label htmlFor='country'>País:</label>
                    <input
                      id='country'
                      name='country'
                      value={formState.country.value}
                      onChange={handleFilter}
                      placeholder='Escribe para filtrar'
                      className='block w-full mt-2 p-2 border rounded-md'
                    />
                    {showCountryDropdown && (
                      <ul className='border rounded-md max-h-40 overflow-y-auto'>
                        {filteredCountries.map((country) => (
                          <li
                            key={country}
                            onClick={() => handleSelect('country', country)}
                            className='p-2 hover:bg-gray-200 cursor-pointer'
                          >
                            {country}
                          </li>
                        ))}
                      </ul>
                    )}
                    {formState.country.error && <p className='text-red-500 text-sm'>{formState.country.helpMessage}</p>}
                  </div>
                  <div className='my-4'>
                    <label htmlFor='city'>Ciudad</label>
                    <input
                      id='city'
                      name='city'
                      value={formState.city.value}
                      onChange={handleFilter}
                      placeholder='Escribe para filtrar'
                      className='block w-full mt-2 p-2 border rounded-md'
                    />
                    {showCityDropdown && (
                      <ul className='border rounded-md max-h-40 overflow-y-auto'>
                        {filteredCities.map((city) => (
                          <li
                            key={city}
                            onClick={() => handleSelect('city', city)}
                            className='p-2 hover:bg-gray-200 cursor-pointer'
                          >
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}
                    {formState.city.error && <p className='text-red-500 text-sm'>{formState.city.helpMessage}</p>}
                  </div>
                  <Input
                    id='offer_title'
                    label='Título'
                    name='offer_title'
                    value={formState.offer_title.value}
                    error={formState.offer_title.error}
                    helpText={formState.offer_title.helpMessage}
                    onChange={handleChange}
                  />
                  <label className='block mb-2'>
                    Texto:
                    <ReactQuill
                      value={formState.offer_text.value}
                      onChange={(value) => handleChange(value, 'offer_text')}
                      className='mt-1'
                      theme='snow'
                      modules={modules}
                      formats={formats}
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

export default ModalAddJob;
