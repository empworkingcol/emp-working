import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { TokenPayLoad } from './types';

export const setToken = (token: string) => {
  Cookies.set('token', token, { expires: 30, secure: true, sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get('token');
};

export const decodeToken = (token: string): TokenPayLoad | null => {
  try {
    const decode = jwt.decode(token) as TokenPayLoad;
    return decode;
  } catch (error) {
    console.error('Token inválido:', error);
    return null;
  }
};
