import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlanItem from '../PlanItem/PlanItem'
import './PlanList.css'

export default class PlanList extends Component {
  static propTypes = {
    todolist:PropTypes.array.isRequired,
    updatePlan:PropTypes.func.isRequired,
    delPlan:PropTypes.func.isRequired
  }
  render() {
    const {todolist,updatePlan,delPlan} = this.props
    return (
      <ul className='todo-main'>
        {
          todolist.map((todo)=>{
            return <PlanItem key={todo.id} {...todo} updatePlan={updatePlan} delPlan={delPlan}/>
          })
        }
      </ul>
    )
  }
}
