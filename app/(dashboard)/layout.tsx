import Link from 'next/link';
import { Hash, ListPlus, ListTodo, Share2 } from 'lucide-react';

import MobileNavigation from '@/components/sidebar/mobile';
import { NAV_ITEMS, PAGE_TITLE } from '@/components/sidebar/constants';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/theme-toggle';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getUserLists } from '@/actions/lists';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge';

export default async function DashboardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await auth();

  // user will never reach due to authorized but still
  // Reference: lib/auth.js#authorized
  if (!session?.user) return redirect('api/auth/signin');

  const user = session.user;

  const [lists, error] = await getUserLists(user.id as string);

  if (error) {
    return null;
  }
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <ListTodo className="h-6 w-6" />
              <span className="">{PAGE_TITLE}</span>
            </Link>
            <ThemeToggle />
          </div>
          <div className="flex-1 border-b">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  href={item.href}
                  key={item.title}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}

              <div className="flex text-base justify-between items-center mt-4 mb-2 text-secondary/80">
                <span>My Lists</span>
                <Link
                  href={'/lists/new'}
                  className="cursor-pointer hover:text-primary ease-out duration-150"
                >
                  <ListPlus />
                </Link>
              </div>
              <Suspense fallback={<div>Loading...</div>}>
                {lists.map((list) => (
                  <div
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary group"
                    key={list.id}
                  >
                    <Link
                      href={`lists/${list.id}`}
                      className="flex items-center gap-3"
                    >
                      <Hash className="h-4 w-4" />
                      {list.title}
                      {list.ownerId !== user?.id && (
                        <Badge
                          className="text-xs"
                          variant="secondary"
                        >
                          Shared
                        </Badge>
                      )}
                    </Link>
                    <div className="hidden group-hover:inline">
                      <Link
                        href={`/lists/invite/${list.id}`}
                        className="flex items-center gap-3"
                      >
                        <Share2 className="h-4 w-4 cursor-pointer" />
                      </Link>
                    </div>
                  </div>
                ))}
              </Suspense>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <MobileNavigation />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
          {modal}
        </main>
      </div>
    </div>
  );
}
