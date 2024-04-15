'use server';
import db from '@/lib/db';
import { insertTodoSchema, todos } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateTodo = async (
  todo: z.infer<typeof insertTodoSchema>,
  todoId: string
) => {
  try {
    const res = await db
      .update(todos)
      .set(todo)
      .where(eq(todos.id, todoId))
      .returning();
    revalidatePath('/');
    return [res, null];
  } catch (error: any) {
    console.log(error);
    return [null, error?.message];
  }
};
