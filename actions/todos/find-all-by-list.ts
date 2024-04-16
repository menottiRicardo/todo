'use server';

import db from '@/lib/db';
import { and, eq,  notExists } from 'drizzle-orm';
import { TaskCompletion, Todo } from './types';
import {
  lists,
  taskCompletions,
  todos,
  userListLink,
} from '@/lib/db/schema';
import { List } from '../lists/types';

export interface TodoWithList {
  todo: Todo;
  list: List;
  taskCompletion?: TaskCompletion;
}

export const getTodosByList = async (
  userId: string,
  listId: string
): Promise<[TodoWithList[], string | null]> => {

  try {
    const pendingTasksQuery = db
      .select()
      .from(taskCompletions)
      .where(eq(taskCompletions.todoId, todos.id));

    const data = await db
      .select()
      .from(todos)
      .innerJoin(lists, eq(lists.id, todos.listId))
      .innerJoin(userListLink, eq(userListLink.listId, listId))
      .where(
        and(eq(userListLink.userId, userId), notExists(pendingTasksQuery), eq(lists.id, listId))
      );

    return [data, null];
  } catch (error: any) {
    console.error('Error fetching lists:', error);
    return [[], error?.message];
  }
};
