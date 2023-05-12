import React from 'react'
import Filter from "../components/MyPlan/Filter/Filter";
import MyPlanContent from "../components/MyPlan//MyPlanContent/MyPlanContent";
import PlanPanel from "../components/MyPlan/PlanPanel/PlanPanel";

export default function PlanPage() {
  return (
    <div className="Home">
      <Filter />
      <MyPlanContent />
      <PlanPanel />
    </div>
  )
}


