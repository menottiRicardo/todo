'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '../ui/badge';
import { completeTask } from '@/actions/todos/mark-completed';
import { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { List } from '@/actions/lists/types';
import { unCompleteTask } from '@/actions/todos/unmark-completed';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import TooltipWrapper from '../ui/tooltip-wrapper';
import { Repeat } from 'lucide-react';

export function Task({
  name,
  list,
  description,
  id,
  completed = false,
  preview = false,
  completionDate,
  isRecurring,
}: {
  name: string;
  list: List;
  description?: string | null;
  id: string;
  completed?: boolean;
  preview?: boolean;
  completionDate?: Date;
  isRecurring: boolean | null;
}) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isExploding, setIsExploding] = useState(false);
  const { width, height } = useWindowSize();

  const router = useRouter();

  if (preview) {
    return (
      <div className="flex flex-row items-start border-b gap-4 pb-2 last:border-b-0">
        <span>{name}</span>
        <Badge variant="outline">#{list.title}</Badge>
      </div>
    );
  }

  const isTaskCompleted = completed && completionDate;

  const handleTaskCompletion = async (id: string) => {
    if (isTaskCompleted) {
      await unCompleteTask(id, completionDate);
      return;
    }
    setIsCompleted(true);
    setIsExploding(true);
    setTimeout(async () => await completeTask(id), 1000);
  };

  const handleNavigation = () => {
    if (isTaskCompleted) return null;
    router.push(`/todos/edit/${id}`);
  };
  return (
    <>
      <div className="fixed z-[-10] top-0 w-full h-full">
        {isExploding && <Confetti width={width} height={height} />}
      </div>
      <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => handleTaskCompletion(id)}
        />
        <div
          className={cn({ 'cursor-pointer': !isTaskCompleted }, 'leading-none')}
          onClick={handleNavigation}
        >
          <span className="mb-2 mr-2">{name}</span>

          {description && (
            <p className="text-light text-secondary py-2">{description}</p>
          )}

          <div className="flex gap-2 mt-2">
            <Badge variant="outline">#{list.title}</Badge>
            {isRecurring && (
              <Badge variant="outline">
                <Repeat className="w-3 h-3 mr-2" />
                recurrent
              </Badge>
            )}
            {isTaskCompleted && (
              <Badge variant="default">
                Completed {new Date(completionDate).toLocaleDateString()}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
