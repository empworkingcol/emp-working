export interface Levels {
  level_id: number;
  level_name: string; 
}

export interface Skills {
  skill_id: number;
  skill_name: string;
}

export interface OperatorSkill {
  skill_id: number | null;
  level_id: number | null;
}

type Validation = {
  error: boolean;
  helpMessage: string;
  rule?: RegExp;
}

export interface UserRegister {
  city: {
    value: number | null;
    validation: Validation;
  };
  country: {
    value: number | null;
    validation: Validation;
  };
  email: {
    value: string;
    validation: Validation;
  };
  name: {
    value: string;
    validation: Validation;
  };
  password: {
    value: string;
    validation: Validation;
  };
  passwordR: {
    value: string;
    validation: Validation;
  };
  phone_number: {
    value: number | null;
    validation: Validation;
  };
  userType: {
    value: number | null;
    validation: Validation;
  };
  contact_name?: {
    value: string;
    validation: Validation;
  };
  skills?: OperatorSkill[]
}

export interface UserCreateModel {
  user_name: string;
  password: string;
  email: string;
  city_id: string;
  rol_id: string;
  phone_number: string;
  contact_name?: string;
  type: string;
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface UserAuthModel extends LoginModel {
  rol: {
    rol_name: string;
  }
}
