import NewTodo from '@/components/todos/new';

export default async function NewTodoPage({
  params,
}: {
  params: { id: string };
}) {
  return <NewTodo todoId={params.id} />;
}
