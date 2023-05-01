import React, { Component } from 'react'
import "./Dashboard.css"

export default class Header extends Component {
    render() {
      return (
        <div className="dashboard">
          <div className="DailyCalories">
             <h1>Calories</h1>
             <h2>0</h2>
          </div>
          <div className="CaloriesDate">
              <h1>Basic Calorie Consumption :
                <span> 0</span>
              </h1>
              <h2>Exercise calorie consumption :
                <span> 0</span>
              </h2>
              <h3>Calorie intake of food :
                <span> 0</span>
              </h3>
          </div>
          <div className="SportPlan">
              <h1>Sport Plan</h1>
          </div>  
          <div className="RecipesPlan">
              <h1>Recipes Plan</h1>
          </div>
        </div>
      )
    }
  }