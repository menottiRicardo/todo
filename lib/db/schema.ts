import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  uuid,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import type { AdapterAccount } from 'next-auth/adapters';

export const users = pgTable('user', {
  id: text('id').notNull().primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
});

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccount['type']>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').notNull().primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const todos = pgTable('todo', {
  id: uuid('uuid').notNull().primaryKey().defaultRandom(),
  listId: uuid('listId')
    .notNull()
    .references(() => lists.id, { onDelete: 'cascade' }),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  description: text('description'),
  isRecurring: boolean('isRecurring').default(false),
  dueDate: timestamp('dueDate'),
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
});

// export const insertTodoSchema = createInsertSchema(todos);

export const insertTodoSchema = createInsertSchema(todos, {
  name: (schema) => schema.name.min(2).max(50),
  
});

export const lists = pgTable('list', {
  id: uuid('uuid').notNull().primaryKey().defaultRandom(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
});

export const taskCompletions = pgTable(
  'taskCompletion',
  {
    todoId: uuid('todoId')
      .notNull()
      .references(() => todos.id, { onDelete: 'cascade' }),
    completionDate: timestamp('completionDate', { mode: 'date' }).notNull(),
  },
  (tc) => ({
    primaryKey: primaryKey(tc.todoId, tc.completionDate),
  })
);
