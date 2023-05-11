import React from 'react'
import Filter from "../components/MyPlan/Filter/Filter";
import MyPlanContent from "../components/MyPlan//MyPlanContent/MyPlanContent";
import PageWapper from "../components/MyPlan//PageWapper/PageWapper";

export default function PlanPage() {
  return (
    <div className="Home">
      <Filter />
      <MyPlanContent />
      <PageWapper />
    </div>
  )
}


