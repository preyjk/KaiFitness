import React, { Component } from 'react'

export default class  extends Component {
  render() {
    return (
      <div className='todo-footer'>
        <label htmlFor="">
            <input type="checkbox" />
        </label>
        <span>
            <span>Finished:0</span> / Sum: 10
        </span>
        <button className='btn btn-danger'>Clean All Finished SubPlan</button>

      </div>
    )
  }
}
