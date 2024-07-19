"use client"

import { ColumnDef } from "@tanstack/react-table"


export type ExpenseForm = {
  _id: string
  name: string
  description: string
  sn?: number;
}

export const columns: ColumnDef<ExpenseForm>[] = [
  {
    accessorKey: "sn",
    header: "SN",
  },
  {
    accessorKey: "name",
    header: "Name",
  }
]
