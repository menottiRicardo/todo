import db from '@/lib/db';
import { todos } from '@/lib/db/schema';
import { Todo } from '@/lib/types';

export const addTodo = async (todo: Todo) => {
  await db.insert(todos).values(todo);
};
