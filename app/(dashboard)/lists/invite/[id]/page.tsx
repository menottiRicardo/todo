import InviteUser from '@/components/lists/invite';
import React from 'react';

export default function InviteToListPage({
  params,
}: {
  params: { id: string };
}) {
  return <InviteUser listId={params.id} />
}
