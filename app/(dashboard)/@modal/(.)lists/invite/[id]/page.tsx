import InviteUser from '@/components/lists/invite';
import Modal from '@/components/ui/modal';

export default function InviteToListModalPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <InviteUser listId={params.id} />
    </Modal>
  );
}
