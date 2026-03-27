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

let mockUser: User = {
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
      return response.data;
    },
    updateRole: async (role: 'commuter' | 'driver'): Promise<User> => {
      const response = await apiClient.put('/user/role', { role });
      return response.data;
    },
    updateProfile: async (profileData: Partial<User> & { avatarUri?: string | null }): Promise<User> => {
      const formData = new FormData();
      const { avatarUri, ...data } = profileData;
      
      // Add profile fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as string);
        }
      });
      
      // Add avatar if provided
      if (avatarUri) {
        const filename = avatarUri.split('/').pop() || 'avatar.jpg';
        
        // Fetch the image as a blob
        const response = await fetch(avatarUri);
        const blob = await response.blob();
        formData.append('avatar', blob, filename);
      }
      
      const response = await apiClient.patch('/user/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return UserSchema.parse(response.data);
    },
    verifyIdentity: async (data: VerifyIdentityPayload): Promise<User & { verificationStatus: string }> => {
      const formData = new FormData();
      const { vehicleDescription, documents } = data;
      
      // Add vehicle description if provided
      if (vehicleDescription) {
        formData.append('vehicleDescription', vehicleDescription);
      }
      
      // Convert document URIs to blobs and add to FormData
      for (const [docKey, docUri] of Object.entries(documents)) {
        if (docUri) {
          const filename = docUri.split('/').pop() || `${docKey}.jpg`;
          const response = await fetch(docUri);
          const blob = await response.blob();
          formData.append(`documents[${docKey}]`, blob, filename);
        }
      }
      
      const response = await apiClient.post('/user/verify-identity', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
        mockUser = { ...mockUser, phone };
        return { token: 'mock_jwt_token', user: mockUser };
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
      mockUser = { ...mockUser, role, onboardingStatus: 'PROFILE_INFO' };
      return mockUser;
    },
    updateProfile: async (profileData: Partial<User> & { avatarUri?: string | null }): Promise<User> => {
      await delay(1200);
      const { avatarUri, ...data } = profileData;
      mockUser = { ...mockUser, ...data, avatarUrl: avatarUri || undefined, onboardingStatus: 'IDENTITY_VERIFICATION' } as User;
      return mockUser;
    },
    verifyIdentity: async (data: VerifyIdentityPayload): Promise<User & { verificationStatus: string }> => {
      await delay(2000);
      // In mock, validate that required docs are present
      const docKeys = Object.keys(data.documents).filter(key => data.documents[key]);
      if (docKeys.length === 0) {
        throw new Error('At least one document is required');
      }
      mockUser = { ...mockUser, onboardingStatus: 'COMPLETE' };
      return { ...mockUser, verificationStatus: 'PENDING' };
    },
  },
};

export const api = USE_MOCK_API ? mockApi : realApi;
