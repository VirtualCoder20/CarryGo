# CarryGo - Backend API Contract

This document outlines the expected API endpoints for authentication and user onboarding.

## 1. Authentication

### POST `/v1/auth/phone`
Initiate phone verification by sending an OTP.

**Request:**
```json
{
  "phone": "+2348012345678"
}
```

**Response (200 OK):**
```json
{
  "message": "OTP sent successfully"
}
```

### POST `/v1/auth/verify`
Verify OTP and complete login/signup.

**Request:**
```json
{
  "phone": "+2348012345678",
  "otp": "1234"
}
```

**Response (200 OK):**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "phone": "+2348012345678",
    "onboardingStatus": "ROLE_SELECTION" // or "COMPLETE" if old user
  }
}
```

## 2. Onboarding

### PATCH `/v1/user/role`
Assign a role to the user.

**Request:**
```json
{
  "role": "driver" | "commuter"
}
```

**Response (200 OK):**
```json
{
  "onboardingStatus": "PROFILE_INFO"
}
```

### PATCH `/v1/user/profile`
Update basic profile information.

**Request (Multipart/form-data):**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "homeLocation": "Lekki Phase 1",
  "workLocation": "IHS Tower Ibeju Lekki",
  "avatar": "binary_image_data"
}
```

**Response (200 OK):**
```json
{
  "onboardingStatus": "IDENTITY_VERIFICATION"
}
```

### POST `/v1/user/verify-identity`
Upload mandatory documents for identity verification.

**Request (Multipart/form-data):**
For **Driver**:
- `driversLicense`: File
- `vehicleRegistration`: File
- `nationalID`: File
- `proofOfInsurance`: File
- `vehicleDescription`: String

For **Commuter**:
- `nationalID`: File
- `billPayment`: File

**Response (201 Created):**
```json
{
  "verificationStatus": "PENDING",
  "onboardingStatus": "COMPLETE"
}
```

---

## 3. Mock Types (Frontend Reference)

```typescript
export interface User {
  id: string;
  phone: string;
  role: 'commuter' | 'driver' | null;
  fullName?: string;
  email?: string;
  avatarUrl?: string;
  onboardingStatus: 'AUTH' | 'ROLE_SELECTION' | 'PROFILE_INFO' | 'IDENTITY_VERIFICATION' | 'COMPLETE';
}
```
