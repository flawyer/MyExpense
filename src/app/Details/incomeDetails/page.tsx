"use client"

import NavBar from "@/components/Navbar/navbar";
import { Income, columns } from "./column";
import { DataTable } from "./data-table";
import Link from "next/link";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table"; // Ensure this import is correct

async function getData(): Promise<Income[]> {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API + 'api/Income');
    return response.data.map((item: any, index: number) => ({
      ...item,
      incomeAmount: parseFloat(item.incomeAmount.$numberDecimal),
      sn: index + 1,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

const handleDelete = async (id: string) => {
  try {
    const confirmed = confirm('Are you sure?');
    if (confirmed) {
      await axios.delete(process.env.NEXT_PUBLIC_API + `api/Income/${id}`);
      alert("Deleted successfully!");
      window.location.reload(); // Refresh the page after deletion
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    alert('Error deleting item. Please try again.');
  }
};

const actionColumn: ColumnDef<Income> = { // Ensure the type matches with your data structure
  accessorKey: "action",
  header: "Action",
  cell: ({ row }) => (
    <button
      onClick={() => handleDelete(row.original._id)}
      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
    >
      Delete
    </button>
  ),
};

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/4 bg-gray-800">
          <div className="h-full flex flex-col justify-center">
            <Link href="/Details/incomeDetails">
              <p className="text-white py-2 px-4 block hover:bg-gray-700">Income Detail</p>
            </Link>
            <Link href="/Details/expenseDetails">
              <p className="text-white py-2 px-4 block hover:bg-gray-700">Expense Detail</p>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-3/4 bg-gray-200">
          <div className="container mx-auto py-10">
            <DataTable columns={[...columns, actionColumn]} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
