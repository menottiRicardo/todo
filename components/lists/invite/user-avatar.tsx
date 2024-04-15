import { User } from '@/actions/users/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { X } from 'lucide-react';
import React, { useMemo } from 'react';

export default function UserAvatar({
  user,
  handleRemove,
}: {
  user: User;
  handleRemove: (user: User) => void;
}) {
  const avatarFallback = useMemo(() => {
    const [firstName, lastName] = user.name?.split(' ') || [];
    return `${firstName?.[0] || ''} ${lastName?.[0] || ''}`;
  }, [user?.name]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar>
            <AvatarImage
              src={user.image ? user.image : ''}
              alt={user.name ?? 'user avatar'}
            />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent >
          <button onClick={() => handleRemove(user)} className='hover:opacity-60'>
            <X className="w-4" />
          </button>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
