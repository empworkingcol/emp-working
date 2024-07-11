import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import PasswordInput from "src/components/atoms/PasswordInput";
import Input from "src/components/atoms/Input";
import Button from "../../../components/atoms/Button";
import { emailPattern, passwordPattern } from "src/utils/patterns.utils";
import UserService from "src/services/user.service";
import { LoginModel } from "src/models/user.model";
import { useAuth } from 'src/app/core/useAuth';


type RuleLogin = {
  rule: RegExp;
  helpMessage: string;
}

type ParamValidation = {
  value: string,
  error: boolean,
  validation: RuleLogin
}

type UserLogin = {
  email: ParamValidation;
  password: ParamValidation;
}; 

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const userInformation: UserLogin = {
    email: {
      value: '',
      error: false,
      validation: {
        rule: emailPattern,
        helpMessage: 'Escribe un correo válido'
      }
    },
    password: {
      value: '',
      error: false,
      validation: {
        rule: passwordPattern,
        helpMessage: 'Escribe una clave válida'
      }
    }
  };

  const [userInfo, setUserInfo] = useState<UserLogin>(userInformation);

  const validateFields = (): boolean => {
    let isValid = true;

    const updatedUserInfo = { ...userInfo };

    for (const key in updatedUserInfo) {
      if (updatedUserInfo[key as keyof UserLogin].value === '') {
        updatedUserInfo[key as keyof UserLogin].error = true;
        isValid = false;
      } else {
        updatedUserInfo[key as keyof UserLogin].error = false;
      }
    }

    setUserInfo(updatedUserInfo);
    return isValid;
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    if (validateFields()) {
      const user: LoginModel = {
        email: userInfo.email.value,
        password: userInfo.password.value
      }
      UserService.authUser(user)
        .then(
          (data) => {
            if (data?.data?.access_token) {
              login(data.data.access_token);
            }
          }
        )  
    } 
  };

  const validation = (value: string, parameter: RuleLogin) => {
    return value === undefined || !parameter.rule?.test(value)
  }

  const isUserLoginKey = (key: string): key is keyof UserLogin => {
    return key in userInformation;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!isUserLoginKey(name)) {
      return;
    }
    
    const parameter: ParamValidation = userInfo[name];

    if (validation(value, parameter.validation)) {
      setUserInfo({
        ...userInfo,
        [name]: {
          ...parameter,
          value: value,
          error: true
        }
      });
    } else {
      setUserInfo({
        ...userInfo,
        [name]: {
          ...parameter,
          value: value,
          error: false
        }
      });
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Iniciar sesion
            </h3>
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
              <Input
                label='Correo'
                type='email'
                name='email'
                id='email'
                value={userInfo.email.value}
                error={userInfo.email.error}
                helpText={userInfo.email.validation.helpMessage}
                onChange={handleChange}
              />
              <PasswordInput
                label='Clave'
                id='password'
                name='password'
                placeHolder='******'
                value={userInfo.password.value}
                error={userInfo.password.error}
                helpText={userInfo.password.validation.helpMessage}
                onChange={handleChange}
              />
              <Button
                type='submit'
                variant='default'
                onClick={handleLogin}
              >
                Iniciar sesion
              </Button>
            </form>
            <div className='flex items-center gap-2'>
              <p>
                No tienes una cuenta
              </p>
              <Button
                type='submit'
                variant='link'
                onClick={() => navigate("/register")}
              >
                Registrate aqui
              </Button>
            </div> 
          </div>       
        </div>
      </div>
    </section>
  );
};

export default Login;
