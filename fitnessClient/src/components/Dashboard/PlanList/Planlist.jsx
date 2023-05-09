import "./Planlist.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PubSub from 'pubsub-js';

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
        axios.get("/api/plan/personal/planList?uuid=644ba338dab1b1c5fb11b22d", {
            /*headers: {
                Authorization: localStorage.getItem("token")
            }*/
        })
            .then((response) => {
                console.log("aaa",response.data)
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

    const CheckboxChange = (event,templateId) => {
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
        axios.get(`/api/plan/personal/dashboard?templateId=${selectedItems}`,
            // {
            //     templateIds: selectedItems
            // },
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setCaloriesData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(()=>{
        PubSub.publish('getcalories',caloriesData)
    },[caloriesData])

    return (
        <div className="Dashboard2">
            <div className="Plan">
                <div className="SportPlan">
                    <h1>Sport Plans</h1>
                    <ul>
                        {sportPlanList.map((plan) => {
                            return(

                                <li key={plan._id}>
                                    <h2>{plan.name}</h2>
                                    <input type="checkbox" onChange={(event) => CheckboxChange(event, plan._id)} />
                                </li>
                            )
                        }
                                
                            
        )}
                    </ul>
                </div>
                <div className="RecipesPlan">
                    <h1>Recipes Plans</h1>
                    <ul>
                        {recipesPlanList.map((plan) => {
                            return(
                            <li key={plan._id}>
                                <h2>{plan.name}</h2>
                                <input type="checkbox" onChange={(event) =>CheckboxChange(event,plan._id)} />
                            </li>
                            )        
                        }
                        )}
                    </ul>
                </div>
                <button className="button1" onClick={CompleteClick}>Completion</button>
            </div>
        </div>
    );
}

export default App;
