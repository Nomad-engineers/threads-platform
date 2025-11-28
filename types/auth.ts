export interface ThreadsUser {
  id: string
  username: string
  name?: string
  profile_picture_url?: string
}

export interface AuthResponse {
  accessToken: string
  tokenType?: string
  expiresIn?: number
  user?: ThreadsUser
}

export interface AuthState {
  isLoading: boolean
  isRedirecting: boolean
  isAuthenticated: boolean
  user: ThreadsUser | null
  error: string | null
}