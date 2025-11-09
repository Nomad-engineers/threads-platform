import { ActivityItem, ActivityType, ActivityUser } from "@/types"

// Mock user data
const mockUsers: ActivityUser[] = [
  {
    id: "user-1",
    username: "alexjohnson",
    displayName: "Alex Johnson",
    avatar: "👨‍💼",
    followerCount: 15200,
    isVerified: true,
    isVip: false,
  },
  {
    id: "user-2",
    username: "sarahchen",
    displayName: "Sarah Chen",
    avatar: "👩‍💻",
    followerCount: 8700,
    isVerified: false,
    isVip: true,
  },
  {
    id: "user-3",
    username: "mikedavis",
    displayName: "Mike Davis",
    avatar: "👨‍🎨",
    followerCount: 4500,
    isVerified: false,
    isVip: false,
  },
  {
    id: "user-4",
    username: "emmawilson",
    displayName: "Emma Wilson",
    avatar: "👩‍🏫",
    followerCount: 12300,
    isVerified: true,
    isVip: false,
  },
  {
    id: "user-5",
    username: "davidbrown",
    displayName: "David Brown",
    avatar: "👨‍🔬",
    followerCount: 6800,
    isVerified: false,
    isVip: true,
  },
  {
    id: "user-6",
    username: "lisagarcia",
    displayName: "Lisa Garcia",
    avatar: "👩‍💼",
    followerCount: 9100,
    isVerified: false,
    isVip: false,
  },
  {
    id: "user-7",
    username: "tomanderson",
    displayName: "Tom Anderson",
    avatar: "👨‍📚",
    followerCount: 15600,
    isVerified: true,
    isVip: false,
  },
  {
    id: "user-8",
    username: "jenniferlee",
    displayName: "Jennifer Lee",
    avatar: "👩‍🎨",
    followerCount: 8700,
    isVerified: false,
    isVip: true,
  },
  {
    id: "user-9",
    username: "chrismartin",
    displayName: "Chris Martin",
    avatar: "👨‍🎵",
    followerCount: 25400,
    isVerified: true,
    isVip: false,
  },
  {
    id: "user-10",
    username: "sophietaylor",
    displayName: "Sophie Taylor",
    avatar: "👩‍🔬",
    followerCount: 12800,
    isVerified: false,
    isVip: false,
  },
]

// Helper function to generate deterministic timestamps
const getDeterministicTimestamp = (index: number, maxHoursAgo: number = 48) => {
  const now = new Date()
  // Use index to create deterministic but varied timestamps
  const hours = (index * 2.3) % maxHoursAgo // 2.3 is an arbitrary multiplier for variety
  const minutes = (index * 17) % 60 // 17 for minute variation
  return new Date(now.getTime() - (hours * 60 + minutes) * 60 * 1000)
}

// Helper function to get deterministic user based on index
const getDeterministicUser = (index: number) => mockUsers[index % mockUsers.length]

