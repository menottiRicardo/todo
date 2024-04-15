'use server';
import db from '@/lib/db';
import { userListLink } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';

/**
 * Invites users to a list by creating links between the user IDs and the list ID.
 *
 * @param userIds - An array of user IDs to invite to the list.
 * @param listId - The ID of the list to invite the users to.
 * @returns An array containing the attached list or an error message.
 */
export const inviteToList = async (userIds: string[], listId: string) => {
  try {
    const userLinks = userIds.map((userId) => ({
      userId,
      listId,
    }));

    const attachedList = await db
      .insert(userListLink)
      .values(userLinks)
      .returning();

    revalidatePath('/');
    return [attachedList, null];
  } catch (error: any) {
    return [null, error?.message];
  }
};
