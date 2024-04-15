'use server';

import db from '@/lib/db';
import { users } from '@/lib/db/schema';
import { User } from './types';
import { ne } from 'drizzle-orm';

/**
 * Fetches all users
 *
 *
 * @returns A tuple containing the list of users and an optional error message.
 */
export const getUsers = async (
  userId: string
): Promise<[User[], string | null]> => {
  try {
    const data = await db.select().from(users).where(ne(users.id, userId));
    return [data, null];
  } catch (error: any) {
    console.error('Error fetching users:', error);
    return [[], error?.message];
  }
};
