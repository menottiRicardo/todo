import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import InviteUserForm from './invite-user-form';
import { getUsers } from '@/actions/users';

export default async function InviteUser({ listId }: { listId: string }) {
  const session = await auth();

  if (!session?.user) return redirect('api/auth/signin');

  const userId = session.user.id;

  const [users, error] = await getUsers(userId as string);
  if (error)
    return <div>Something went wrong while fetching users, cause:{error}</div>;

  return <InviteUserForm userId={userId} listId={listId} users={users} />;
}
