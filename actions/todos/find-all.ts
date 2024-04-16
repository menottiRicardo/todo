'use server';

import db from '@/lib/db';
import { and, eq, gte, lt, notExists } from 'drizzle-orm';
import { TaskCompletion, Todo } from './types';
import {
  lists,
  taskCompletions,
  todos,
  userListLink,
  users,
} from '@/lib/db/schema';
import dayjs from 'dayjs';
import { List } from '../lists/types';
import GenerateDefaultTodos from './seed-db';
import { revalidatePath } from 'next/cache';

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
  userId: string,
  today: dayjs.Dayjs
): Promise<
  [{ today: TodoWithList[]; tomorrow: TodoWithList[] }, string | null]
> => {
  today = today.startOf('day');
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
      if (areDatesEqual(today.toDate(), item.todo.dueDate as Date)) {
        todayTodos.push({ todo: item.todo, list: item.list });
      } else {
        tomorrowTodos.push({ todo: item.todo, list: item.list });
      }
    });

    return [{ today: todayTodos, tomorrow: tomorrowTodos }, null];
  } catch (error: any) {
    console.error('Error fetching lists:', error);
    return [{ today: [], tomorrow: [] }, error?.message];
  }
};

function areDatesEqual(date1: Date, date2: Date) {
  // Extract the day, month, and year from both dates
  const day1 = date1.getDate();
  const month1 = date1.getMonth();
  const year1 = date1.getFullYear();

  const day2 = date2.getDate();
  const month2 = date2.getMonth();
  const year2 = date2.getFullYear();

  // Compare the extracted day, month, and year
  return day1 === day2 && month1 === month2 && year1 === year2;
}
