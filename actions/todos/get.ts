'use server';
import db from '@/lib/db';
import { lists, todos, userListLink } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

/**
 * Retrieves a todo item by its ID, ensuring the user has permission to access it.
 *
 * @param todoId - The ID of the todo item to retrieve.
 * @param userId - The ID of the user requesting the todo item.
 * @returns An array with the todo item and any error that occurred, or `[null, error]` if the todo item does not exist or the user does not have permission to access it.
 */
export const getTodo = async (todoId: string, userId: string) => {
  try {
    const res = await db
      .select()
      .from(todos)
      .innerJoin(lists, eq(lists.id, todos.listId))
      .innerJoin(userListLink, eq(userListLink.listId, lists.id))
      .where(and(eq(todos.id, todoId), eq(userListLink.userId, userId)));

    if (res.length === 0) {
      throw new Error(
        'You do not have permission to access this todo or it does not exist.'
      );
    }
    return [res[0], null];
  } catch (error: any) {
    console.log(error);
    return [null, error?.message];
  }
};
