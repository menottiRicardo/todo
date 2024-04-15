import db from '@/lib/db';
import { lists, taskCompletions, todos, userListLink } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { Todo, TaskCompletion } from './types';
import { List } from '../lists/types';

/**
 * Retrieves a list of completed todos for the given user, along with the associated task completions and lists.
 *
 * @param userId - The ID of the user to retrieve completed todos for.
 * @returns A tuple containing an array of objects with the completed todo, task completion, and list, and an optional error message.
 */
export const getCompletedTodos = async (
  userId: string
): Promise<
  [{ todo: Todo; taskCompletion: TaskCompletion; list: List }[], string | null]
> => {
  try {
    const data = await db
      .select()
      .from(taskCompletions)
      .innerJoin(todos, eq(taskCompletions.todoId, todos.id))
      .innerJoin(lists, eq(todos.listId, lists.id))
      .innerJoin(userListLink, eq(userListLink.listId, lists.id))
      .where(eq(userListLink.userId, userId))
      .orderBy(desc(taskCompletions.completionDate));
    return [data, null];
  } catch (error: any) {
    console.error('Error fetching lists:', error);
    return [[], error?.message];
  }
};
