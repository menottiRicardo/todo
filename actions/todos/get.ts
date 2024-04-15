'use server';
import db from '@/lib/db';
import { lists, todos, userListLink } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';

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
