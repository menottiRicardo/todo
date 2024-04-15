'use server';
import db from '@/lib/db';
import { userListLink } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';

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
