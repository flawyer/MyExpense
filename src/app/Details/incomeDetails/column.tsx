"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Income = {
  _id: string
  incomeAmount: number
  incomeForm : string
  incomeSource : string
  incomeDate : string
}

export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "sn",
    header: "SN",
  },
  {
    accessorKey: "incomeForm",
    header: "Income Form",
  },
  {
    accessorKey: "incomeSource",
    header: "Income Source",
  },
  {
    accessorKey: "incomeAmount",
    header: "Amount",
  },
  {
    accessorKey: "incomeDate",
    header: "Date",
  },

]
