"use client";
import NavBar from "@/components/Navbar/navbar";
import { IncomeSource, columns } from "./column";
import { DataTable } from "./data-table";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

// Function to get data
async function getData(): Promise<IncomeSource[]> {
  try {
    const response = await axios.get('https://expenseincomeapi.onrender.com/api/IncomeSource');
    return response.data.map((item: IncomeSource, index: number) => ({
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
  const [data, setData] = useState<IncomeSource[]>([]);
  const [formData, setFormData] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setData(data);
    }
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('https://expenseincomeapi.onrender.com/api/IncomeSource', { name: formData });
      alert('Form submitted successfully!');
      const updatedData = await getData();
      setData(updatedData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

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
        <div className="w-full md:w-3/4 bg-gray-200">
          <form className="w-23 p-3" onSubmit={handleSubmit}>
            <Label htmlFor="incomeSource">Income Source</Label>
            <Input
              type="text"
              id="incomeSource"
              value={formData}
              onChange={(e) => setFormData(e.target.value)}
            />
            <Button type="submit" className="mt-4">Save</Button>
          </form>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
