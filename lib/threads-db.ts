import { prisma } from './db';
import { ThreadsUser } from './threads-oauth';

/**
 * Create or update a user in the database
 */
export async function createOrUpdateUser(threadsUser: ThreadsUser) {
  return await prisma.user.upsert({
    where: { threadsUserId: threadsUser.id },
    update: {
      threadsUsername: threadsUser.username,
      profilePictureUrl: threadsUser.threads_profile_picture_url || null,
      lastSyncAt: new Date(),
    },
    create: {
      threadsUserId: threadsUser.id,
      threadsUsername: threadsUser.username,
      profilePictureUrl: threadsUser.threads_profile_picture_url || null,
    },
  });
}

/**
 * Store or update Threads tokens in the database
 */
export async function storeThreadsTokens(
  userId: string,
  accessToken: string,
  refreshToken: string | undefined,
  expiresIn: number,
  threadsUser: ThreadsUser
) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + (expiresIn * 1000));

  const updateData = {
    accessToken,
    refreshToken: refreshToken || null,
    expiresAt,
    threadsUserId: threadsUser.id,
    threadsUsername: threadsUser.username,
    lastUsedAt: now,
  };

  return await prisma.threadsToken.upsert({
    where: { userId },
    update: updateData,
    create: {
      userId,
      accessToken,
      refreshToken: refreshToken || null,
      expiresAt,
      threadsUserId: threadsUser.id,
      threadsUsername: threadsUser.username,
      lastUsedAt: now,
    },
  });
}

/**
 * Get Threads tokens for a user
 */
export async function getThreadsTokens(userId: string) {
  return await prisma.threadsToken.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  });
}

/**
 * Get user by Threads user ID
 */
export async function getUserByThreadsId(threadsUserId: string) {
  return await prisma.user.findUnique({
    where: { threadsUserId },
    include: {
      threadsTokens: true,
    },
  });
}

/**
 * Update last used timestamp for tokens
 */
export async function updateTokenLastUsed(userId: string) {
  return await prisma.threadsToken.update({
    where: { userId },
    data: { lastUsedAt: new Date() },
  });
}

/**
 * Check if access token is expired or about to expire
 */
export async function isAccessTokenExpired(userId: string) {
  const tokens = await prisma.threadsToken.findUnique({
    where: { userId },
    select: { expiresAt: true },
  });

  if (!tokens || !tokens.expiresAt) {
    return true;
  }

  // Add 1 hour buffer to refresh before expiration
  const now = new Date();
  const expiresWithBuffer = new Date(tokens.expiresAt.getTime() - (60 * 60 * 1000));

  return now >= expiresWithBuffer;
}