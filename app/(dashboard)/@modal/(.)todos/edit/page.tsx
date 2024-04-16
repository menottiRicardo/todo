import NewTodo from '@/components/todos/new';

export default async function EditTodoModalPage({
  params,
}: {
  params: { id: string };
}) {
  return <NewTodo todoId={params.id} />;
}
