import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { AuthStatus, type User } from '../interfaces';
import { checkAuthAction, loginAction, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token = ref(useLocalStorage('token', ''));

  const login = async (email: string, password: string) => {
    try {
      const loginResp = await loginAction(email, password);

      if (!loginResp.ok) {
        logout();
        return false;
      }

      user.value = loginResp.user;
      token.value = loginResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch {
      return (logout(), false);
    }
  };

  const register = async (fullName: string, email: string, password: string) => {
    try {
      const registerResp = await registerAction(fullName, email, password);

      if (!registerResp.ok) {
        logout();
        return false;
      }

      user.value = registerResp.user;
      token.value = registerResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch {
      return (logout(), false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    authStatus.value = AuthStatus.UnAuthenticated;
    user.value = undefined;
    token.value = '';
  };

  const checkAuthStatus = async (): Promise<boolean> => {
    try {
      const statusResp = await checkAuthAction();

      if (!statusResp.ok) {
        logout();
        return false;
      }

      user.value = statusResp.user;
      token.value = statusResp.token;
      authStatus.value = AuthStatus.Authenticated;

      return true;
    } catch {
      logout();
      return false;
    }
  };

  return {
    user,
    token,
    authStatus,

    // getters
    isCheking: computed(() => authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(() => authStatus.value === AuthStatus.Authenticated),
    isNotAuthenticated: computed(() => authStatus.value === AuthStatus.UnAuthenticated),
    username: computed(() => user.value?.fullName || ''),
    isAdmin: computed(() => user.value?.roles.includes('admin') || false),

    // methods
    login,
    logout,
    register,
    checkAuthStatus,
  };
});
