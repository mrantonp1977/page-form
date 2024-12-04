import { Form } from '@prisma/client'
import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { formatDistance } from 'date-fns'
import { ArrowRight, Edit, EyeIcon, WrapText } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

function FormCard({form}: {form: Form}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="font-bold truncate">
            {form.name}
          </span>
          {form.published && (
            <Badge>Published</Badge>
          )}
          {!form.published && (
            <Badge variant={'destructive'}>Draft</Badge>
          )}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground">
          {formatDistance(form.createdAt, new Date(), { addSuffix: true })}
          {form.published && (
            <span className="flex items-center gap-2">
              <EyeIcon className="text-muted-foreground" />
              <span>
                {form.visits.toLocaleString()}
              </span>
              <WrapText className="text-muted-foreground" />
              <span>
                {form.submissions.toLocaleString()}
              </span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-muted-foreground text-sm">
        {form.description || 'No description'}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions
              <ArrowRight className=""/>
            </Link>
          </Button>
        )}
        {!form.published && (
          <Button variant={'secondary'} asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/builder/${form.id}`}>
              Edit form
              <Edit className=""/>
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default FormCard
