import { GetFormStats } from '@/actions/form';
import CreateFormBtn from '@/components/CreateFormBtn';
import FormCards from '@/components/FormCards';
import FormCardSkeleton from '@/components/FormCardSkeleton';
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-4 mr-4">
        <CreateFormBtn />
        <Suspense fallback={[1,2,3,4].map((el) => <FormCardSkeleton key={el}/>)}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  );
}

async function CardStatsWrapper() {
  const stats = await GetFormStats();

  return <StatsCards loading={false} data={stats} />;
}
