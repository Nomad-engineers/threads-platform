import { prisma } from './db';
import { ThreadsTokenResponse, ThreadsLongLivedTokenResponse, ThreadsUser } from './threads-oauth';

/**
 * Create or update a user in the database
 */
export async function createOrUpdateUser(threadsUser: ThreadsUser) {
  return await prisma.user.upsert({
    where: { threadsUserId: threadsUser.id },
    update: {
      threadsUsername: threadsUser.username,
      lastSyncAt: new Date(),
    },
    create: {
      threadsUserId: threadsUser.id,
      threadsUsername: threadsUser.username,
      email: `${threadsUser.username}@threads.local`, // Placeholder email
      name: threadsUser.username,
    },
  });
}

/**
 * Store or update Threads tokens in the database
 */
export async function storeThreadsTokens(
  userId: string,
  shortLivedResponse: ThreadsTokenResponse,
  longLivedResponse: ThreadsLongLivedTokenResponse,
  threadsUser: ThreadsUser
) {
  const now = new Date();
  const shortLivedExpiresAt = new Date(now.getTime() + (shortLivedResponse.expires_in * 1000));
  const longLivedExpiresAt = new Date(now.getTime() + (longLivedResponse.expires_in * 1000));

  const updateData: any = {
      shortLivedToken: shortLivedResponse.access_token,
      longLivedToken: longLivedResponse.access_token,
      tokenType: longLivedResponse.token_type,
      shortLivedExpiresAt,
      longLivedExpiresAt,
      refreshToken: shortLivedResponse.refresh_token,
      threadsUserId: threadsUser.id,
      threadsUsername: threadsUser.username,
      lastUsedAt: now,
    };

    // Only include scope if it exists
    if (shortLivedResponse.scope) {
      updateData.scope = shortLivedResponse.scope;
    }

    return await prisma.threadsToken.upsert({
      where: { userId },
      update: updateData,
    create: {
      userId,
      shortLivedToken: shortLivedResponse.access_token,
      longLivedToken: longLivedResponse.access_token,
      tokenType: longLivedResponse.token_type,
      scope: shortLivedResponse.scope || null,
      shortLivedExpiresAt,
      longLivedExpiresAt,
      refreshToken: shortLivedResponse.refresh_token,
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
 * Check if long-lived token is expired or about to expire
 */
export async function isLongLivedTokenExpired(userId: string) {
  const tokens = await prisma.threadsToken.findUnique({
    where: { userId },
    select: { longLivedExpiresAt: true },
  });

  if (!tokens || !tokens.longLivedExpiresAt) {
    return true;
  }

  // Add 24 hour buffer to refresh before expiration
  const now = new Date();
  const expiresWithBuffer = new Date(tokens.longLivedExpiresAt.getTime() - (24 * 60 * 60 * 1000));

  return now >= expiresWithBuffer;
}