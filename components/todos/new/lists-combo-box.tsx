'use client';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { List } from '@/actions/lists/types';

export default function ListsComboBox({
  lists,
  setSelectedListId,
  selectedListId,
}: {
  lists: List[];
  setSelectedListId: (listId: string) => void;
  selectedListId: string | undefined;
}) {
  const [open, setOpen] = useState(false);

  const selectedList = lists?.find((list) => list.id === selectedListId);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full sm:w-[200px] justify-between"
          size="sm"
        >
          {selectedList ? selectedList.title : 'Select a list...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search list..." />
          <CommandEmpty>No list found.</CommandEmpty>
          <CommandGroup>
            {lists?.map((list) => (
              <CommandItem
                key={list.id}
                value={list.id}
                onSelect={(currentValue) => {
                  setSelectedListId(currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    selectedList?.id === list.id ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {list.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
