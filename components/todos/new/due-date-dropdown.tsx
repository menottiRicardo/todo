'use client';
import { Calendar as CalendarIcon, CalendarPlus, Sun } from 'lucide-react';

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
import { formatDate } from 'date-fns';

export default function DueDateDropdown({
  setDueDate,
  dueDate,
}: {
  setDueDate: (date: Date) => void;
  dueDate: Date | undefined;
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
      <DropdownMenuTrigger asChild className="w-24">
        <Button variant="outline" size="sm">
          {dueDate ? formatDate(dueDate, 'ddd MMM D') : 'Due date'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={handleCalendarSelect}
          className="rounded-md border"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
