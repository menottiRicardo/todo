'use server';

import db from '@/lib/db';
import { lists, userListLink, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { List } from './types';
import GenerateDefaultLists from './generate-default';

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
    const data = await db
      .select({ id: lists.id, title: lists.title, ownerId: lists.ownerId })
      .from(lists)
      .leftJoin(userListLink, eq(lists.id, userListLink.listId))
      .where(eq(userListLink.userId, userId));

    return [data, null];
  } catch (error: any) {
    console.error('Error fetching lists:', error);
    return [[], error.message];
  }
};
