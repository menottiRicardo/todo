'use client'
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
export default function Modal({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent className="sm:max-w-md">
        {children}
      </DialogContent>
    </Dialog>
  );
}
