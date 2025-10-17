import React, { useState, useEffect, Fragment, ChangeEvent, FormEvent } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState('');
  const [typeMessage, setTypeMessage] = useState<'success' | 'warning'>();
  const [popUp, setPopUp] = useState(true);
  const { user } = useAuth();

  // 🔹 Mejor eliminar variable global "error" (no se usa)
  // let error; ← Eliminada

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries = ['Colombia', 'Argentina', 'Chile', 'Brazil', 'Peru'];
      setCountries(fetchedCountries);
      setFilteredCountries(fetchedCountries);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (formState.country.value) {
        const fetchedCities =
          formState.country.value === 'Colombia'
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
    return rule ? !rule.test(value) : value.trim() === '';
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    field?: string
  ) => {
    if (typeof e === 'string' && field) {
      // Para editor WYSIWYG
      setFormState((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          value: e,
          error: validate(e, prev[field]?.rule),
        },
      }));
    } else {
      const target = e.target as HTMLInputElement | HTMLSelectElement;
      const { name, value } = target;

      setFormState((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          value,
          error: validate(value, prev[name]?.rule),
        },
      }));
    }
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'country') {
      setFilteredCountries(countries.filter((c) => c.toLowerCase().includes(value.toLowerCase())));
      setShowCountryDropdown(true);
    } else if (name === 'city') {
      setFilteredCities(cities.filter((c) => c.toLowerCase().includes(value.toLowerCase())));
      setShowCityDropdown(true);
    }
    handleChange(e);
  };

  const handleSelect = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validate(value, prev[name]?.rule),
      },
    }));
    if (name === 'country') setShowCountryDropdown(false);
    if (name === 'city') setShowCityDropdown(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let valid = true;
    const updatedState = { ...formState };

    Object.keys(updatedState).forEach((key) => {
      if (validate(updatedState[key].value, updatedState[key]?.rule)) {
        updatedState[key].error = true;
        valid = false;
      }
    });

    setFormState(updatedState);
    if (!valid) return;

    const submitData: JobCreateModel = {
      offer_text: formState.offer_text.value,
      offer_title: formState.offer_title.value,
      user_id: user?.user_id,
      city_id: formState.city.value,
    };

    setIsSubmitting(true);
    try {
      const data = await JobService.createJob(submitData, user?.token);
      if (data?.status >= 200 && data?.status < 300) {
        setTypeMessage('success');
        setMessagePopUp('Oferta creada exitosamente');
        setFormState(initialState);
        onClose();
      } else {
        setTypeMessage('warning');
        setMessagePopUp('Revisa los campos, no pudimos crear la oferta');
      }
    } catch (err) {
      setTypeMessage('warning');
      setMessagePopUp('No pudimos crear la oferta, inténtalo nuevamente');
      console.error(err);
    } finally {
      setPopUp(true);
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
          <div className="flex items-start justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <TransitionChild as={Fragment}>
              <div className="fixed inset-0 bg-gray-500 opacity-75" />
            </TransitionChild>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <TransitionChild as={Fragment}>
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Crear Oferta</h3>

                <form onSubmit={handleSubmit} className="mt-2">
                  {/* País */}
                  <div className="my-4">
                    <label htmlFor="country">País:</label>
                    <input
                      id="country"
                      name="country"
                      value={formState.country.value}
                      onChange={handleFilter}
                      placeholder="Escribe para filtrar"
                      className="block w-full mt-2 p-2 border rounded-md"
                    />
                    {showCountryDropdown && (
                      <ul className="border rounded-md max-h-40 overflow-y-auto">
                        {filteredCountries.map((country) => (
                          <li
                            key={country}
                            onClick={() => handleSelect('country', country)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {country}
                          </li>
                        ))}
                      </ul>
                    )}
                    {formState.country.error && (
                      <p className="text-red-500 text-sm">{formState.country.helpMessage}</p>
                    )}
                  </div>

                  {/* Ciudad */}
                  <div className="my-4">
                    <label htmlFor="city">Ciudad:</label>
                    <input
                      id="city"
                      name="city"
                      value={formState.city.value}
                      onChange={handleFilter}
                      placeholder="Escribe para filtrar"
                      className="block w-full mt-2 p-2 border rounded-md"
                    />
                    {showCityDropdown && (
                      <ul className="border rounded-md max-h-40 overflow-y-auto">
                        {filteredCities.map((city) => (
                          <li
                            key={city}
                            onClick={() => handleSelect('city', city)}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}
                    {formState.city.error && (
                      <p className="text-red-500 text-sm">{formState.city.helpMessage}</p>
                    )}
                  </div>

                  <Input
                    id="offer_title"
                    label="Título"
                    name="offer_title"
                    value={formState.offer_title.value}
                    error={formState.offer_title.error}
                    helpText={formState.offer_title.helpMessage}
                    onChange={handleChange}
                  />

                  {/* 🔹 Editor reemplazado */}
                  <label className="block mb-2">
                    Texto:
                    <DefaultEditor
                      value={formState.offer_text.value}
                      onChange={(e) => handleChange(e.target.value, 'offer_text')}
                      className="mt-1"
                    />
                  </label>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium bg-gray-100 rounded-md hover:bg-gray-200"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-2 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 rounded-md hover:bg-blue-200"
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

      {typeMessage && (
        <PopUp isOpen={popUp} type={typeMessage} setIsOpen={setPopUp} message={messagePopUp} />
      )}
    </>
  );
};

export default ModalAddJob;
