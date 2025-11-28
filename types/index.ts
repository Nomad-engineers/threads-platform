// Core types used across the application

// Activity Types - Used in dashboard components
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

export interface ActivityStats {
  total: number;
  byType: Record<ActivityType, number>;
  unreadCount: number;
  todayCount: number;
  thisWeekCount: number;
}

export interface ActivityFilter {
  type: ActivityType;
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  search?: string;
  isRead?: boolean;
  priority?: 'low' | 'medium' | 'high';
  userId?: string;
}

// Date/Time Range Types
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

// Analytics Filters
export interface AnalyticsFilters {
  dateRange: DateRange;
  contentType?: 'text' | 'image' | 'video' | 'link';
  sortBy?: 'date' | 'engagement' | 'likes' | 'comments';
  sortOrder?: 'asc' | 'desc';
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

// API Response types
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