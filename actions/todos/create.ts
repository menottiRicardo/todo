'use server';

import db from '@/lib/db';
import { insertTodoSchema, todos } from '@/lib/db/schema';
import { z } from 'zod';

export const createTodo = async (todo: z.infer<typeof insertTodoSchema>) => {
  try {
    const res = await db.insert(todos).values(todo);
    return [res, null]
    
  } catch (error) {
    console.log("error",error)
    return [{}, error]
  }
};
