import NavBar from "@/components/Navbar/navbar"
import { Income, columns } from "./column"
import { DataTable } from "./data-table"
import Link from "next/link"


async function getData(): Promise<Income[]> {
  // Fetch data from your API here.
  return [
   
  ]
}

export default async function DemoPage() {
  const data = await getData()

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
      <DataTable columns={columns} data={data} />
    </div>
  
      </div>
    </div>
  </>
  )
}
