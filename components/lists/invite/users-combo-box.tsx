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
import { User } from '@/actions/users/types';

export default function UsersComboBox({
  users,
  handleSelect,
}: {
  users: User[];
  handleSelect: (user: User) => void;
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) =>
          user.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          size="sm"
        >
          Select a user...
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search list..."
            value={searchTerm}
            onValueChange={handleSearch}
          />
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandGroup>
            {filteredUsers?.map((user) => (
              <CommandItem
                key={user.id}
                value={user.id}
                onSelect={(currentValue) => {
                  const selectedUser = users.find(
                    (user) => user.id === currentValue
                  );
                  if (selectedUser) {
                    handleSelect(selectedUser);
                    setOpen(false);
                  }
                }}
              >
                {user.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
