import db from '@/lib/db';
import { lists, userListLink, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function GenerateDefaultLists(userId: string) {
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

  await db.update(users).set({ verified: true }).where(eq(users.id, userId));
}
