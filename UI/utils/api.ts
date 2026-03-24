/**
 * Mock API for CarryGo Authentication and Onboarding.
 * Simulates network delay and returns mock data.
 */

import { VerifyIdentityPayload } from '@/types';
import { apiClient } from './api-client';
import { UserSchema, AuthResponseSchema } from './schemas';

export type OnboardingStatus = 'AUTH' | 'ROLE_SELECTION' | 'PROFILE_INFO' | 'IDENTITY_VERIFICATION' | 'COMPLETE';

export interface User {
  id: string;
  phone: string;
  role: 'commuter' | 'driver' | null;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  onboardingStatus: OnboardingStatus;
}

const mockUser: User = {
  id: 'u1',
  phone: '',
  role: null,
  onboardingStatus: 'AUTH',
};

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK_API === 'true';

const realApi = {
  
  auth: {
    sendOtp: async (phone: string) => {
      const response = await apiClient.post('/auth/send-otp', { phone });
      return response.data;
    },
    verifyOtp: async (phone: string, otp: string) => {
      const response = await apiClient.post('/auth/verify-otp', { phone, otp });
      return AuthResponseSchema.parse(response.data);
    },
  },
  user: {
    getProfile: async (): Promise<User> => {
      const response = await apiClient.get('/user/profile');
      return UserSchema.parse(response.data);
    },
    updateRole: async (role: 'commuter' | 'driver'): Promise<User> => {
      const response = await apiClient.put('/user/role', { role });
      return UserSchema.parse(response.data);
    },
    updateProfile: async (profileData: Partial<User>): Promise<User> => {
      const response = await apiClient.put('/user/profile', profileData);
      return UserSchema.parse(response.data);
    },
    verifyIdentity: async (data: VerifyIdentityPayload): Promise<User & { verificationStatus: string }> => {
      const response = await apiClient.post('/user/verify-identity', data);
      return response.data;
    },
  },
};

const mockApi = {
  auth: {
    sendOtp: async (phone: string) => {
      await delay(1000);
      console.log('OTP sent to', phone);
      return { success: true };
    },
    verifyOtp: async (phone: string, otp: string) => {
      await delay(1500);
      if (otp === '1234') {
        const user = { ...mockUser, phone };
        return { token: 'mock_jwt_token', user };
      }
      throw new Error('Invalid OTP code');
    },
  },
  user: {
    getProfile: async (): Promise<User> => {
      await delay(500);
      // Return a simulated user based on whatever is "stored"
      return { ...mockUser, phone: '+1234567890', onboardingStatus: 'ROLE_SELECTION' };
    },
    updateRole: async (role: 'commuter' | 'driver'): Promise<User> => {
      await delay(800);
      return { ...mockUser, role, onboardingStatus: 'PROFILE_INFO' };
    },
    updateProfile: async (profileData: Partial<User>): Promise<User> => {
      await delay(1200);
      return { ...mockUser, ...profileData, onboardingStatus: 'IDENTITY_VERIFICATION' } as User;
    },
    verifyIdentity: async (data: VerifyIdentityPayload): Promise<User & { verificationStatus: string }> => {
      await delay(2000);
      return { ...mockUser, onboardingStatus: 'COMPLETE', verificationStatus: 'PENDING' };
    },
  },
};

export const api = USE_MOCK_API ? mockApi : realApi;
