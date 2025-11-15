import { SignJWT, jwtVerify } from 'jose';
import { User } from '@prisma/client';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
);

export interface JWTPayload {
  userId: string;
  username: string;
  subscriptionTier: string;
  iat?: number;
  exp?: number;
}

/**
 * Generate a JWT token for the user
 */
export async function generateJWT(user: User): Promise<string> {
  const payload: JWTPayload = {
    userId: user.id,
    username: user.threadsUsername,
    subscriptionTier: user.subscriptionTier,
  };

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // 7 days expiration
    .sign(JWT_SECRET);
}

/**
 * Verify and decode a JWT token
 */
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as JWTPayload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

/**
 * Generate a secure random string for JWT secrets
 */
export function generateJWTSecret(): string {
  const crypto = require('crypto');
  return crypto.randomBytes(64).toString('hex');
}