import React from "react";
import axios from "axios";
import "./Calories.css";

export default function Calories({ totalCalorie, inCalorie, outCalorie }) {
  return (
    <div className="Dashboard">
      <div className="Calories">
        <div className="DailyCalories">
          <h1>Calories</h1>
          <h2>{totalCalorie}</h2>
        </div>
        <div className="CaloriesDate">
          <h1>
            Calorie Consumption : <span>{outCalorie}</span>
          </h1>
          <h2>
            Calorie Intake : <span>{inCalorie}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
