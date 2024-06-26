'use server';
import db from '@/lib/db';
import {
  lists,
  taskCompletions,
  todos,
  userListLink,
  users,
} from '@/lib/db/schema';
import dayjs from 'dayjs';
import { and, eq, gte, lt, notExists } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { TodoWithList } from './find-all';

export default async function seedDB(userId: string) {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (user[0].verified) {
      throw new Error('db seeded');
    }
    const defaultList = await db
      .insert(lists)
      .values({
        title: 'Default',
        ownerId: userId,
      })
      .returning();

    await db.insert(userListLink).values({
      userId: userId as string,
      listId: defaultList[0].id,
    });

    await db
      .insert(userListLink)
      .values([{ userId, listId: 'eafa322e-6f4e-499a-8d04-ec2da7e256d8' }]);

    const today = dayjs();
    const dayAfterTomorrow = today.add(1, 'day');

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
    revalidatePath('/');
    await db.update(users).set({ verified: true }).where(eq(users.id, userId));
    return [true, null];
  } catch (error: any) {
    return [false, error?.message];
  }
}

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
