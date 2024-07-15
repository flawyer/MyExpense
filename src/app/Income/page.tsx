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
        debugger;
        const incomeSourceResponse = await axios.get('https://expenseincomeapi.onrender.com/api/IncomeSource');
        setIncomeSources(incomeSourceResponse.data);

        const incomeFormResponse = await axios.get('https://expenseincomeapi.onrender.com/api/IncomeForm');
        setIncomeForms(incomeFormResponse.data);
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
       await axios.post('https://expenseincomeapi.onrender.com/api/Income', {
        incomeSourceId: selectedSource,
        incomeFormId: selectedForm,
        incomeAmount: parseFloat(incomeAmount),
        incomeDate: new Date(incomeDate)
      });
      setSelectedSource("");
    setSelectedForm("");
    setIncomeAmount("");
    setIncomeDate("");
      alert('Income added successfully');
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
            <CardTitle>Add Income</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="incomeSource">Income Source</Label>
                  <Select onValueChange={(value: string) => setSelectedSource(value)}>
                    <SelectTrigger id="incomeSource">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {incomeSources.map((source) => (
                        <SelectItem key={source._id} value={source._id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="incomeForm">Income Form</Label>
                  <Select onValueChange={(value: string) => setSelectedForm(value)}>
                    <SelectTrigger id="incomeForm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {incomeForms.map((form) => (
                        <SelectItem key={form._id} value={form._id}>
                          {form.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="incomeAmount">Income Amount</Label>
                  <Input
                    id="incomeAmount"
                    value={incomeAmount}
                    onChange={(e) => setIncomeAmount(e.target.value)}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="incomeDate">Income Date</Label>
                  <Input
                    type="date"
                    id="incomeDate"
                    value={incomeDate}
                    onChange={(e) => setIncomeDate(e.target.value)}
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
