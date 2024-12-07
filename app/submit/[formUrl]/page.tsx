import { GetFormContentByUrl } from '@/actions/form'
import { FormElementInstance } from '@/components/FormElements';
import FormSubmitComponent from '@/components/FormSubmitComponent';
import React from 'react'

async function SubmitPage({ params }: { params: { formUrl: string } }) {
  const { formUrl } = await Promise.resolve(params); // Explicitly await `params`
  
  const form = await GetFormContentByUrl(formUrl);

  if (!form) {
    return <div>Form not found</div>
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent  formUrl={formUrl} content={formContent}/>
  )
}

export default SubmitPage
