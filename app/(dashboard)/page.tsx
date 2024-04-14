import { Task } from '@/components/taks';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getTimeOfDay } from '@/lib/utils';
import dayjs from 'dayjs';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  // user will never reach due to authorized but still
  // Reference: lib/auth.js#authorized
  if (!session) return redirect('api/auth/signin');

  const user = session.user;
  const timeOfDay = getTimeOfDay();
  const today = dayjs().format('ddd D MMMM YYYY');

  return (
    <div>
      <div id="header-container" className="flex justify-between items-center max-w-screen-2xl" role="banner">
        <div id="header-text">
          <h1 className="font-medium text-xl">
            Good {timeOfDay}, {user?.name}!
          </h1>
          <h3 className="font-light text-secondary py-2">Today, {today}</h3>
        </div>
        <div id="header-action">
          <Link href="/todo/new" aria-label='Create a new task'>
            <Button >New</Button>
          </Link>
        </div>
      </div>
      <div id="tasks-container" className="mt-10 flex flex-col gap-4">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  );
}
