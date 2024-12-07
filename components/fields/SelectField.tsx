'use client';

import { Type } from 'lucide-react';
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from '../FormElements';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import useDesigner from '../hooks/useDesigner';
import { Switch } from '../ui/switch';
import { cn } from '@/lib/utils';
import { RxDropdownMenu } from 'react-icons/rx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { toast } from '@/hooks/use-toast';

const type: ElementsType = 'SelectField';

const extraAttributes = {
  label: 'Select Field',
  helperText: 'This is a select field',
  placeholder: 'Enter text here',
  options: [],
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeholder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: () => (
      <>
        <RxDropdownMenu />
      </>
    ),
    label: 'Select Field',
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, helperText, placeholder, required } = element.extraAttributes;
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && '*'}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, placeholder, required, options } =
    element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className={cn(error && 'text-red-500')}>
        {label}
        {required && '*'}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;
          const valid = SelectFieldFormElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn('w-full', error && 'border-red-500')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p
          className={cn(
            'text-muted-foreground text-[0.8rem]',
            error && 'text-red-500'
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement, setSelectedElement } = useDesigner();

  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: 'onSubmit',
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      placeholder: element.extraAttributes.placeholder,
      required: element.extraAttributes.required,
      options: element.extraAttributes.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: values.label,
        helperText: values.helperText,
        placeholder: values.placeholder,
        required: values.required,
        options: values.options,
      },
    });
    toast({
      title: 'Element updated',
      description: 'The element has been updated successfully',
    });

    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit(applyChanges)}
        
      >
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Label</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The label for the text field <br /> It will be displayed above
                the input field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Placeholder</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                The placeholder text for the input field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-lg">Helper text</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.currentTarget.blur();
                  }}
                />
              </FormControl>
              <FormDescription>
                A helper text to guide the user on what to input. <br /> It will
                be displayed below the input field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={'outline'}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue('options', field.value.concat('New option'));
                  }}
                >
                  <AiOutlinePlus /> Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button variant={'ghost'} size={'icon'} onClick={(e) => {
                      e.preventDefault();
                      const newOptions = [...field.value];
                      newOptions.splice(index, 1);
                      field.onChange(newOptions);
                    }}>
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>
                A helper text to guide the user on what to input. <br /> It will
                be displayed below the input field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel className="font-bold text-lg">Required</FormLabel>
                <FormDescription>
                  Whether the field is required or not <br /> If enabled, the
                  user will have to input a value before submitting the form
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <Button className="w-full" type='submit'>
          Save
        </Button>
      </form>
    </Form>
  );
}
