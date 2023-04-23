import React, { Component } from 'react'
import PlanItem from '../PlanItem/PlanItem'

export default class PlanList extends Component {
  render() {
    return (
      <ul className='todo-main'>
        <PlanItem />
      </ul>
    )
  }
}
