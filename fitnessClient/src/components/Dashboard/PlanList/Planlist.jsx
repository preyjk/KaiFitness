import "./Planlist.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [sportPlanList, setSportPlanList] = useState([]);
    const [recipesPlanList, setRecipesPlanList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [caloriesData, setCaloriesData] = useState({
        totalCalorie: 0,
        InCalorie: 0,
        outCalorie: 0
    });

    useEffect(() => {
        axios.get("/api/plan/personal/planList", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then((response) => {
                const data = response.data;
                const sportPlans = data.filter((plan) => plan.type === "muscle");
                const dietPlans = data.filter((plan) => plan.type === "diet");
                setSportPlanList(sportPlans);
                setRecipesPlanList(dietPlans);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const CheckboxChange = (event, templateId) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedItems((prevState) => [...prevState, templateId]);
        } else {
            setSelectedItems((prevState) =>
                prevState.filter((id) => id !== templateId)
            );
        }
    };

    const CompleteClick = () => {
        axios.post("/api/plan/personal/dashboard",
            {
                templateIds: selectedItems
            },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setCaloriesData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="Dashboard2">
            <div className="Plan">
                <div className="SportPlan">
                    <h1>Sport Plans</h1>
                    <ul>
                        {sportPlanList.map((plan) => (
                            <li key={plan.templateId}>
                                <h2>{plan.name}</h2>
                                <ul>
                                    {plan.group.map((groupItem) => (
                                        <li key={groupItem.Id}>
                                            <input type="checkbox" onChange={(event) => CheckboxChange(event, plan.templateId)} />
                                            <span>{groupItem.Name}: </span>
                                            <span>{groupItem.calorie} calories</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="RecipesPlan">
                    <h1>Recipes Plans</h1>
                    <ul>
                        {recipesPlanList.map((plan) => (
                            <li key={plan.templateId}>
                                <h2>{plan.name}</h2>
                                <ul>
                                    {plan.group.map((groupItem) => (
                                        <li key={groupItem.Id}>
                                            <input type="checkbox" onChange={(event) => CheckboxChange(event, plan.templateId)} />
                                            <span>{groupItem.name}: </span>
                                            <span>{groupItem.calorie} calories</span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="button1">Completion</button>
            </div>
        </div>
    );
}

export default App;
