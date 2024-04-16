import { getCompletedTodos } from '@/actions/todos/get-completed';
import { Task } from '@/components/todos/task';
import TaskSkeleton from '@/components/todos/task-skeleton';
import Tasks from '@/components/todos/tasks';
import { auth } from '@/lib/auth';
import { getTimeOfDay } from '@/lib/utils';
import dayjs from 'dayjs';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await auth();

  // user will never reach due to authorized but still
  // Reference: lib/auth.js#authorized
  if (!session?.user) return redirect('api/auth/signin');

  const user = session.user;
  const timeOfDay = getTimeOfDay();
  const today = dayjs().format('ddd D MMMM YYYY');

  const [completedTodos, error] = await getCompletedTodos(user.id as string);

  if (error) {
    return <div> something went wrong, error: {error}</div>;
  }
  return (
    <div>
      <div
        id="header-container"
        className="flex justify-between items-center max-w-screen-2xl"
        role="banner"
      >
        <div id="header-text">
          <h1 className="font-medium text-xl">
            Good {timeOfDay}, {user?.name}!
          </h1>
          <h3 className="font-light text-secondary py-2">
            These are your{' '}
            <strong className="font-medium text-primary">completed</strong>{' '}
            Todos as today, {today}
          </h3>
        </div>
      </div>
      <Suspense fallback={<TaskSkeleton />}>
        <div id="tasks-container" className="mt-10 flex flex-col gap-4">
          {completedTodos.length > 0 ? (
            <Tasks tasks={completedTodos} completed />
          ) : (
            <p>Nothing here yet.</p>
          )}
        </div>
      </Suspense>
    </div>
  );
}
