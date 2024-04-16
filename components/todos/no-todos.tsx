'use client'
import { useToast } from '../ui/use-toast';
import seedDB from '@/actions/todos/seed-db';

export default function NoTodos({ userId }: { userId: string }) {
  const { toast } = useToast();
  const handleSeedDb = async () => {
    toast({
        title: 'Seeding DB',
        description: 'Please wait...',
      });
    const [_, error] = await seedDB(userId);
   
    if (error) {
      toast({
        title: 'Error seeding DB',
        description: 'Db already seeded',
      });
    }
  };
  return (
    <p>
      Congrats!, there s nothing more to do. of if you are new to here{' '}
      <strong className="font-bold cursor-pointer hover:underline" onClick={handleSeedDb}>
        SEED DB
      </strong>
    </p>
  );
}