// Generate comprehensive mock activities
export const mockActivities: ActivityItem[] = [
  // Like activities
  {
    id: "activity-1",
    type: "like",
    user: mockUsers[0],
    action: "liked your post",
    target: {
      id: "post-123",
      type: "post",
      content: "Great insights on content strategy and how it impacts engagement metrics across different platforms!",
      author: mockUsers[0],
      postedAt: getDeterministicTimestamp(1, 4),
      engagementMetrics: { likes: 45, comments: 12, reposts: 8, views: 1200 },
    },
    timestamp: getDeterministicTimestamp(0, 1),
    isRead: false,
    metadata: {
      postId: "post-123",
      sentiment: "positive",
      reach: 1200,
      impressions: 1500,
    },
    priority: "medium",
  },
  {
    id: "activity-2",
    type: "like",
    user: mockUsers[1],
    action: "liked your comment",
    target: {
      id: "comment-456",
      type: "comment",
      content: "This is really helpful, thanks for sharing! Looking forward to implementing these strategies.",
      author: mockUsers[1],
      postedAt: getDeterministicTimestamp(3, 6),
    },
    timestamp: getDeterministicTimestamp(1, 2),
    isRead: false,
    metadata: {
      postId: "post-124",
      commentId: "comment-456",
      sentiment: "positive",
    },
    priority: "low",
  },

  // Comment activities
  {
    id: "activity-3",
    type: "comment",
    user: mockUsers[1],
    action: "commented on your post",
    target: {
      id: "post-124",
      type: "post",
      content: "10 Ways to Improve Your Social Media Engagement",
      author: mockUsers[1],
      postedAt: getDeterministicTimestamp(4),
      engagementMetrics: { likes: 89, comments: 23, reposts: 15, views: 3400 },
    },
    timestamp: getDeterministicTimestamp(2),
    isRead: false,
    metadata: {
      postId: "post-124",
      sentiment: "positive",
      reach: 3400,
      impressions: 4200,
    },
    priority: "high",
  },

  // Follow activities
  {
    id: "activity-4",
    type: "follow",
    user: mockUsers[2],
    action: "started following you",
    timestamp: getDeterministicTimestamp(3),
    isRead: false,
    metadata: {
      reach: 4500,
      impressions: 6000,
    },
    priority: "medium",
  },
  {
    id: "activity-5",
    type: "follow",
    user: mockUsers[7],
    action: "started following you",
    timestamp: getDeterministicTimestamp(8),
    isRead: true,
    metadata: {
      reach: 8700,
      impressions: 11000,
    },
    priority: "medium",
  },

  // Mention activities
  {
    id: "activity-6",
    type: "mention",
    user: mockUsers[3],
    action: "mentioned you in a post",
    target: {
      id: "post-125",
      type: "post",
      content: "Check out this thread by @yourhandle about analytics best practices - it's exactly what we've been looking for!",
      author: mockUsers[3],
      postedAt: getDeterministicTimestamp(5),
      engagementMetrics: { likes: 67, comments: 18, reposts: 22, views: 2800 },
    },
    timestamp: getDeterministicTimestamp(4),
    isRead: false,
    metadata: {
      postId: "post-125",
      sentiment: "positive",
      reach: 2800,
      impressions: 3500,
      mentions: ["@yourhandle"],
    },
    priority: "high",
  },

  // Repost activities
  {
    id: "activity-7",
    type: "repost",
    user: mockUsers[4],
    action: "reposted your content",
    target: {
      id: "post-126",
      type: "post",
      content: "Must-read analytics guide for social media managers - comprehensive breakdown of key metrics!",
      author: mockUsers[4],
      postedAt: getDeterministicTimestamp(12),
      engagementMetrics: { likes: 134, comments: 45, reposts: 28, views: 8900 },
    },
    timestamp: getDeterministicTimestamp(10),
    isRead: true,
    metadata: {
      postId: "post-126",
      sentiment: "positive",
      reach: 8900,
      impressions: 12000,
    },
    priority: "medium",
  },

  // Reply activities
  {
    id: "activity-8",
    type: "reply",
    user: mockUsers[5],
    action: "replied to your comment",
    target: {
      id: "comment-789",
      type: "comment",
      content: "Great point about engagement timing! The data really supports this approach.",
      author: mockUsers[5],
      postedAt: getDeterministicTimestamp(15),
    },
    timestamp: getDeterministicTimestamp(14),
    isRead: true,
    metadata: {
      postId: "post-127",
      commentId: "comment-789",
      sentiment: "positive",
      isReply: true,
      replyDepth: 2,
    },
    priority: "low",
  },
  {
    id: "activity-9",
    type: "reply",
    user: mockUsers[6],
    action: "replied to your thread",
    target: {
      id: "thread-101",
      type: "thread",
      content: "I completely agree with your analysis. Here's my take on how this applies to different industries...",
      author: mockUsers[6],
      postedAt: getDeterministicTimestamp(18),
    },
    timestamp: getDeterministicTimestamp(16),
    isRead: false,
    metadata: {
      postId: "post-128",
      threadId: "thread-101",
      sentiment: "neutral",
      isReply: true,
      replyDepth: 1,
    },
    priority: "medium",
  },

  // Quote activities
  {
    id: "activity-10",
    type: "quote",
    user: mockUsers[8],
    action: "quoted your post",
    target: {
      id: "post-129",
      type: "post",
      content: "Original: 'Content is king, but context is queen' - This perfectly captures the essence of modern marketing!",
      author: mockUsers[8],
      postedAt: getDeterministicTimestamp(20),
      engagementMetrics: { likes: 245, comments: 67, reposts: 89, views: 15600 },
    },
    timestamp: getDeterministicTimestamp(18),
    isRead: false,
    metadata: {
      postId: "post-129",
      sentiment: "positive",
      reach: 15600,
      impressions: 22000,
      isQuote: true,
      originalContent: "Content is king, but context is queen",
    },
    priority: "high",
  },

  // Additional diverse activities
  {
    id: "activity-11",
    type: "like",
    user: mockUsers[9],
    action: "liked your post",
    target: {
      id: "post-130",
      type: "post",
      content: "The future of AI in social media marketing - trends and predictions for 2024",
      author: mockUsers[9],
      postedAt: getDeterministicTimestamp(6),
      engagementMetrics: { likes: 178, comments: 34, reposts: 45, views: 6700 },
    },
    timestamp: getDeterministicTimestamp(5),
    isRead: false,
    metadata: {
      postId: "post-130",
      sentiment: "positive",
      reach: 6700,
      impressions: 8900,
    },
    priority: "medium",
  },
  {
    id: "activity-12",
    type: "comment",
    user: mockUsers[2],
    action: "commented on your post",
    target: {
      id: "post-131",
      type: "post",
      content: "Building a personal brand in the digital age - essential strategies",
      author: mockUsers[2],
      postedAt: getDeterministicTimestamp(8),
      engagementMetrics: { likes: 92, comments: 28, reposts: 19, views: 4500 },
    },
    timestamp: getDeterministicTimestamp(7),
    isRead: true,
    metadata: {
      postId: "post-131",
      sentiment: "neutral",
      reach: 4500,
      impressions: 5800,
    },
    priority: "medium",
  },
  {
    id: "activity-13",
    type: "mention",
    user: mockUsers[4],
    action: "mentioned you in a comment",
    target: {
      id: "comment-234",
      type: "comment",
      content: "Hey @yourhandle, would love to hear your thoughts on this approach!",
      author: mockUsers[4],
      postedAt: getDeterministicTimestamp(10),
    },
    timestamp: getDeterministicTimestamp(9),
    isRead: false,
    metadata: {
      postId: "post-132",
      commentId: "comment-234",
      sentiment: "positive",
      mentions: ["@yourhandle"],
    },
    priority: "medium",
  },
  {
    id: "activity-14",
    type: "repost",
    user: mockUsers[7],
    action: "reposted your content with comment",
    target: {
      id: "post-133",
      type: "post",
      content: "This is so valuable! Adding my own experience: consistency beats intensity every time.",
      author: mockUsers[7],
      postedAt: getDeterministicTimestamp(14),
      engagementMetrics: { likes: 156, comments: 41, reposts: 67, views: 9800 },
    },
    timestamp: getDeterministicTimestamp(12),
    isRead: true,
    metadata: {
      postId: "post-133",
      sentiment: "positive",
      reach: 9800,
      impressions: 12400,
    },
    priority: "medium",
  },
  {
    id: "activity-15",
    type: "follow",
    user: mockUsers[8],
    action: "started following you",
    timestamp: getDeterministicTimestamp(16),
    isRead: false,
    metadata: {
      reach: 25400,
      impressions: 32000,
    },
    priority: "high",
  },
]

