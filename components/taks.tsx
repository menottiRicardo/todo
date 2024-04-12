'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from './ui/badge';

export function Task() {
  return (
    <div className="">
      <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
        <Checkbox checked={true} onCheckedChange={() => console.log('here')} />
        <div className="space-y-2 leading-none">
          <div className='flex items-center gap-2'>
            <span>Use different settings for my mobile devices</span>
            <Badge variant='outline'>#List name</Badge>
          </div>
          <p className="text-light text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            odio asperiores recusandae voluptates repellat, sapiente
            consequuntur numquam obcaecati reprehenderit illo ducimus. Quia non
            ullam excepturi quis maiores, earum quaerat et?
          </p>
        </div>
      </div>
    </div>
  );
}
