"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExpenseType = {
  _id: string
  name: string
  description: string
  sn?: number;
}

export const columns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: "sn",
    header: "SN",
  },
  {
    accessorKey: "name",
    header: "Name",
  }
]
