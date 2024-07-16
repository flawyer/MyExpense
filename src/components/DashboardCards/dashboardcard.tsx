import * as React from "react";

interface CardWithDashboardProps {
  Title: string;
  Detail: string;
}

export function CardForDashboard({ Title, Detail }: CardWithDashboardProps) {
  return (
    <div className="w-64 h-40 mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{Title}</h2>
        <p className="text-gray-600">{Detail}</p>
      </div>
    </div>
  );
}
