import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './PlanItem.css'


export default class PlanItem extends Component {
  state = {mouse:false}
  static propTypes = {
    updatePlan:PropTypes.func.isRequired,
  }
  handleMouse = (flag) =>{
    return()=>{
      this.setState({mouse:flag})
    }
  }
  handleCheck=(id)=>{
    return(e)=>{
      this.props.updatePlan(id,e.target.checked)
    }
  }
  handleDel=(id)=>{
    return()=>{
      if(confirm('Are your gonna delete this plan?')){
        this.props.delPlan(id)
      }
    }
  }
  render() {
    const{id, name, done} = this.props
    const{mouse} = this.state
    return (
      <li style={{backgroundColor:mouse? '#ddd': '#fff'}} id={id} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <label htmlFor="">
          <input type="checkbox" checked={done} onChange={this.handleCheck(id)}/>
          <span>{name}</span>
        </label>
          <button className='btn btn-danger' style={{display:mouse?'block':'none'}} onClick={this.handleDel(id)}>Delete</button>
      </li>
    )
  }
}
