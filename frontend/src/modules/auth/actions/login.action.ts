import { tesloApi } from '@/api/tesloApi';
import type { AuthResponse, User } from '../interfaces';
import { isAxiosError } from 'axios';

interface loginError {
  ok: false;
  message: string;
}

interface loginSuccess {
  ok: true;
  user: User;
  token: string;
}

export const loginAction = async (
  email: string,
  password: string,
): Promise<loginSuccess | loginError> => {
  try {
    const { data } = await tesloApi.post<AuthResponse>('/auth/login', { email, password });
    return {
      ok: true,
      user: data.user,
      token: data.token,
    };
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      return {
        ok: false,
        message: 'credenciales incorrectas',
      };
    }

    console.log(error);
    throw new Error('Error al iniciar sesión');
  }
};
