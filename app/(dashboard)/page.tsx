import { GetFormStats } from '@/actions/form';
import CreateFormBtn from '@/components/CreateFormBtn';
import StatsCards from '@/components/StatsCards';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="w-full h-full pt-4">
      <Suspense fallback={<StatsCards loading={true} />}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-3xl font-bold col-span-2 ml-6">Your Forms</h2>
      <Separator className="my-6" />
      <CreateFormBtn />
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}
