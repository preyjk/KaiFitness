import React, { Component } from 'react'

export default class PlanItem extends Component {
  render() {
    return (
      <li>
        <label htmlFor="">
          <input type="checkbox" />
          <span>SportName</span>
          <button className='btn btn-danger' style={{display:'none'}}>Delete</button>
        </label>
      </li>
    )
  }
}
