"use client"
import * as React from "react";
import axios from "axios";
import { useState, useEffect, FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NavBar from "@/components/Navbar/navbar";

interface expenseSource {
  _id: string;
  name: string;
}

interface expenseForm {
  _id: string;
  name: string;
}

export default function Expense() {
  const [expenseSources, setexpenseSources] = useState<expenseSource[]>([]);
  const [expenseForms, setexpenseForms] = useState<expenseForm[]>([]);
  const [selectedSource, setSelectedSource] = useState<string>("");
  const [selectedForm, setSelectedForm] = useState<string>("");
  const [expenseAmount, setexpenseAmount] = useState<string>("");
  const [expenseDate, setexpenseDate] = useState<string>("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        debugger;
        const expenseSourceResponse = await axios.get('https://expenseincomeapi.onrender.com/api/ExpenseType');
        setexpenseSources(expenseSourceResponse.data);

        const expenseFormResponse = await axios.get('https://expenseincomeapi.onrender.com/api/ExpenseForm');
        setexpenseForms(expenseFormResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    debugger;
    try {
       await axios.post('https://expenseincomeapi.onrender.com/api/Expense', {
        expenseTypeId: selectedSource,
        expenseFormId: selectedForm,
        expenseAmount: parseFloat(expenseAmount),
        expenseDate: new Date(expenseDate)
      });
      setSelectedSource("");
    setSelectedForm("");
    setexpenseAmount("");
    setexpenseDate("");
      alert('Expense added successfully');
      // Optionally, reset the form or perform other actions
    } catch (error) {
      console.error('Error posting data:', error);
      alert('Error posting data. Please try again.');
    }
  };

  return (
    <>    
      <NavBar />
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Add Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expenseSource">Expense Source</Label>
                  <Select onValueChange={(value: string) => setSelectedSource(value)}>
                    <SelectTrigger id="expenseSource">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {expenseSources.map((source) => (
                        <SelectItem key={source._id} value={source._id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expenseForm">Expense Form</Label>
                  <Select onValueChange={(value: string) => setSelectedForm(value)}>
                    <SelectTrigger id="expenseForm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {expenseForms.map((form) => (
                        <SelectItem key={form._id} value={form._id}>
                          {form.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expenseAmount">Expense Amount</Label>
                  <Input
                    id="expenseAmount"
                    value={expenseAmount}
                    onChange={(e) => setexpenseAmount(e.target.value)}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="expenseDate">Expense Date</Label>
                  <Input
                    type="date"
                    id="expenseDate"
                    value={expenseDate}
                    onChange={(e) => setexpenseDate(e.target.value)}
                    placeholder=""
                  />
                </div>
              <CardFooter className="flex justify-between">
                <Button type="submit">Save</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
