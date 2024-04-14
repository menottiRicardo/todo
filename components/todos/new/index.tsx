import { getUserLists } from "@/actions/lists";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import NewTodoForm from "./new-todo-form";

export default async function NewTodo() {
    const session = await auth();
  
    if (!session?.user) return redirect('api/auth/signin');
  
    const userId = session.user.id;
    const [lists, error] = await getUserLists(userId as string);
  
    if (error) {
      return null;
    }
    return <NewTodoForm lists={lists} userId={userId} />;
  };