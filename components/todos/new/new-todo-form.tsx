'use client';
import { useForm } from 'react-hook-form';
import DueDateDropdown from './due-date-dropdown';
import ListsComboBox from './lists-combo-box';
import { z } from 'zod';
import { insertTodoSchema } from '@/lib/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import useFormErrors from '@/hooks/useFormErrors';
import { createTodo } from '@/actions/todos/create';
import { List } from '@/actions/lists/types';

export interface FormData extends z.infer<typeof insertTodoSchema> {
  dueDate: Date | undefined;
}
export default function NewTodoForm({
  lists,
  userId,
}: {
  lists: List[];
  userId: string | undefined;
}) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(insertTodoSchema),
    defaultValues: {
      name: '',
      description: '',
      dueDate: undefined,
      listId: undefined,
    },
  });

  const errors = useFormErrors<FormData>(form.formState.errors);

  const onSubmit = async (values: z.infer<typeof insertTodoSchema>) => {
    const [_, error] = await createTodo(values);
    if (error) {
      form.setError('root', { message: error });
      return console.error('Error creating todo:', error);
    }
    router.back();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error('Form errors:', errors);
        })}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  placeholder="Task Name"
                  autoComplete="off"
                  className="text-xl font-medium w-full bg-transparent outline-none border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  value={field.value ?? ''}
                  autoComplete="off"
                  placeholder="Description"
                  className="w-full font-light bg-transparent outline-none border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex-col sm:flex-row flex gap-4 mt-4">
          <DueDateDropdown
            setDueDate={(date: Date) => form.setValue('dueDate', date)}
            dueDate={form.watch('dueDate')}
          />
          <ListsComboBox
            lists={lists}
            setSelectedListId={(listId: string) =>
              form.setValue('listId', listId)
            }
            selectedListId={form.watch('listId')}
          />
          <Button size="sm" type="submit">
            Create
          </Button>
        </div>
      </form>
      {errors?.map((err) => (
        <p className="text-xs text-red-800" key={err.field}>
          <span className="font-medium uppercase">{err.field} </span>
          {err.message}
        </p>
      ))}
    </Form>
  );
}
