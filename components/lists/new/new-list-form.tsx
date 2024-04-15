'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { insertListSchema } from '@/lib/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import useFormErrors from '@/hooks/useFormErrors';
import { createList } from '@/actions/lists/create';

export interface FormData extends z.infer<typeof insertListSchema> {
  dueDate: Date | undefined;
}
export default function NewListForm({
  userId,
}: {
  userId: string | undefined;
}) {
  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(insertListSchema),
    defaultValues: {
      title: '',
      userId,
    },
  });

  const errors = useFormErrors<FormData>(form.formState.errors);

  const onSubmit = async (values: z.infer<typeof insertListSchema>) => {
    const [_, error] = await createList(values);
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  {...field}
                  placeholder="List title"
                  autoComplete="off"
                  className="text-xl font-medium w-full bg-transparent outline-none border-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex-col sm:flex-row flex gap-4 mt-4 justify-end">
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
