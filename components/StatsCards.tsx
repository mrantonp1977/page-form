import { GetFormStats } from '@/actions/form'
import { EyeIcon, MousePointerClick, Waypoints, WrapText } from 'lucide-react'
import React from 'react'
import StatsCard from './StatsCard'


interface StatsCardProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>
  loading: boolean
};

const StatsCards = ({ data, loading }: StatsCardProps) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-8">
      <StatsCard 
        title="Total Visits"
        icon={<EyeIcon className="text-blue-600 size-6"/>}
        helperText="Total number of visits"
        value={data?.visits.toLocaleString() || ''}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard 
        title="Total Submissions"
        icon={<WrapText className="text-yellow-600 size-6"/>}
        helperText="Total number of submissions"
        value={data?.submissions.toLocaleString() || ''}
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard 
        title="Submissions Rate"
        icon={<MousePointerClick className="text-green-600 size-6"/>}
        helperText="Visits that result in form submission"
        value={data?.submissionRate.toLocaleString() + "%" || ''}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard 
        title="Bounce Rate"
        icon={<Waypoints className="text-red-600 size-6"/>}
        helperText="Visits that leaves without interacting"
        value={data?.submissionRate.toLocaleString() + "%" || ''}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  )
}

export default StatsCards