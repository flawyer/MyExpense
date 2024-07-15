"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type IncomeForm = {
  id: string
  name: string
  description: string
  sn?: number;
}

export const columns: ColumnDef<IncomeForm>[] = [
  {
    accessorKey: "sn",
    header: "SN",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  }
]
