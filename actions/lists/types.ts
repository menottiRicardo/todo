import { lists } from "@/lib/db/schema";

export type List = typeof lists.$inferSelect;
