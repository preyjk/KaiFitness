import React,{useState,useEffect} from "react";
import axios from "axios";
import PubSub from 'pubsub-js'
import "./Calories.css";

export default function Calories() {
    const [caloriesData, setCaloriesData] = useState({
        totalCalorie: 0,
        inCalorie: 0,
        outCalorie: 0
    });
    
    useEffect(()=>{
      const caToken = PubSub.subscribe('getcalories',(_,p)=>{
        setCaloriesData(p)
      })
      
      return()=>{
          PubSub.unsubscribe(caToken)
      }
  },[])
  return (
    <div className="Dashboard">
      <div className="Calories">
        <div className="DailyCalories">
          <h1>Calories</h1>
          <h2>{caloriesData.totalCalorie}</h2>
        </div>
        <div className="CaloriesDate">
          <h1>
            Calorie Consumption : <span>{caloriesData.outCalorie}</span>
          </h1>
          <h2>
            Calorie Intake : <span>{caloriesData.inCalorie}</span>
          </h2>
        </div>
      </div>
    </div>
  );
};
