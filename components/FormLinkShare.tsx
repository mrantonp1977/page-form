'use client';

import React from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function FormLinkShare({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = React.useState(false);
  const toast = useToast();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <div className="flex gap-4 items-center ml-4">
      <Input value={shareLink} readOnly className="w-[500px]"/>
      <Button
        onClick={() => {navigator.clipboard.writeText(shareLink)
          toast.toast({
            title: 'Link copied',
            description: 'The link has been copied to your clipboard',
          })
        }}
      >
        <Share className="size-4" />
        Share Link
      </Button>
    </div>
  );
}

export default FormLinkShare;
