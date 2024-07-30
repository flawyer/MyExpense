"use client"

import { ColumnDef } from "@tanstack/react-table"

// Define the shape of the income data
export type Income = {
  _id: string
  sn?: number // Adding optional sn field
  incomeAmount: number
  incomeFormName: string
  incomeSourceName: string
  incomeDate: string
}

// Define the columns for the table
export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "sn",
    header: "SN",
  },
  {
    accessorKey: "incomeFormName",
    header: "Income Form",
  },
  {
    accessorKey: "incomeSourceName",
    header: "Income Source",
  },
  {
    accessorKey: "incomeAmount",
    header: "Amount",
    cell: info => `${info.getValue()}`
  },
  {
    accessorKey: "incomeDate",
    header: "Date",
    cell: info => new Date(info.getValue() as string).toLocaleDateString()
  },
]
