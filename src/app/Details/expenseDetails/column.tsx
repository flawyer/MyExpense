"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Expense = {
  _id: string
  expenseAmount: number
  expenseType : string
  expenseForm : string
  expenseDate : string
}

export const columns: ColumnDef<Expense>[] = [
  {
    accessorKey: "expenseForm",
    header: "Expense Form",
  },
  {
    accessorKey: "expenseSource",
    header: "Expense Source",
  },
  {
    accessorKey: "expenseAmount",
    header: "Amount",
  },
  {
    accessorKey: "incomeDate",
    header: "Date",
  },

]
