import React from 'react'
import Planlist from '../PlanList/Planlist'
import Calories from '../Calories/Calories'
import "./Dashboard.css"

export default function Dashboard() {
  return (
    <div className="Dashboard">
      <Calories />
      <Planlist />
    </div>
  )
}
