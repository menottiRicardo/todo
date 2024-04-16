'use server';

import db from '@/lib/db';
import { taskCompletions } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';

/**
 * Marks a task as completed in the database.
 *
 * @param todoId - The ID of the task to mark as completed.
 * @returns A Promise that resolves when the task has been marked as completed.
 */
export const completeTask = async (todoId: string) => {
  const today = new Date();

  try {
    const res = await db
      .insert(taskCompletions)
      .values({
        todoId,
        completionDate: today,
      })
      .returning();
    revalidatePath('/');
    return [res, null];
  } catch (error: any) {
    return [{}, error?.message];
  }
};
