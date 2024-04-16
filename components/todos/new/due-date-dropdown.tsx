'use client';
import {
  Calendar as CalendarIcon,
  CalendarPlus,
  Repeat,
  Sun,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import useDueDates from '@/hooks/useDueDates';
import { Calendar } from '@/components/ui/calendar';
import { formatDate } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DueDateDropdown({
  setDueDate,
  dueDate,
  setRecurrent,
  isRecurring,
}: {
  setDueDate: (date: Date) => void;
  dueDate: Date | undefined;
  setRecurrent: () => void;
  isRecurring: boolean;
}) {
  const [open, setIsOpen] = useState(false);

  const { today, tomorrow, nextWeek, setToday, setTomorrow, setNextWeek } =
    useDueDates(setDueDate);

  const handleCalendarSelect = (date: Date | undefined) => {
    if (!date) return;
    setDueDate(date);
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild className="w-full sm:w-24">
        <Button variant="outline" size="sm" className="flex justify-start">
          {isRecurring
            ? 'EV day'
            : dueDate
            ? formatDate(dueDate, 'ddd MMM D')
            : 'Due date'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <ScrollArea className="h-72 px-2">
          <DropdownMenuLabel>Select a Due Date</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={setToday}>
              <CalendarIcon className="mr-2 h-4 w-4 text-green-600" />
              <span>Today</span>
              <DropdownMenuShortcut>{today}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={setTomorrow}>
              <Sun className="mr-2 h-4 w-4 text-yellow-600" />
              <span>Tomorrow</span>
              <DropdownMenuShortcut>{tomorrow}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={setNextWeek}>
              <CalendarPlus className="mr-2 h-4 w-4 text-blue-600" />
              <span>Next week</span>
              <DropdownMenuShortcut>{nextWeek}</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={setRecurrent}>
              <Repeat className="mr-2 h-4 w-4 text-orange-600" />
              <span>Every day</span>
              <DropdownMenuShortcut>EV day</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Calendar
            mode="single"
            selected={dueDate}
            onSelect={handleCalendarSelect}
            className="rounded-md border"
          />
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
