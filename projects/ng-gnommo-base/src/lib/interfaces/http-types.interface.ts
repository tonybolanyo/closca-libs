// HTTP headers interface for better type safety
export interface HttpHeaderMap {
  [key: string]: string | string[];
}

// Generic storage value type
export type StorageValue = string | number | boolean | object | null;

// Authentication credentials interface
export interface LoginCredentials {
  email?: string;
  username?: string;
  password: string;
  [key: string]: unknown; // Allow additional fields for flexibility while maintaining type safety
}

// Password recovery interface
export interface PasswordRecoveryRequest {
  email: string;
}

// Password reset interface
export interface PasswordResetRequest {
  newPassword: string;
  hash: string;
}

// Authentication response interface
export interface AuthenticationResponse {
  token?: string;
  user?: Record<string, unknown>; // Generic user object - can be overridden by generic T in services
  message?: string;
  success?: boolean;
  [key: string]: unknown; // Allow additional response fields while maintaining type safety
}

// Generic API response interface
export interface ApiResponse<T = Record<string, unknown>> {
  data?: T;
  message?: string;
  success?: boolean;
  error?: string;
  [key: string]: unknown; // Allow additional response fields while maintaining type safety
}