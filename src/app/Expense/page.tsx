"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import NavBar from "@/components/Navbar/navbar";

interface ExpenseSource {
  _id: string;
  name: string;
}

interface ExpenseForm {
  _id: string;
  name: string;
}

export default function Expense() {
  const [expenseSources, setExpenseSources] = useState<ExpenseSource[]>([]);
  const [expenseForms, setExpenseForms] = useState<ExpenseForm[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [expenseAmount, setExpenseAmount] = useState<string>("");
  const [expenseDate, setExpenseDate] = useState<string>("");
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setExpenseDate(today);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const expenseSourceResponse = await axios.get(process.env.NEXT_PUBLIC_API + "api/ExpenseType");
        setExpenseSources(expenseSourceResponse.data);

        const expenseFormResponse = await axios.get(process.env.NEXT_PUBLIC_API +"api/ExpenseForm");
        setExpenseForms(expenseFormResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_API +"api/Expense", {
        expenseTypeId: selectedSource,
        expenseFormId: selectedForm,
        expenseAmount: parseFloat(expenseAmount),
        expenseDate: new Date(expenseDate),
      });
      setSelectedSource("");
      setSelectedForm("");
      setExpenseAmount("");
      setExpenseDate("");
      alert("Expense added successfully");
    } catch (error) {
      console.error("Error posting data:", error);
      alert("Error posting data. Please try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Add Expense</h1>
          <div className="grid gap-4">
            <div className="flex flex-col">
              <label htmlFor="expenseSource" className="mb-2 font-semibold">Expense Source</label>
              <select
                id="expenseSource"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="" disabled>Select</option>
                {expenseSources.map((source) => (
                  <option key={source._id} value={source._id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="expenseForm" className="mb-2 font-semibold">Expense Form</label>
              <select
                id="expenseForm"
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="" disabled>Select</option>
                {expenseForms.map((form) => (
                  <option key={form._id} value={form._id}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="expenseAmount" className="mb-2 font-semibold">Expense Amount</label>
              <input
                id="expenseAmount"
                type="number"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="p-2 border rounded"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="expenseDate" className="mb-2 font-semibold">Expense Date</label>
              <input
                type="date"
                id="expenseDate"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="p-2 border rounded"
              />
            </div>
            <button type="submit" className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
