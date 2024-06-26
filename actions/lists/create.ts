'use server';
import db from '@/lib/db';
import { insertListSchema, lists, userListLink } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

/**
 * Creates a new todo item in the database.
 *
 * @param list - An object representing the new todo item, conforming to the `insertListSchema` schema.
 * @returns A tuple, where the first element is the result of the database insert operation, and the second element is any error that occurred.
 */
export const createList = async (
  list: z.infer<typeof insertListSchema>,
  userId: string
) => {
  try {
    const createdList = await db.insert(lists).values(list).returning();
    if (!createdList) throw new Error('Failed to create list');

    const attachedList = await db
      .insert(userListLink)
      .values({
        userId,
        listId: createdList[0].id,
      })
      .returning();

    revalidatePath('/');
    return [attachedList, null];
  } catch (error: any) {
    console.log('error', error);
    return [{}, error.message];
  }
};
