'use server';
import db from '@/lib/db';
import { insertTodoSchema, todos } from '@/lib/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

/**
 * Creates a new todo item in the database.
 *
 * @param todo - An object representing the new todo item, conforming to the `insertTodoSchema` schema.
 * @returns A tuple, where the first element is the result of the database insert operation, and the second element is any error that occurred.
 */
export const createTodo = async (todo: z.infer<typeof insertTodoSchema>) => {
  try {
    const res = await db.insert(todos).values(todo);
    revalidatePath('/');
    return [res, null];
  } catch (error) {
    console.log('error', error);
    return [{}, error];
  }
};
