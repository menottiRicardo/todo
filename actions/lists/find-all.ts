'use server';

import db from '@/lib/db';
import { lists } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { List } from './types';

/**
 * Fetches all lists associated with the specified user ID.
 *
 * @param userId - The ID of the user to fetch lists for.
 * @returns A tuple containing the list of lists and an optional error message.
 */
export const getUserLists = async (
  userId: string
): Promise<[List[], string | null]> => {
  try {
    const data = await db.select().from(lists).where(eq(lists.userId, userId));
    return [data, null];
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [[], error as string];
  }
};
