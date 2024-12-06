import { GetFormById } from '@/actions/form';
import FormLinkShare from '@/components/FormLinkShare';
import StatsCard from '@/components/StatsCard';
import VisitBtn from '@/components/VisitBtn';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { EyeIcon, MousePointerClick, Waypoints, WrapText } from 'lucide-react';
import React from 'react';



async function FormDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const form = await GetFormById(Number(id));
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  if (!form) {
    return <div>Form not found</div>;
  }

  const stats = prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = (await stats)._sum.visits || 0;
  const submissions = (await stats)._sum.submissions || 0;

  const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;

  // const bounceRate = 100 - submissionRate;

  return (
    <>
      <div className="py-10 border-t border-b border-muted ml-4 mr-4">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted ml-4 mr-4">
        <div className="flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-8">
        <StatsCard
          title="Total Visits"
          icon={<EyeIcon className="text-blue-600 size-6" />}
          helperText="Total number of visits"
          value={visits.toLocaleString() || ''}
          loading={false}
          className="shadow-lg shadow-blue-600"
        />
        <StatsCard
          title="Total Submissions"
          icon={<WrapText className="text-yellow-600 size-6" />}
          helperText="Total number of submissions"
          value={submissions.toLocaleString() || ''}
          loading={false}
          className="shadow-lg shadow-yellow-600"
        />
        <StatsCard
          title="Submissions Rate"
          icon={<MousePointerClick className="text-green-600 size-6" />}
          helperText="Visits that result in form submission"
          value={submissionRate.toLocaleString() + '%' || ''}
          loading={false}
          className="shadow-lg shadow-green-600"
        />
        <StatsCard
          title="Bounce Rate"
          icon={<Waypoints className="text-red-600 size-6" />}
          helperText="Visits that leaves without interacting"
          value={submissionRate.toLocaleString() + '%' || ''}
          loading={false}
          className="shadow-lg shadow-red-600"
        />
      </div>
      <div className="pt-10 mr-4 ml-4">
        <SubmissionsTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;

function SubmissionsTable({ id }: { id: number }) {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">
        Submissions for Form #{id}
      </h1>
    </>
  )
}
