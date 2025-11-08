// Global type definitions for Threadlytics

export interface User {
  id: string;
  email: string;
  threadsUserId?: string;
  threadsUsername?: string;
  subscriptionTier: 'free' | 'creator' | 'professional' | 'business';
  subscriptionStatus: 'active' | 'inactive' | 'canceled';
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
  lastSyncAt?: Date;
}

export interface ThreadsPost {
  id: string;
  userId: string;
  threadsPostId: string;
  content: string;
  mediaUrls: string[];
  postedAt: Date;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  viewsCount: number;
  engagementRate: number;
  viralScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ThreadsComment {
  id: string;
  postId: string;
  threadsCommentId: string;
  authorId: string;
  authorUsername: string;
  authorFollowersCount: number;
  content: string;
  postedAt: Date;
  isRead: boolean;
  isVip: boolean;
  isAnswered: boolean;
  createdAt: Date;
}

export interface ScheduledPost {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  scheduledTime: Date;
  status: 'scheduled' | 'posted' | 'failed';
  threadsPostId?: string;
  postedAt?: Date;
  errorMessage?: string;
  retryCount: number;
  createdAt: Date;
}

export interface DailyAnalytics {
  id: string;
  userId: string;
  date: Date;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  totalLikes: number;
  totalComments: number;
  totalReposts: number;
  totalViews: number;
  engagementRate: number;
  newFollowers: number;
  createdAt: Date;
}

export interface UserSettings {
  id: string;
  userId: string;
  timezone: string;
  notificationEmail: boolean;
  notificationPush: boolean;
  reportFrequency: 'daily' | 'weekly' | 'monthly';
  optimalTimes: number[];
  aiSuggestionsEnabled: boolean;
  autoHashtag: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total: number;
      hasMore: boolean;
    };
    timestamp: string;
    requestId: string;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export interface AnalyticsFilters {
  dateRange: DateRange;
  contentType?: 'text' | 'image' | 'video' | 'link';
  sortBy?: 'date' | 'engagement' | 'likes' | 'comments';
  sortOrder?: 'asc' | 'desc';
}

export interface ScheduledPostFilters {
  status?: 'scheduled' | 'posted' | 'failed';
  dateRange?: DateRange;
  search?: string;
}

export interface CommentFilters {
  isRead?: boolean;
  isAnswered?: boolean;
  isVip?: boolean;
  dateRange?: DateRange;
  search?: string;
}

// API Request/Response types
export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface CreateScheduledPostRequest {
  content: string;
  mediaUrls: string[];
  scheduledTime: Date;
}

export interface UpdateUserSettingsRequest {
  timezone?: string;
  notificationEmail?: boolean;
  notificationPush?: boolean;
  reportFrequency?: 'daily' | 'weekly' | 'monthly';
  aiSuggestionsEnabled?: boolean;
  autoHashtag?: boolean;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Dashboard analytics types
export interface DashboardOverview {
  totalPosts: number;
  totalLikes: number;
  totalComments: number;
  totalReposts: number;
  averageEngagementRate: number;
  followerGrowth: number;
  topPerformingPost: ThreadsPost;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'post' | 'comment' | 'like' | 'follow';
  description: string;
  timestamp: Date;
  metadata?: any;
}

// Chart data types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface EngagementChart {
  likes: ChartDataPoint[];
  comments: ChartDataPoint[];
  reposts: ChartDataPoint[];
  engagementRate: ChartDataPoint[];
}

// Subscription types
export interface SubscriptionPlan {
  id: string;
  name: 'Free' | 'Creator' | 'Professional' | 'Business';
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  limits: {
    scheduledPosts: number;
    dataHistory: number; // in days
    teamMembers: number;
    apiCalls: number;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  paddleSubscriptionId: string;
  canceledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}