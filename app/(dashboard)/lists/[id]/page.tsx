import { getTodosByList } from '@/actions/todos/find-all-by-list';
import Tasks from '@/components/tasks';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function ListsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  // user will never reach due to authorized but still
  // Reference: lib/auth.js#authorized
  if (!session?.user) return redirect('api/auth/signin');

  const user = session.user;

  const [todos, error] = await getTodosByList(user.id as string, params.id);

  if (error) {
    return (
      <div>
        Something went wrong while fetching the todos, please refresh the page
        or <span className="underline cursor-pointer">contact support</span>
      </div>
    );
  }
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid-auto-rows-max gap-4">
        <div
          id="header-container"
          className="flex justify-between items-center max-w-screen-2xl"
          role="banner"
        >
          <div id="header-text">
            <h1 className="font-medium text-xl">Hey! {user?.name}</h1>
            <h3 className="font-light text-secondary py-2">
              This are your tasks for {todos?.[0]?.list?.title}
            </h3>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div id="tasks-container" className="mt-10 flex flex-col gap-4">
            {todos.length > 0 ? (
              <Tasks tasks={todos} />
            ) : (
              <p>Congrats!, there s nothing more to do.</p>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
