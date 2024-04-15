import { getTodos } from '@/actions/todos/find-all';
import { Task } from '@/components/task';
import Tasks from '@/components/tasks';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { getTimeOfDay } from '@/lib/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';


export default async function Home() {
  const session = await auth();

  // user will never reach due to authorized but still
  // Reference: lib/auth.js#authorized
  if (!session?.user) return redirect('api/auth/signin');

  const user = session.user;
  const timeOfDay = getTimeOfDay();
  const todayDate = dayjs().format('ddd D MMMM YYYY');

  const [{ today, tomorrow }, error] = await getTodos(user.id as string, dayjs());

  // console.log(today, tomorrow);
  if (error) {
    return (
      <div>
        Something went wrong while fetching the todos, please refresh the page
        or <span className="underline cursor-pointer">contact support</span>
      </div>
    );
  }
  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid-auto-rows-max gap-4 md:col-span-2 lg:col-span-2 xl:col-span-2">
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
              Today, {todayDate}
            </h3>
          </div>
          <div id="header-action">
            <Link href="/todos/new" aria-label="Create a new task">
              <Button>New</Button>
            </Link>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <div id="tasks-container" className="mt-10 flex flex-col gap-4">
            {today.length > 0 ? (
              <Tasks tasks={today} />
            ) : (
              <p>Congrats!, there s nothing more to do.</p>
            )}
          </div>
        </Suspense>
      </div>
      <div>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                Todos for tomorrow
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              {tomorrow.length > 0 ? (
                tomorrow.map((todo) => (
                  <Task
                    key={todo.todo.id}
                    name={todo.todo.name}
                    list={todo.list}
                    id={todo.todo.id}
                    preview
                  />
                ))
              ) : (
                <p>There{"'"}s nothing for tomorrow.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
