import InviteUser from '@/components/lists/invite';
import React from 'react';

function InvitePage({ params }: { params: { id: string } }) {
  return <InviteUser listId={params.id} />;
}

export default InvitePage;
