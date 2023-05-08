import React, { Component } from 'react'
import "./Dashboard.css"

const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="Calories">
                <div className="DailyCalories">
                    <h1>Calories</h1>
                    <h2>0</h2>
                </div>
                <div className="CaloriesDate">
                    <h1>Basic Calorie Consumption :
                        <span> 0</span>
                    </h1>
                    <h2>Exercise Calorie Consumption :
                        <span> 0</span>
                    </h2>
                    <h3>Calorie Intake :
                        <span> 0</span>
                    </h3>
                </div>
            </div>
            <div className="Plan1">
                <div className="SportPlan">
                    <h1>Sport Plan</h1>
                </div>
                <button className="button1">Completion</button>
            </div>
            <div className="Plan2">
                <div className="RecipesPlan">
                    <h1>Recipes Plan</h1>
                </div>
                <button className="button2">Completion</button>
            </div>
        </div>
    );
};
export default Dashboard;
