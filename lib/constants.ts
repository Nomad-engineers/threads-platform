export const AUTH_MESSAGES = {
  LOADING: 'Connecting to Threads...',
  BUTTON_CONNECTING: 'Connecting...',
  BUTTON_CONTINUE: 'Continue with Threads',
  WELCOME_TITLE: 'Welcome',
  WELCOME_SUBTITLE: 'Sign in or sign up with Threads',
  SUCCESS_TITLE: 'Welcome!',
  SUCCESS_DESCRIPTION: 'Successfully authenticated with Threads.',
  ERROR_TITLE: 'Authentication Error',
  ERROR_DESCRIPTION: 'Authentication failed',
  CONNECTION_ERROR_TITLE: 'Connection Error',
  CONNECTION_ERROR_DESCRIPTION: 'Failed to connect to Threads. Please try again.',
  TERMS_AGREEMENT: 'By continuing you agree to our ',
  TERMS_LINK: 'Terms & Privacy Policy',
  BACK_TO_HOME: 'Back to home',
} as const

export const CONSOLE_MESSAGES = {
  AUTH_CODE_EXTRACTED: 'Authorization code extracted:',
  AUTH_SUCCESSFUL: 'Authentication successful:',
  AUTH_FAILED: 'Authentication failed:',
  AUTH_ERROR: 'Authentication error:',
  API_REQUEST_FAILED: 'API request failed:',
  REDIRECTING: 'Redirecting to dashboard...',
} as const