'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from './ui/badge';
import { completeTask } from '@/actions/todos/mark-completed';
import { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { List } from '@/actions/lists/types';
import { unCompleteTask } from '@/actions/todos/unmark-completed';

export function Task({
  name,
  list,
  description,
  id,
  completed = false,
  preview = false,
  completionDate,
}: {
  name: string;
  list: List;
  description?: string | null;
  id: string;
  completed?: boolean;
  preview?: boolean;
  completionDate?: Date;
}) {
  const [isCompleted, setIsCompleted] = useState(completed);
  const [isExploding, setIsExploding] = useState(false);
  const { width, height } = useWindowSize();

  if (preview) {
    return (
      <div className="flex flex-row items-start border-b gap-4 pb-2 last:border-b-0">
        <span>{name}</span>
        <Badge variant="outline">#{list.title}</Badge>
      </div>
    );
  }

  const handleTaskCompletion = async (id: string) => {
    if (completed && completionDate) {
      await unCompleteTask(id, completionDate);
      return;
    }
    setIsCompleted(true);
    setIsExploding(true);
    setTimeout(async () => await completeTask(id), 1000);
  };
  return (
    <>
      <div className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => handleTaskCompletion(id)}
        />
        <div className="leading-none">
          <span className="mb-2 mr-2">{name}</span>

          {description && (
            <p className="text-light text-secondary py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              odio asperiores recusandae voluptates repellat, sapiente
              consequuntur numquam obcaecati reprehenderit illo ducimus. Quia
              non ullam excepturi quis maiores, earum quaerat et?
            </p>
          )}

          <Badge variant="outline">#{list.title}</Badge>
        </div>
      </div>
      {isExploding && <Confetti width={width} height={height} />}
    </>
  );
}