// Generate additional activities to reach 50+ items
const additionalActivities: ActivityItem[] = []
for (let i = 16; i <= 50; i++) {
  const types: ActivityType[] = ["like", "comment", "reply", "follow", "mention", "quote", "repost"]
  const deterministicType = types[i % types.length]!
  const deterministicUser = getDeterministicUser(i)

  let action = ""
  let target = undefined

  // Use deterministic patterns based on index
  const typeVariation = i % 3
  const readPattern = i % 5
  const sentimentPattern = i % 7
  const priorityPattern = i % 10

  switch (deterministicType) {
    case "like":
      action = typeVariation === 0 ? "liked your post" : "liked your comment"
      break
    case "comment":
      action = "commented on your post"
      break
    case "reply":
      action = typeVariation === 0 ? "replied to your comment" : "replied to your thread"
      break
    case "follow":
      action = "started following you"
      break
    case "mention":
      action = typeVariation === 0 ? "mentioned you in a post" : "mentioned you in a comment"
      break
    case "quote":
      action = "quoted your post"
      break
    case "repost":
      action = typeVariation === 0 ? "reposted your content" : "reposted your content with comment"
      break
  }

  // Deterministic values based on index patterns
  const isRead = readPattern > 1 // 60% unread (patterns 2,3,4 are unread)
  const sentiment = sentimentPattern < 4 ? "positive" : sentimentPattern < 6 ? "neutral" : "negative"
  const priority = priorityPattern < 2 ? "high" : priorityPattern < 7 ? "medium" : "low"
  const reach = 1000 + (i * 157) % 9000 // Range 1000-9999
  const impressions = 2000 + (i * 223) % 13000 // Range 2000-14999

  const activity: ActivityItem = {
    id: `activity-${i}`,
    type: deterministicType,
    user: deterministicUser,
    action,
    target,
    timestamp: getDeterministicTimestamp(i + 20),
    isRead,
    metadata: {
      sentiment,
      reach,
      impressions,
    },
    priority,
  }

  additionalActivities.push(activity)
}

// Combine all activities and sort by timestamp (newest first)
export const allMockActivities = [...mockActivities, ...additionalActivities]
  .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

// Activity statistics
export const activityStats = {
  total: allMockActivities.length,
  byType: allMockActivities.reduce((acc, activity) => {
    acc[activity.type] = (acc[activity.type] || 0) + 1
    return acc
  }, {} as Record<ActivityType, number>),
  unreadCount: allMockActivities.filter(a => !a.isRead).length,
  todayCount: allMockActivities.filter(a => {
    const today = new Date()
    return a.timestamp.toDateString() === today.toDateString()
  }).length,
  thisWeekCount: allMockActivities.filter(a => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return a.timestamp > weekAgo
  }).length,
}