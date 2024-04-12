import Link from 'next/link';
import { ListTodo } from 'lucide-react';

import MobileNavigation from '@/components/navigation/mobile';
import { NAV_ITEMS, PAGE_TITLE } from '@/components/navigation/constants';
import Icon from '@/components/ui/icon';
import ThemeToggle from '@/components/theme-toggle';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <MobileNavigation />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
