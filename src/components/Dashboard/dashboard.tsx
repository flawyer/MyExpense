'use client'
import { useEffect, useState } from 'react';
import { CardForDashboard } from '@/components/DashboardCards/dashboardcard';
import axios, { AxiosResponse } from 'axios';

interface DashboardData {
    yearStartDate: string;
    yearEndDate: string;
    totalIncome: number;
    totalExpense: number;
    yearlySaving: number;
    dailyAmount: number; 
}

export default function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response: AxiosResponse<DashboardData> = await axios.get<DashboardData>("https://expenseincomeapi.onrender.com/api/YearlySaving");
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
                <h2 className='text-2xl font-extrabold'>Income</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
                <CardForDashboard Title="Daily Earning" Detail={dashboardData?.dailyAmount?.toString() || "Loading..."} />
                <CardForDashboard Title="Cash In Hand" Detail=""/>
                <CardForDashboard Title="Bank" Detail="100"/>
                <CardForDashboard Title="Others" Detail="100"/>
                <CardForDashboard Title="Weekly Earning" Detail="100" />
                <CardForDashboard Title="Monthly Earning" Detail="100"/>
                <CardForDashboard Title="Yearly Earning" Detail={dashboardData?.yearlySaving?.toString() || "Loading..."} />
                <CardForDashboard Title="Most Earning Source" Detail="China"/>
            </div>
            <div className='IncomeHeader text-center w-[100%] my-5 text-large'>
                <h2 className='text-2xl font-extrabold'>Expense</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
                <CardForDashboard Title="Daily Expense" Detail="100" />
                <CardForDashboard Title="Monthly Expense" Detail="100"/>
                <CardForDashboard Title="Weekly Expense" Detail="100"/>
                <CardForDashboard Title="Yearly Expense" Detail="100"/>
                <CardForDashboard Title="Most Expense From" Detail="100" />
                <CardForDashboard Title="Minimum Expense From" Detail="100"/>
            </div>
        </>
    );
}
