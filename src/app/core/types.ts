import { JwtPayload } from 'jsonwebtoken';

export interface TokenPayLoad extends JwtPayload {
  user: {
    email: string;
    user_name: string;
    user_id: string;
    rol: {
      rol_name: string;
    };
  };
}
