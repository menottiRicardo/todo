import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import {
  ListTodo,
  Menu,
} from 'lucide-react';
import Link from 'next/link';
import { NAV_ITEMS, PAGE_TITLE } from './constants';
import Icon from '../ui/icon';
import ThemeToggle from '../theme-toggle';

export default function MobileNavigation() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <ListTodo className="h-6 w-6" />
              <span>{PAGE_TITLE}</span>
            </Link>

            {NAV_ITEMS.map((item) => (
              <Link
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Icon
                  name={item.icon}
                  className="h-5 w-5"
                />
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
