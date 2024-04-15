'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from './ui/badge';
import { List } from '@/actions/lists';
import { completeTask } from '@/actions/todos/mark-completed';
import { useState } from 'react';

export function Task({
  name,
  list,
  description,
  id,
  completed = false
}: {
  name: string;
  list: List;
  description?: string;
  id: string;
  completed?: boolean;
}) {

  const [isCompleted, setIsCompleted] = useState(completed)
  return (
    <div className="">
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox checked={isCompleted} onCheckedChange={() => completeTask(id)} />
        <div className="space-y-2 leading-none">
          <span>{name}</span>

          {description && (
            <p className="text-light text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
              odio asperiores recusandae voluptates repellat, sapiente
              consequuntur numquam obcaecati reprehenderit illo ducimus. Quia
              non ullam excepturi quis maiores, earum quaerat et?
            </p>
          )}

          <Badge variant="outline">#{list.title}</Badge>
        </div>
      </div>
    </div>
  );
}
