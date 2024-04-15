'use server';

import db from '@/lib/db';
import { taskCompletions } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

/**
 * Deletes a task completion record from the database and revalidates the root path.
 *
 * @param todoId - The ID of the task to be unmarked as completed.
 * @param completionDate - The date the task was originally marked as completed.
 * @returns An array with the result of the database operation and any potential error.
 */
export const unCompleteTask = async (todoId: string, completionDate: Date) => {
  try {
    const res = await db
      .delete(taskCompletions)
      .where(
        and(
          eq(taskCompletions.todoId, todoId),
          eq(taskCompletions.completionDate, completionDate)
        )
      )
      .returning();
    revalidatePath('/');
    return [res, null];
  } catch (error: any) {
    return [{}, error?.message];
  }
};
