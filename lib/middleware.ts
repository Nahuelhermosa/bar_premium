import { NextRequest } from 'next/server';
import { verifyToken } from './auth';

export function getToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.slice(7);
}

export function isAuthenticated(request: NextRequest): boolean {
  const token = getToken(request);
  if (!token) return false;
  return verifyToken(token) !== null;
}
