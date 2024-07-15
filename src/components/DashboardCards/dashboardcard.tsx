import * as React from "react"



interface CardWithDashboardProps {
  Title: string;
  Detail: string;
}

export function CardForDashboard({ Title, Detail }: CardWithDashboardProps) {
  return (
    <div>
      <div className="Sh">
        {Title}
      </div>
      <div className="Sh">
        {Detail}
      </div>
    </div>
  )
}
