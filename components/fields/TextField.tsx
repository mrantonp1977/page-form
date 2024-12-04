"use client";

import { Type } from "lucide-react";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "This is a text field",
      placeholder: "Enter text here",
      required: false
    }
  }),
  designerBtnElement: {
    icon: () => <span><Type /></span>,
    label: "Text Field"
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Properties component</div>
}