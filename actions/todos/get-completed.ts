import db from '@/lib/db';
import { lists, taskCompletions, todos } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { Todo, TaskCompletion } from './types';
import { List } from '../lists';

/**
 * Retrieves a list of completed todos for the given user, along with their associated task completions and lists.
 *
 * @param userId - The ID of the user whose completed todos should be retrieved.
 * @returns A tuple containing an array of objects with the completed todo, its task completion, and the associated list, as well as a potential error message.
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
      .where(eq(todos.userId, userId))
      .innerJoin(todos, eq(taskCompletions.todoId, todos.id))
      .innerJoin(lists, eq(todos.listId, lists.id))
      .orderBy(taskCompletions.completionDate);
    return [data, null];
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [[], error as string];
  }
};
