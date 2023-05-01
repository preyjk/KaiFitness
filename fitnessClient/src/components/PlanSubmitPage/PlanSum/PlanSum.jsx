import React, { Component } from 'react'
import './PlanSum.css'

export default class  extends Component {
  handleSelAll=(e)=>{
    this.props.selAll(e.target.checked)
  }
  handeldelFinished=()=>{
    this.props.delFinished()
  }
  render() {
    const {todolist} = this.props
    const finishedCount = todolist.reduce((pre,cur)=> pre + (cur.done?1:0),0)
    const todolistLen = todolist.length
    return (
      <div className='todo-footer'>
        <label htmlFor="">
            <input type="checkbox" checked={finishedCount===todolistLen && todolistLen!==0?true:false} onChange={this.handleSelAll}/>
        </label>
        <span>
            <span>Finished: {finishedCount}</span> / Total: {todolistLen}
        </span>
        <button onClick={this.handeldelFinished} className='btn btn-danger'>Clean All Finished SubPlan</button>

      </div>
    )
  }
}
