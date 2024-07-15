'use client'
import Link from 'next/link';
import { useState } from 'react';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href='/'>
            <p className="text-white text-lg font-bold">Home</p>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link href='/Income'>
            <p className="text-white">Income</p>
          </Link>
          <Link href='/Expense'>
            <p className="text-white">Expense</p>
          </Link>
          <Link href='/Details/incomeDetails'>
            <p className="text-white">Details</p>
          </Link>
          <Link href='/Settings/IncomeForm'>
            <p className="text-white">Settings</p>
          </Link>
        </div>
      </div>
      {menuOpen && (
        <div className="mt-4 md:hidden">
          <Link href='/Income'>
            <p className="block text-white">Income</p>
          </Link>
          <Link href='/Expense'>
            <p className="block text-white">Expense</p>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
