import React, { useTransition } from 'react';
import { Button } from './ui/button';
import { BookCheck, Loader } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { PublishForm } from '@/actions/form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function PublishFormBtn({ id }: { id: number }) {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast()

  async function publishForm() {
    try {
      await PublishForm(id)
      toast({ title: 'Form published successfully', variant: 'default' });
      router.refresh();
    } catch  {
      toast({ title: 'Failed to publish form', variant: 'destructive' });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-violet-600 to bg-cyan-600">
          <BookCheck className="size-4" />
          Publish
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to publish this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once you publish this form, it will be live and accessible to anyone
            with the link.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={loading} onClick={(e) => {
            e.preventDefault();
            startTransition(publishForm)
          }}>
            Publish
            {loading && <Loader className="size-4 animate-spin ml-2" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
