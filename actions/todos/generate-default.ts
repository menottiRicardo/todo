import db from '@/lib/db';
import { lists, todos, userListLink, users } from '@/lib/db/schema';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export default async function GenerateDefaultTodos(userId: string) {
  const defaultList = await db
    .select()
    .from(lists)
    .where(eq(lists.ownerId, userId));

  const today = dayjs();

  const fakeTodos = [
    {
      name: 'this is a todo for today',
      description: 'This is a description for the todo',
      dueDate: today.toDate(),
      listId: defaultList[0].id,
      ownerId: userId,
    },
    {
      name: 'this is a todo for tomorror',
      description: 'This is another description',
      dueDate: today.add(1, 'day').toDate(),
      listId: defaultList[0].id,
      ownerId: userId,
    },
  ];
  await db.insert(todos).values(fakeTodos);

  await db.update(users).set({ verified: true }).where(eq(users.id, userId));
  revalidatePath('/');
}
