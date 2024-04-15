'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from './ui/badge';
import { List } from '@/actions/lists';
import { completeTask } from '@/actions/todos/mark-completed';
import { useState } from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export function Task({
  name,
  list,
  description,
  id,
  completed = false,
  preview = false,
}: {
  name: string;
  list: List;
  description?: string;
  id: string;
  completed?: boolean;
  preview?: boolean;
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

  const handleTaskCompletion = (id: string) => {
    setIsCompleted(true);
    setIsExploding(true);
    setTimeout(() => completeTask(id), 1000);
  };
  return (
    <>
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={() => handleTaskCompletion(id)}
        />
        <div className="leading-none gap-2">
          <span className='mb-2 mr-2'>{name}</span>

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
