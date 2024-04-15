'use server';

import db from '@/lib/db';
import { and, eq, gte, lt, notExists } from 'drizzle-orm';
import { TaskCompletion, Todo } from './types';
import { lists, taskCompletions, todos, userListLink } from '@/lib/db/schema';
import dayjs from 'dayjs';
import { List } from '../lists/types';

export interface TodoWithList {
  todo: Todo;
  list: List;
  taskCompletion?: TaskCompletion;
}

/**
 * Retrieves a list of todos for the given user, separated by whether they are due today or tomorrow.
 *
 * @param userId - The ID of the user to fetch todos for.
 * @returns A tuple containing an object with two arrays, one for todos due today and one for todos due tomorrow, and a nullable error string.
 */
export const getTodos = async (
  userId: string
): Promise<
  [{ today: TodoWithList[]; tomorrow: TodoWithList[] }, string | null]
> => {
  const today = dayjs().startOf('day');
  const dayAfterTomorrow = today.add(2, 'day');
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
        and(
          eq(userListLink.userId, userId),
          notExists(pendingTasksQuery),
          gte(todos.dueDate, today.toDate()),
          lt(todos.dueDate, dayAfterTomorrow.toDate())
        )
      );

    // separate data by dates
    const todayTodos: TodoWithList[] = [];
    const tomorrowTodos: TodoWithList[] = [];

    data.forEach((item) => {
      if (today.isSame(item.todo.dueDate)) {
        todayTodos.push({ todo: item.todo, list: item.list });
      } else {
        tomorrowTodos.push({ todo: item.todo, list: item.list });
      }
    });

    return [{ today: todayTodos, tomorrow: tomorrowTodos }, null];
  } catch (error) {
    console.error('Error fetching lists:', error);
    return [{ today: [], tomorrow: [] }, error as string];
  }
};
