import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewTodoForm from './new-todo-form';
import { getUserLists } from '@/actions/lists/find-all';
import { getTodo } from '@/actions/todos/get';

export default async function NewTodo({ todoId }: { todoId?: string }) {
  const session = await auth();

  if (!session?.user) return redirect('api/auth/signin');

  const userId = session.user.id as string;
  const [lists, errorLists] = await getUserLists(userId);
  let todo = undefined;
  if (todoId) {
    const [data, todoError] = await getTodo(todoId, userId);
    if (todoError) {
      return <div>We could not fetch the todo, error: {todoError}</div>;
    }
    todo = data.todo;
  }

  if (errorLists) {
    return <div>We could not fetch the lists, please try again</div>;
  }
  return <NewTodoForm lists={lists} userId={userId} todo={todo} />;
}
