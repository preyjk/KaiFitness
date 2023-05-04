import React, { Component } from 'react';
// import Header from '../../Header/Header'
// import Footer from '../../Footer/Footer'
import PlanIn from '../PlanIn/PlanIn';
import PlanList from '../PlanList/PlanList';
import PlanSum from '../PlanSum/PlanSum';
import './SubPlan.css';

export default class SubPlan extends Component {
	state = {
		todolist: [
			{ id: '001', name: 'JumpUp', done: true },
			{ id: '003', name: 'JumpDown', done: false },
			{ id: '002', name: 'JumpLeft', done: true },
			{ id: '004', name: 'JumpRight', done: false },
		],
	};
	addPlan = input => {
		const { todolist } = this.state;
		const newTodolist = [input, ...todolist];
		this.setState({ todolist: newTodolist });
	};
	updatePlan = (id, done) => {
		const { todolist } = this.state;
		const newTodolist = todolist.map(todo => {
			if (todo.id === id) return { ...todo, done };
			else return todo;
		});
		this.setState({ todolist: newTodolist });
	};
	delPlan = id => {
		const { todolist } = this.state;
		const newTodolist = todolist.filter(todo => {
			return todo.id !== id;
		});
		this.setState({ todolist: newTodolist });
	};
	selAll = flag => {
		const { todolist } = this.state;
		const newTodolist = todolist.map(todo => {
			return { ...todo, done: flag };
		});
		this.setState({ todolist: newTodolist });
	};
	delFinished = () => {
		const { todolist } = this.state;
		const newTodolist = todolist.filter(todo => {
			return !todo.done;
		});
		this.setState({ todolist: newTodolist });
	};
	render() {
		const { todolist } = this.state;
		return (
			<div className="todo-container">
				212121
				<div className="todo-warp">
					{/* <Header /> */}
					<PlanIn addPlan={this.addPlan} />
					<PlanList
						todolist={todolist}
						updatePlan={this.updatePlan}
						delPlan={this.delPlan}
					/>
					<PlanSum
						todolist={todolist}
						selAll={this.selAll}
						delFinished={this.delFinished}
					/>
					{/* <Footer /> */}
				</div>
			</div>
		);
	}
}
