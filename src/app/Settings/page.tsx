import NavBar from "@/components/Navbar/navbar";
import Link from "next/link";

export default function Settings() {
  return (
    <>    
      <NavBar />
      <div className="flex flex-col md:flex-row h-screen">
        <div className="w-full md:w-1/4 bg-gray-800">
          <div className="h-full flex flex-col justify-center">
            <Link href="/Settings">
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
          <form className="p-4">
            <label htmlFor="expenseForm">Expense Form</label>
            <input type="text"/>
            <button className="mt-4">Save</button>
          </form>
        </div>
      </div>
    </>
  );
}
