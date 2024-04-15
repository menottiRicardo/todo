'use client';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import useFormErrors from '@/hooks/useFormErrors';
import { createList } from '@/actions/lists/create';
import { User } from '@/actions/users/types';
import { useState } from 'react';
import UsersComboBox from './users-combo-box';
import UserAvatar from './user-avatar';
import { inviteToList } from '@/actions/lists';

export interface FormData {
  selectedUsersIds: string[];
}
export default function InviteUserForm({
  userId,
  listId,
  users,
}: {
  userId: string | undefined;
  listId: string;
  users: User[];
}) {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      selectedUsersIds: [],
    },
  });

  const errors = useFormErrors<FormData>(form.formState.errors);

  const onSubmit = async (values: FormData) => {
    const [_, error] = await inviteToList(values.selectedUsersIds, listId);
    if (error) {
      form.setError('root', { message: error });
      return console.error('Error creating todo:', error);
    }
    router.back();
  };
  const handleSelect = (user: User) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
      form.setValue('selectedUsersIds', [
        ...selectedUsers.map((u) => u.id),
        user.id,
      ]);
    }
  };

  const handleRemove = (user: User) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
    form.setValue(
      'selectedUsersIds',
      selectedUsers.filter((u) => u.id !== user.id).map((u) => u.id)
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.error('Form errors:', errors);
        })}
        className="max-w-lg"
      >
        <div className="mb-6">
          {selectedUsers.map((user) => (
            <UserAvatar user={user} key={user.id} handleRemove={handleRemove} />
          ))}
        </div>
        <UsersComboBox users={users} handleSelect={handleSelect} />
        <div className="flex-col sm:flex-row flex gap-4 mt-4 justify-end">
          <Button size="sm" type="submit">
            Invite
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
