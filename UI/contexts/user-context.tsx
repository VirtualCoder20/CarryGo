import { createContext, use, useState, useEffect, ReactNode } from 'react';
import { User, api } from '@/utils/api';
import { secureStorage } from '@/utils/secure-storage';
import { useStorage } from '@/hooks/use-storage';

interface UserContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  authError: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [ , setHasSeenOnboarding] = useStorage('onboarding_seen', false);

  useEffect(() => {
    async function loadStoredAuth() {
      try {
        const storedToken = await secureStorage.getToken();
        if (storedToken) {
          setToken(storedToken);
          const currentUser = await api.user.getProfile();
          setUser(currentUser);
        }
      } catch (e: any) {
        console.error('Failed to load auth', e);
        setAuthError(e.message || 'Failed to authenticate');
        await secureStorage.removeToken();
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    }
    loadStoredAuth();
  }, []);

  const login = async (newToken: string, newUser: User) => {
    setAuthError(null);
    await secureStorage.saveToken(newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    await secureStorage.removeToken();
    setToken(null);
    setUser(null);
    //TODO: remove the hasSeenOnboarding flag if you want to show onboarding again on next login
    setHasSeenOnboarding(false);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : (updates as User));
  };

  return (
    <UserContext value={{ user, token, isLoading, authError, login, logout, updateUser }}>
      {children}
    </UserContext>
  );
}

export function useUser() {
  const context = use(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
