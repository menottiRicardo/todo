'use server';

import db from '@/lib/db';
import { and, eq, notExists } from 'drizzle-orm';
import { Todo } from './types';
import { lists, taskCompletions, todos, userListLink } from '@/lib/db/schema';
import { List } from '../lists';

/**
 * Fetches all lists associated with the specified user ID.
 *
 * @param userId - The ID of the user to fetch lists for.
 * @returns A tuple containing the list of lists and an optional error message.
 */
export const getTodos = async (
  userId: string
): Promise<[{ todo: Todo; list: List }[], string | null]> => {
  try {
    const pendingTasksQuery = db
      .select()
      .from(taskCompletions)
      .where(eq(taskCompletions.todoId, todos.id));

    const data = await db
      .select()
      .from(todos)
      .innerJoin(lists, eq(lists.id, todos.listId))
      .innerJoin(userListLink, eq(userListLink.listId, lists.id))
      .where(
        and(eq(userListLink.userId, userId), notExists(pendingTasksQuery))
      );
    return [data, null];
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [[], error as string];
  }
};
