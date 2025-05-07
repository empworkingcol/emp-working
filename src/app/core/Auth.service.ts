import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { TokenPayLoad } from './types';

export const setToken = (token: string) => {
  Cookies.set('session_tkn', token, { expires: 30, secure: true, sameSite: 'strict' });
};

export const getToken = () => {
  return Cookies.get('session_tkn');
};

export const decodeToken = (token: string): TokenPayLoad | null => {
  try {
    const decode = jwt.decode(token) as TokenPayLoad;
    return decode;
  } catch (error) {
    throw new Error('Failed fetch to extract token');
  }
};
