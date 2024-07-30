"use client"

import { ColumnDef } from "@tanstack/react-table"

export type Income = {
  _id: string
  sn?: number 
  expenseAmount: number
  expenseFormName: string
  expenseSourceName: string
  expenseDate: string
}

// Define the columns for the table
export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "sn",
    header: "SN",
  },
  {
    accessorKey: "expenseFormName",
    header: "Expense Form",
  },
  {
    accessorKey: "expenseSourceName",
    header: "Expense Source",
  },
  {
    accessorKey: "expenseAmount",
    header: "Amount",
    cell: info => `${info.getValue()}`
  },
  {
    accessorKey: "expenseDate",
    header: "Date",
    cell: info => new Date(info.getValue() as string).toLocaleDateString()
  },
]
