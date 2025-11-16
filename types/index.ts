// Global type definitions for Threads-Boost

export interface User {
  id: string;
  threadsUserId: string;
  threadsUsername: string;
  threadsAccountId?: string;
  fullName?: string;
  profilePictureUrl?: string;
  subscriptionTier: 'FREE' | 'CREATOR' | 'PROFESSIONAL' | 'BUSINESS';
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'CANCELED' | 'PENDING';
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

// OAuth API Request/Response types
export interface OAuthStartResponse {
  success: boolean;
  redirect_url: string;
  state: string;
}

export interface OAuthCallbackResponse {
  success: boolean;
  user: User;
  token: string;
  tokens: {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope?: string;
  };
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
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

// Enhanced Activity Types for Filtering
export type ActivityType =
  | 'all'
  | 'like'
  | 'comment'
  | 'reply'
  | 'follow'
  | 'mention'
  | 'quote'
  | 'repost'
  | 'share';

export interface ActivityUser {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followerCount: number;
  isVerified: boolean;
  isVip: boolean;
}

export interface ActivityTarget {
  id: string;
  type: 'post' | 'comment' | 'thread';
  content: string;
  author: ActivityUser;
  postedAt: Date;
  engagementMetrics?: {
    likes: number;
    comments: number;
    reposts: number;
    views: number;
  };
}

export interface ActivityMetadata {
  postId?: string;
  commentId?: string;
  threadId?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  reach?: number;
  impressions?: number;
  isReply?: boolean;
  isQuote?: boolean;
  originalContent?: string;
  replyDepth?: number;
  mentions?: string[];
  hashtags?: string[];
}

export interface ActivityItem {
  id: string;
  type: ActivityType;
  user: ActivityUser;
  action: string;
  target?: ActivityTarget;
  timestamp: Date;
  isRead: boolean;
  metadata: ActivityMetadata;
  priority: 'low' | 'medium' | 'high';
}

export interface ActivityFilter {
  type: ActivityType;
  dateRange?: DateRange;
  search?: string;
  isRead?: boolean;
  priority?: 'low' | 'medium' | 'high';
  userId?: string;
}

export interface ActivityStats {
  total: number;
  byType: Record<ActivityType, number>;
  unreadCount: number;
  todayCount: number;
  thisWeekCount: number;
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