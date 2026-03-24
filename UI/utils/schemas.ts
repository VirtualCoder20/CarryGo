import { z } from 'zod';

export const UserRoleSchema = z.union([z.literal('commuter'), z.literal('driver')]).nullable();

export const OnboardingStatusSchema = z.enum([
  'AUTH',
  'ROLE_SELECTION',
  'PROFILE_INFO',
  'IDENTITY_VERIFICATION',
  'COMPLETE'
]);

export const UserSchema = z.object({
  id: z.string(),
  phone: z.string(),
  role: UserRoleSchema,
  fullName: z.string().optional(),
  email: z.email().optional(),
  avatarUrl: z.url().optional(),
  onboardingStatus: OnboardingStatusSchema,
});

export const AuthResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
});
