import { taskCompletions, todos } from "@/lib/db/schema";

export type Todo = typeof todos.$inferSelect;

export type TaskCompletion = typeof taskCompletions.$inferSelect