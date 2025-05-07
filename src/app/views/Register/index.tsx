import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Button from '../../../components/atoms/Button';
import Input from '../../../components/atoms/Input';
import PasswordInput from '../../../components/atoms/PasswordInput';
import { Skills, Levels, UserRegister } from '../../../models/user.model';
import { alphabeticPattern, emailPattern } from '../../../utils/patterns.utils';

const Register = () => {
  const initialState = {
    email: { value: '', error: false, helpMessage: 'Escribe tu correo', rule: emailPattern },
    password: { value: '', error: false, helpMessage: 'Escribe una clave' },
    passwordR: { value: '', error: false, helpMessage: 'La clave no coincide' },
    country: { value: '', error: false, helpMessage: 'Elige tu país' },
    city: { value: '', error: false, helpMessage: 'Elige tu ciudad' },
    user_name: { value: '', error: false, helpMessage: 'Escribe el nombre de usuario', rule: alphabeticPattern },
    userType: { value: '', error: false, helpMessage: 'Elige cómo deseas registrarte' },
    contact_name: { value: '', error: false, helpMessage: 'Escribe el nombre de contacto', rule: alphabeticPattern },
    company_name: { value: '', error: false, helpMessage: 'Escribe el nombre de la empresa' },
    phone_number: { value: '', error: false, helpMessage: 'Escribe un número de contacto (máx. 15 números)' },
    skills: [],
    knowledge: {},
    terms: { value: false, error: false, helpMessage: 'Debes aceptar los términos y condiciones' },
  };

  const [formState, setFormState] = useState(initialState);
  const [skills, setSkills] = useState([]);
  const [levels, setLevels] = useState([]);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  useEffect(() => {
    // Mock data loading
    const mockCountries = ['Colombia', 'Argentina', 'Chile', 'Brazil', 'Peru'];
    const mockCities = ['Bogotá', 'Medellín', 'Cali', 'Buenos Aires', 'Santiago'];
    setSkills(['Sonido', 'Iluminación', 'Video', 'Fotografía', 'Logística']);
    setLevels(['Básico', 'Medio', 'Avanzado']);
    setCountries(mockCountries);
    setFilteredCountries(mockCountries);
    setCities(mockCities);
    setFilteredCities(mockCities);
  }, []);

  const validate = (value, rule) => {
    return rule ? !rule.test(value) : value === '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    const isSkillLevel = name.includes('_level');

    if (isSkillLevel) {
      setFormState((prevState) => ({
        ...prevState,
        knowledge: {
          ...prevState.knowledge,
          [name]: newValue,
        },
      }));
    } else if (name === 'skills') {
      const updatedSkills = checked
        ? [...formState.skills, value]
        : formState.skills.filter((skill) => skill !== value);
      setFormState((prevState) => ({
        ...prevState,
        skills: updatedSkills,
      }));
    } else {
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

  const handleFilter = (e) => {
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

  const handleSelect = (name, value) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedState = { ...formState };
    let valid = true;

    Object.keys(updatedState).forEach((key) => {
      if (validate(updatedState[key].value, updatedState[key]?.rule)) {
        updatedState[key].error = true;
        valid = false;
      }
    });

    if (!formState.terms.value) {
      updatedState.terms.error = true;
      valid = false;
    } else {
      updatedState.terms.error = false;
    }

    setFormState(updatedState);
    if (valid) {
      // Submit form
      console.log('Form submitted successfully:', formState);
    }
  };

  const renderUserTypeFields = () => {
    if (formState.userType.value === 'company') {
      return (
        <>
          <Input
            id='company_name'
            label='Nombre de la Empresa'
            name='company_name'
            value={formState.company_name.value}
            error={formState.company_name.error}
            helpText={formState.company_name.helpMessage}
            onChange={handleChange}
          />
          <Input
            id='contact_name'
            label='Nombre de contacto'
            name='contact_name'
            value={formState.contact_name.value}
            error={formState.contact_name.error}
            helpText={formState.contact_name.helpMessage}
            onChange={handleChange}
          />
          <Input
            id='phone_number'
            label='Número de Contacto'
            name='phone_number'
            type='tel'
            pattern='[0-9]*'
            maxLength='15'
            value={formState.phone_number.value}
            error={formState.phone_number.error}
            helpText={formState.phone_number.helpMessage}
            onChange={handleChange}
          />
        </>
      );
    } else if (formState.userType.value === 'operator') {
      return (
        <>
          <Input
            id='user_name'
            label='Nombre'
            name='user_name'
            className='mb-2'
            value={formState.user_name.value}
            error={formState.user_name.error}
            helpText={formState.user_name.helpMessage}
            onChange={handleChange}
          />
          <label>Conocimientos</label>
          {skills.map((skill, index) => (
            <div key={skill} className="flex justify-between items-center my-2">
              <div className="flex items-center">
                <input
                  id={`skill${index}`}
                  type='checkbox'
                  name='skills'
                  value={skill}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>{skill}</span>
              </div>
              <div className="flex items-center space-x-2">
                {levels.map((level) => (
                  <label key={level} className="flex items-center space-x-1">
                    <input
                      id={`${skill}_level_${level}`}
                      type='radio'
                      name={`${skill}_level`}
                      value={level}
                      onChange={handleChange}
                      disabled={!formState.skills.includes(skill)}
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto'>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <form onSubmit={handleSubmit}>
              <Input
                id='email'
                label='Correo'
                type='email'
                name='email'
                value={formState.email.value}
                error={formState.email.error}
                helpText={formState.email.helpMessage}
                onChange={handleChange}
              />
              <PasswordInput
                id='password'
                label='Contraseña'
                name='password'
                value={formState.password.value}
                error={formState.password.error}
                helpText={formState.password.helpMessage}
                onChange={handleChange}
              />
              <PasswordInput
                id='passwordR'
                label='Repite la Contraseña'
                name='passwordR'
                value={formState.passwordR.value}
                error={formState.passwordR.error}
                helpText={formState.passwordR.helpMessage}
                onChange={handleChange}
              />
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
              <div className='my-4'>
                <label>Tipo de Usuario</label>
                <div>
                  <label>
                    <input
                      id='userType_company'
                      type='radio'
                      name='userType'
                      value='company'
                      className='mr-2'
                      onChange={handleChange}
                    />
                    Empresa
                  </label>
                  <label className='ml-4'>
                    <input
                      id='userType_operator'
                      type='radio'
                      name='userType'
                      value='operator'
                      className='mr-2'
                      onChange={handleChange}
                    />
                    Operador
                  </label>
                </div>
                {formState.userType.error && <p className='text-red-500 text-sm'>{formState.userType.helpMessage}</p>}
              </div>
              {renderUserTypeFields()}
              <div className='flex flex-col my-4'>
                <label className="flex items-center">
                  <input
                    id='terms'
                    type='checkbox'
                    name='terms'
                    className={classNames('mr-2', { 'border-red-500': formState.terms.error })}
                    checked={formState.terms.value}
                    onChange={handleChange}
                  />
                  Acepto la política de &nbsp;
                  <a 
                    target='blank' 
                    className='text-blue-600'
                    href='https://drive.google.com/file/d/1bEjGB2XeG0rPTTclrRLei3Br-vpDQGth/view?usp=sharing'>
                    tratamiento de datos
                  </a>
                </label>
                {formState.terms.error && <p className='text-red-500 text-sm'>{formState.terms.helpMessage}</p>}
              </div>
              <Button type='submit' variant='default'>
                Registrarse
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
