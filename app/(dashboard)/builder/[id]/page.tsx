import { GetFormById } from '@/actions/form'
import FormBuilder from '@/components/FormBuilder'
import React from 'react'

async function BuilderPage({ params }: { params: { id: string } }) {
  const form = await GetFormById(Number(params.id))

  if (!form) {
    return <div>Form not found</div>
  }
  return (
    <>
      <FormBuilder form={form}/>
    </>
  )
}

export default BuilderPage
