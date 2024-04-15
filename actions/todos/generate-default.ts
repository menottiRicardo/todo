import db from '@/lib/db';
import { lists, todos, userListLink, users } from '@/lib/db/schema';
import dayjs from 'dayjs';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export default async function GenerateDefault(userId: string) {
  const defaultList = await db
    .insert(lists)
    .values({
      title: 'Default',
      ownerId: userId,
    })
    .returning();

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
  console.log(userId, defaultList[0].id);

  await db.insert(userListLink).values({
    userId: userId as string,
    listId: defaultList[0].id,
  });

  await db
    .insert(userListLink)
    .values([{ userId, listId: 'eafa322e-6f4e-499a-8d04-ec2da7e256d8' }]);

  await db.update(users).set({ verified: true }).where(eq(users.id, userId));
  revalidatePath("/")
}
