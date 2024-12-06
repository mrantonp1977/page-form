import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { Loader, SaveIcon } from 'lucide-react'
import useDesigner from './hooks/useDesigner'
import { UpdateFormContent } from '@/actions/form';
import { useToast } from '@/hooks/use-toast';

function SaveFormBtn({ id }: { id: number }) {
  const { toast } = useToast();
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElements);
      toast({
        title: 'Form saved successfully',
        variant: 'default',
      });
    } catch {
      toast({
        title: 'Failed to save form',
        variant: 'destructive',
      });
    }  
  };


  return (
    <Button variant={'outline'} className="gap-2" disabled={loading} onClick={() => {
      startTransition(updateFormContent);
    }}>
      <SaveIcon className="h-4 w-4"/>
        Save
      {loading && <Loader className="h-4 w-4 animate-spin" />}
    </Button>
  )
}

export default SaveFormBtn