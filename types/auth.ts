export interface User {
  id: number;
  username: string;
  name?: string | null;
  picUrl?: string | null;
  bio?: string | null;
  isVerified?: boolean | null;
  token?: string | null;
  subscriptionTier?: 'FREE' | 'CREATOR' | 'PROFESSIONAL' | 'BUSINESS';
  account_type?: string;
  updatedAt: string;
  createdAt: string;
}


export interface AuthResponse {
  accessToken: string
  tokenType?: string
  expiresIn?: number
  user?: User
}

export interface AuthState {
  isLoading: boolean
  isRedirecting: boolean
  isAuthenticated: boolean
  user: User | null
  error: string | null
}