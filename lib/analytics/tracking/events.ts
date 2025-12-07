// Standard and custom event tracking

export interface EventProperties {
  [key: string]: any
}

export interface PageViewEvent {
  path: string
  title: string
  location?: string
  referrer?: string
}

export interface ClickEvent {
  element: string
  text?: string
  href?: string
  location?: string
}

export interface ConversionEvent {
  step: 'visit' | 'signup' | 'activation' | 'purchase'
  productId?: string
  productName?: string
  price?: number
  currency?: string
  source?: string
  medium?: string
}

export interface FormEvent {
  formId: string
  step: 'start' | 'progress' | 'completion' | 'abandonment'
  field?: string
  timeSpent?: number
}

export interface PerformanceEvent {
  metric: 'LCP' | 'FID' | 'CLS' | 'FCP' | 'TTFB' | 'INP' | 'ResourceLoad'
  value: number
  url: string
  userAgent: string
}

export interface UserEngagementEvent {
  action: 'scroll' | 'hover' | 'click' | 'video_play' | 'download'
  element?: string
  depth?: number
  timeOnPage?: number
}

// Standard GA4 events mapping
export const GA4_EVENTS = {
  PAGE_VIEW: 'page_view',
  SCROLL: 'scroll',
  CLICK: 'click',
  SEARCH: 'search',
  VIEW_ITEM: 'view_item',
  ADD_TO_CART: 'add_to_cart',
  BEGIN_CHECKOUT: 'begin_checkout',
  PURCHASE: 'purchase',
  SIGN_UP: 'sign_up',
  LOGIN: 'login',
  FORM_START: 'form_start',
  FORM_PROGRESS: 'form_progress',
  FORM_SUBMIT: 'form_submit',
  FORM_ABANDON: 'form_abandon',
  VIDEO_START: 'video_start',
  VIDEO_PROGRESS: 'video_progress',
  VIDEO_END: 'video_end',
  GENERATE_LEAD: 'generate_lead',
  SHARE: 'share',
} as const

export const CUSTOM_EVENTS = {
  // User Journey Events
  FEATURE_INTERACTION: 'feature_interaction',
  A_B_TEST_EXPOSURE: 'a_b_test_exposure',
  A_B_TEST_CONVERSION: 'a_b_test_conversion',

  // Performance Events
  PERFORMANCE_METRIC: 'performance_metric',
  ERROR_OCCURRED: 'error_occurred',
  API_REQUEST: 'api_request',

  // Business Events
  TRIAL_STARTED: 'trial_started',
  TRIAL_UPGRADED: 'trial_upgraded',
  PLAN_CHANGED: 'plan_changed',
  CONTENT_SHARED: 'content_shared',
  ENGAGEMENT_TRACKED: 'engagement_tracked',
} as const