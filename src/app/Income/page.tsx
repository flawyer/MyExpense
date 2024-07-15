"use client";
import * as React from "react";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";
import NavBar from "@/components/Navbar/navbar";

interface IncomeSource {
  _id: string;
  name: string;
}

interface IncomeForm {
  _id: string;
  name: string;
}

export default function Income() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([]);
  const [incomeForms, setIncomeForms] = useState<IncomeForm[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [incomeAmount, setIncomeAmount] = useState<string>("");
  const [incomeDate, setIncomeDate] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeSourceResponse = await axios.get(
          process.env.NEXT_PUBLIC_API + "api/IncomeSource"
        );
        setIncomeSources(incomeSourceResponse.data);

        const incomeFormResponse = await axios.get(
          process.env.NEXT_PUBLIC_API + "api/IncomeForm"
        );
        setIncomeForms(incomeFormResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setIncomeDate(today);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.post(process.env.NEXT_PUBLIC_API + "api/Income", {
        incomeSourceId: selectedSource,
        incomeFormId: selectedForm,
        incomeAmount: parseFloat(incomeAmount),
        incomeDate: new Date(incomeDate),
      });
      setSelectedSource("");
      setSelectedForm("");
      setIncomeAmount("");
      setIncomeDate("");
      alert("Income added successfully");
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
          <h1 className="text-2xl font-bold mb-6 text-center">Add Income</h1>
          <div className="grid gap-4">
            <div className="flex flex-col">
              <label htmlFor="incomeSource" className="mb-2 font-semibold">Income Source</label>
              <select
                id="incomeSource"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="" disabled>Select</option>
                {incomeSources.map((source) => (
                  <option key={source._id} value={source._id}>
                    {source.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="incomeForm" className="mb-2 font-semibold">Income Form</label>
              <select
                id="incomeForm"
                value={selectedForm}
                onChange={(e) => setSelectedForm(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="" disabled>Select</option>
                {incomeForms.map((form) => (
                  <option key={form._id} value={form._id}>
                    {form.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="incomeAmount" className="mb-2 font-semibold">Income Amount</label>
              <input
                id="incomeAmount"
                type="number"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
                className="p-2 border rounded"
                placeholder="Enter amount"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="incomeDate" className="mb-2 font-semibold">Income Date</label>
              <input
                type="date"
                id="incomeDate"
                value={incomeDate}
                onChange={(e) => setIncomeDate(e.target.value)}
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
