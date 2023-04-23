import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import "./PlanIn.css"

export default class extends Component {
  
  static propTypes = {
    addPlan:PropTypes.func.isRequired
  }

  handleEnter = (e)=>{
    const {keyCode,target} = e
    if(keyCode !== 13) return
    if(target.value.trim()!==''){
      const input = {id:nanoid(), name: target.value, done:false}
      this.props.addPlan(input)
      target.value = ''
    }
    
  }
  render() {
    return (
      <div className='todo-header'>
        <input onKeyUp={this.handleEnter} type="text" placeholder='Input your Plan Name, press enter comfirm' />
      </div>
    )
  }
}
