"use client"

import NavBar from "@/components/Navbar/navbar";
import { IncomeForm, columns } from "./column";
import { DataTable } from "./data-table";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";

// Function to get data
async function getData(): Promise<IncomeForm[]> {
  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_API+'api/IncomeForm');
    return response.data.map((item: IncomeForm, index: number) => ({
      ...item,
      sn: index + 1,
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Error fetching data. Please try again.');
    return [];
  }
}

export default function DemoPage() {
  const [data, setData] = useState<IncomeForm[]>([]);
  const [formData, setFormData] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData();
    setData(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_API +'api/IncomeForm', { name: formData });
      alert('Form submitted successfully!');
      setFormData('');
      fetchData(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      var x = confirm('Are you Sure?')
      if(x=== true){
      await axios.delete(process.env.NEXT_PUBLIC_API+`api/IncomeForm/${id}`);
      alert("Deleted successfully!");
      fetchData(); 
    }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item. Please try again.');
    }
  };

  const actionColumn: ColumnDef<IncomeForm> = {
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

  const tableColumns = [...columns, actionColumn];

  return (
    <>
      <NavBar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/4 bg-gray-800">
          <div className="h-full flex flex-col justify-center">
            <Link href="/Settings/IncomeSource">
              <p className="text-white py-2 px-4 block hover:bg-gray-700">Income Source</p>
            </Link>
            <Link href="/Settings/IncomeForm">
              <p className="text-white py-2 px-4 block hover:bg-gray-700">Income Form</p>
            </Link>
            <Link href="/Settings/ExpenseForm">
              <p className="text-white py-2 px-4 block hover:bg-gray-700">Expense Form</p>
            </Link>
            <Link href="/Settings/ExpenseTitle">
              <p className="text-white py-2 px-4 block hover:bg-gray-700">Expense Title</p>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-3/4 bg-gray-200 p-6">
          <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Add New Income Form</h2>
            <div className="mb-4">
              <label htmlFor="incomeForm" className="block text-gray-700 mb-2">Income Form</label>
              <input
                type="text"
                id="incomeForm"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Save
            </button>
          </form>
          <div className="container mx-auto py-10">
            <DataTable columns={tableColumns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
