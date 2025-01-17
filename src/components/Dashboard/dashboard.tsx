'use client';

import { useEffect, useState } from 'react';
import { CardForDashboard } from '@/components/DashboardCards/dashboardcard';
import axios, { AxiosResponse } from 'axios';

interface DailyDetails {
    currentDate: string;
    totalIncome: number;
    totalExpense: number;
    dailySaving: number;
}

interface WeeklyDetails {
    weekStartDate: string;
    weekEndDate: string;
    totalIncome: number;
    totalExpense: number;
    weeklySaving: number;
}

interface MonthlyDetails {
    monthName: string;
    totalIncome: number;
    totalExpense: number;
    monthlySaving: number;
}

interface YearlyDetails {
    yearStartDate: string;
    yearEndDate: string;
    totalIncome: number;
    totalExpense: number;
    yearlySaving: number;
}
interface maxminDetails
{
    maxExpenseFormName: string;
    minExpenseFormName : string;
}

interface otherDetails{
    Amount : number;
}
interface cashDetails{
    Amount : number;
}
interface BankDetails{
    Amount : number;
}
interface maxIncomeDetails{
    maxIncomeFormName :string;
}
interface DashboardData {
    dailyDetails: DailyDetails;
    weeklyDetails: WeeklyDetails;
    monthlyDetails: MonthlyDetails;
    yearlyDetails: YearlyDetails;
    maxminDetails : maxminDetails;
    otherDetails : otherDetails;
    cashDetails : cashDetails;
    BankDetails : BankDetails;
    maxIncomeDetails : maxIncomeDetails;
}

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
debugger;
    useEffect(() => {
        async function fetchData() {
            try {
                const response: AxiosResponse<DashboardData> = await axios.get<DashboardData>(`${process.env.NEXT_PUBLIC_API}api/DashBoardDetails`);
                setDashboardData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className='IncomeHeader text-center w-[100%] my-5 text-large'>
                <h2 className='text-2xl font-extrabold'>Earning</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
                <CardForDashboard Title="Daily Earning" Detail={dashboardData?.dailyDetails.dailySaving?.toString() || "Loading..."} />
                <CardForDashboard Title="Cash In Hand"  Detail={dashboardData?.cashDetails?.toString() || "Loading..."} />
                <CardForDashboard Title="Bank" Detail={dashboardData?.BankDetails?.toString() || "Loading..."}/>
                <CardForDashboard Title="Others" Detail={dashboardData?.otherDetails?.toString() || "Loading..."}/>
                <CardForDashboard Title="Weekly Earning" Detail={dashboardData?.weeklyDetails.weeklySaving?.toString() || "Loading..."} />
                <CardForDashboard Title="Monthly Earning" Detail={dashboardData?.monthlyDetails.monthlySaving?.toString() || "Loading..."} />
                <CardForDashboard Title="Yearly Earning" Detail={dashboardData?.yearlyDetails.yearlySaving?.toString() || "Loading..."} />
                <CardForDashboard Title="Most Earning Source" Detail={dashboardData?.maxIncomeDetails.maxIncomeFormName?.toString() || "Loading..."}/>
            </div>
            <div className='IncomeHeader text-center w-[100%] my-5 text-large'>
                <h2 className='text-2xl font-extrabold'>Expense</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
                <CardForDashboard Title="Daily Expense" Detail={dashboardData?.dailyDetails.totalExpense?.toString() || "Loading..."} />
                <CardForDashboard Title="Weekly Expense" Detail={dashboardData?.weeklyDetails.totalExpense?.toString() || "Loading..."} />
                <CardForDashboard Title="Monthly Expense" Detail={dashboardData?.monthlyDetails.totalExpense?.toString() || "Loading..."} />
                <CardForDashboard Title="Yearly Expense" Detail={dashboardData?.yearlyDetails.totalExpense?.toString() || "Loading..."} />
                <CardForDashboard Title="Most Expense From"  Detail={dashboardData?.maxminDetails.maxExpenseFormName?.toString() || "Loading..."} />
                <CardForDashboard Title="Minimum Expense From" Detail={dashboardData?.maxminDetails.maxExpenseFormName?.toString() || "Loading..."}  />
            </div>
        </>
    );
}
