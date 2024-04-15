import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import NewListForm from './new-list-form';

export default async function NewList() {
  const session = await auth();

  if (!session?.user) return redirect('api/auth/signin');

  const userId = session.user.id;

  return <NewListForm userId={userId} />;
}
