import React, { Component } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import PlanIn from '../PlanIn/PlanIn'
import PlanList from '../PlanList/PlanList'
import PlanSum from '../PlanSum/PlanSum'
import './SubPlan.css'


export default class SubPlan extends Component {
    state = {todolist:[
        {id:'001', name:'JumpUp', done:true},
        {id:'003', name:'JumpDown', done:false},
        {id:'002', name:'JumpLeft', done:true}
        {id:'004', name:'JumpRight', done:false},
    ]}
    render() {
        return (
        <div className='todo-container'>
            <div className="todo-wrap">
                <Header />
                <PlanIn />
                <PlanList todolist={todolist}/>
                <PlanSum />
                <Footer />
            </div>
        </div>
        )
    }
}
