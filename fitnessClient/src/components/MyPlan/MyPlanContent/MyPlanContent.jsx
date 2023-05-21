/*
 * @Author: Jack_KaiJing
 * @Date: 2023-05-12 18:38:42 
 * @Last Modified by: jack_KaiJing
 * @Last Modified time: 2023-05-21 22:35:24
 */


import React, { useEffect, useState } from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import { Checkbox, Button, Modal, Input, InputNumber } from 'antd';
import { DeleteTwoTone, MinusSquareOutlined } from '@ant-design/icons';
import PlanCard from "../PlanCard/PlanCard";
import "./MyPlanContent.css"
import ModalAddDiet from "./ModalAddDiet";

export default function HomeContent() {
    const [recipes, setRecipes] = useState([]);
    const [dietPlanList, setDietPlanList] = useState([]);
    const [type, setType] = useState("myPlanMuscle")
    const [page, setPage] = useState(1)
    // Modal of adding workout plan
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    // Modal of adding diet plan
    const [open_dietModal, setOpen_dietModal] = useState(false);
    const [open2_dietModal, setOpen2_dietModal] = useState(false);
    const { TextArea } = Input;
    const [addedList, updateAddedList] = useState([]);
    const [checkedList, updateCheckList] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
    const [addListPrepare, updateAddListPrepare] = useState([]);
    const [planName, setPlanName] = useState();
    const [information, setInformation] = useState();
    // mock workout data list
    const workoutGroup = [
        {
            id: 1,
            name: "Bicycle Crunch",
            "_id": {
                "$oid": "645cb89ddab1b1c5fb11b2a9"
            }
        },
        {
            id: 2,
            name: "Cable Crunch",
            "_id": {
                "$oid": "645cb8dadab1b1c5fb11b2aa"
            }
        },
        {
            id: 3,
            name: "Cable Twist",
            "_id": {
                "$oid": "645cb910dab1b1c5fb11b2ab"
            }
        },
        {
            id: 4,
            name: "Cross Body Crunch",
            "_id": {
                "$oid": "645cb92fdab1b1c5fb11b2ac"
            }
        },
        {
            id: 5,
            name: "Crunch",
            "_id": {
                "$oid": "645cba17dab1b1c5fb11b2ad"
            }
        },
        {
            id: 6,
            name: "Bicep Curl Cable",
            "_id": {
                "$oid": "645cb797dab1b1c5fb11b2a6"
            },
        },
        {
            id: 7,
            name: "Bench Dip",
            "_id": {
                "$oid": "645cb76bdab1b1c5fb11b2a4"
            },
        },
        {
            id: 8,
            name: "Bench Press",
            "_id": {
                "$oid": "645cb77edab1b1c5fb11b2a5"
            },
        },
        {
            id: 9,
            name: "Hammer Curl Band",
            "_id": {
                "$oid": "645cba4bdab1b1c5fb11b2ae"
            }
        },
        {
            id: 10,
            name: "Hammer Curl Cabel",
            "_id": {
                "$oid": "645cba87dab1b1c5fb11b2af"
            }
        },
        {
            id: 11,
            name: "Hammer Curl Dumbbel",
            "_id": {
                "$oid": "645cbb44dab1b1c5fb11b2b0"
            }
        },
        {
            id: 12,
            name: "Bicep Curl Dumbbell",
            "_id": {
                "$oid": "645cb819dab1b1c5fb11b2a7"
            }
        }
    ]

    const getPlan = () => {
        const uuid = localStorage.getItem("uuid")
        // console.log(uuid);
        axios.get(`/api/plan/personal/planList?uuid=` + uuid).then(
            respose => {
                // console.log('personal data:' + respose.data);
                let newArr = [];
                let newArr2 = [];
                const planData = respose.data;
                // console.log(planData);
                for (let index = 0; index < planData.length; index++) {
                    const element = planData[index];
                    if (element.type === "muscle") {
                        newArr.push(element)
                    } else {
                        newArr2.push(element)
                    }
                }
                setRecipes(newArr);
                setDietPlanList(newArr2);
                // PubSub.publish('getTotal', pages)
            },
            error => {
                console.log("GetRecipesFail", error);
            }
        )
    }

    useEffect(() => {
        const typeToken = PubSub.subscribe('getMyplanType', (_, t) => {
            setType(t)
        })

        return () => {
            PubSub.unsubscribe(typeToken)
        }
    }, [])

    useEffect(() => {
        // console.log("type:" + type);
        getPlan();
    }, [type, page])

    // update plan panel
    useEffect(() => {
        const token = PubSub.subscribe('updatePlanPanel', (topic, updateFlag) => {
            if (updateFlag == true) {
                getPlan()
            }
        });

        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    // delete plan receive
    useEffect(() => {
        const token = PubSub.subscribe('deletePlan', (topic, planId) => {
            // console.log(planId);
            deletePlan(planId)
        });

        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    // select multipy workout
    const onChange = (e, id) => {
        // console.log(`checked = ${e.target.checked}`);
        const newArray = [...checkedList];
        newArray[id - 1] = !newArray[id - 1];
        updateCheckList(newArray);
        updateAddListPrepare(addListPrepare =>
            [...addListPrepare, {
                id: workoutGroup[id - 1].id,
                name: workoutGroup[id - 1].name,
                sets: [
                    {
                        kg: "0",
                        Reps: "30"
                    }
                ],
                deleteColor: '#5151f0'
            }])
    };

    // delete btn hover
    const setDeleteColor = (index, color) => {
        const newArray = [...addedList];
        newArray[index].deleteColor = color
        updateAddedList(newArray);
    }

    // add workout plan list
    const addWorkOut = (e) => {
        // console.log('addList:' + addList);
        const newArray = addListPrepare.slice();
        updateAddedList(newArray);
        for (let index = 0; index < checkedList.length; index++) {
            updateCheckList([false, false, false, false, false, false, false, false, false, false, false, false])
        }
        setOpen2(false)
    }

    // delete set
    const deleteSet = (index_out, index) => {
        // console.log("indexOut:" + index_out);
        // console.log("indexIn:" + index);
        updateAddedList(addedList => {
            const newArray = [...addedList];
            newArray[index_out].sets.splice(index, 1);
            return newArray;
        });
    }

    // addPlan
    const addPlan = () => {
        const uuid = localStorage.getItem('uuid');
        let group = [];
        for (let index = 0; index < addedList.length; index++) {
            const element = addedList[index];
            let totalReps = 0;
            for (let index = 0; index < element.sets.length; index++) {
                totalReps += element.sets[index].Reps;
            }
            group.push({
                "muscle": workoutGroup[addedList[index].id - 1]._id.$oid,
                "number": totalReps,
                "weight": element.sets[0].kg
            })
        }
        // console.log(group);
        const data = {
            "name": planName,
            "type": "muscle",
            "imagBase64": "",
            "information": information,
            "detail": information,
            "uuid": uuid,
            "group": group
        }
        // console.log('planName:' + planName);
        // console.log('information:' + information);
        axios.post(`/api/plan/personal/AddPlan`, data).then(
            response => {
                console.log("successful:" + response.data);
                // window.location.reload();
                PubSub.publish("CardId", response.data)
                getPlan();
            },
            err => {
                console.log("err:" + err);
            }
        )
    }

    // open addPlan(workout or diet Modal)
    const openModalAddPlan = () => {
        if (type == "myPlanMuscle") {
            setOpen(true)
        } else if (type == "myPlanDiet") {
            // setOpen_dietModal(true)
            PubSub.publish('openModalAddDiet', true)
        }
    }

    // delete plan
    const deletePlan = (planId) => {
        const uuid = localStorage.getItem('uuid');
        const data = {
            uuid: uuid,
            id: planId
        }
        axios.post(`/api/plan/personal/deletePlan`, data).then(
            respose => {
                console.log("successful delete");
                getPlan()
            },
            error => {
                console.log("deletePlanFail", error);
            }
        )
    }

    return (
        <section className="homeContent">
            <div className="cotentCard">
                <div className="btn_addPlan" onClick={openModalAddPlan}> + </div>
                {
                    type == "myPlanMuscle" ?
                        recipes.map((recipe) => {
                            return <PlanCard key={recipe._id} {...recipe} />
                        })
                        :
                        dietPlanList.map((recipe) => {
                            return <PlanCard key={recipe._id} {...recipe} />
                        })
                }
            </div>
            <Modal
                title="Add Workout Plan"
                centered
                open={open}
                onOk={
                    () => {
                        setOpen(false);
                        addPlan();
                    }
                }
                onCancel={() => {
                    setPlanName("")
                    setInformation("")
                    updateAddedList([])
                    updateAddListPrepare([])
                    setOpen(false)
                }
                }
                width={600}
                okText="Save"
                cancelText="Cancel"
            >
                <Input placeholder="Workout Plan Name" className="add_plan_name"
                    onChange={(e) => {
                        setPlanName(e.target.value)
                    }}
                    value={planName}
                />
                <TextArea placeholder="Description..." className="add_plan_des" autoSize
                    onChange={(e) => {
                        setInformation(e.target.value)
                    }}
                    value={information}
                />
                <ul>
                    {
                        addedList.map((item, index_out) =>
                        (
                            <li key={item.id}>
                                <h3 className="exercise_name">
                                    {item.name}
                                    <button className="delete_exercise">
                                        <DeleteTwoTone twoToneColor={item.deleteColor}
                                            onMouseEnter={() => setDeleteColor(index_out, 'red')}
                                            onMouseLeave={() => setDeleteColor(index_out, '#5151f0')}
                                            onClick={() => {
                                                const newArray = addedList.filter((_, i) => i !== index_out);
                                                updateAddedList(newArray);
                                            }}
                                        />
                                    </button>
                                </h3>
                                <ul className="workout_group">
                                    <ul className="excercise_theme">
                                        <li className="exercise_theme_bold">Set</li>
                                        <li className="exercise_theme_bold">kg</li>
                                        <li className="exercise_theme_bold">Reps</li>
                                    </ul>
                                    {item.sets.map((set, index) => (
                                        <ul className="excercise_theme" key={index}>
                                            <li>
                                                <div className="number_div">{index + 1}</div>
                                            </li>
                                            <li>
                                                <InputNumber min={1} max={500} defaultValue={0} onChange={() => { }} />
                                            </li>
                                            <li>
                                                <InputNumber min={1} max={500} defaultValue={30} onChange={() => { }} />
                                            </li>
                                            <li>
                                                <div className="delete_set">
                                                    <MinusSquareOutlined className="MinusSquareOutlined"
                                                        onClick={() => deleteSet(`${index_out}`, index)}
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    ))}
                                    <Button type='primary' className='btn_addSet' size="small" onClick={() => {
                                        // console.log('index_out:' + index_out);
                                        const newArray = [...addedList];
                                        newArray[index_out].sets.push(
                                            {
                                                kg: "0",
                                                Reps: "30"
                                            }
                                        );
                                        updateAddedList(newArray);
                                    }}>+ Add Set</Button>
                                </ul>
                            </li>)
                        )
                    }
                </ul>
                <Button type='primary' className='btn_addWorkOut' onClick={() => {
                    setOpen2(true);
                }}>Add Exercises</Button>
                <Modal title="Add Workout" open={open2} onOk={() => setOpen2(false)}
                    onCancel={() => setOpen2(false)}
                    footer={[
                        <Button key="Add" type='primary' onClick={addWorkOut}>Add</Button>,
                        <Button key="Cancel" onClick={() => setOpen2(false)}>Cancel</Button>
                    ]} className='modal_add_workout'>
                    <h3 className='theme_workout'>Fitness Action List</h3>
                    <hr />
                    <ul>
                        <li>
                            <img className='img_workout' src="..\img_workout\Bicycle_Crunch.png" alt="" />
                            <span><strong>Bicycle Crunch</strong></span>
                            <Checkbox checked={checkedList[0]} onChange={() => { onChange(event, 1) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Cable_Crunch.png" alt="" />
                            <span><strong>Cable Crunch</strong></span>
                            <Checkbox checked={checkedList[1]} onChange={() => { onChange(event, 2) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Cable_Twist.png" alt="" />
                            <span><strong>Cable Twist</strong></span>
                            <Checkbox checked={checkedList[2]} onChange={() => { onChange(event, 3) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Cross_Body_Crunch.png" alt="" />
                            <span><strong>Cross Body Crunch</strong></span>
                            <Checkbox checked={checkedList[3]} onChange={() => { onChange(event, 4) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Crunch.png" alt="" />
                            <span><strong>Crunch</strong></span>
                            <Checkbox checked={checkedList[4]} onChange={() => { onChange(event, 5) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Bicep_Curl_Cable.png" alt="" />
                            <span><strong>Bicep Curl Cable</strong></span>
                            <Checkbox checked={checkedList[5]} onChange={() => { onChange(event, 6) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Bench_Dip.png" alt="" />
                            <span><strong>Bench Dip</strong></span>
                            <Checkbox checked={checkedList[6]} onChange={() => { onChange(event, 7) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Bench_Press.png" alt="" />
                            <span><strong>Bench Press</strong></span>
                            <Checkbox checked={checkedList[7]} onChange={() => { onChange(event, 8) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Hammer_Curl_Band.png" alt="" />
                            <span><strong>Hammer Curl Band</strong></span>
                            <Checkbox checked={checkedList[8]} onChange={() => { onChange(event, 9) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Hammer_Curl_Cabel.png" alt="" />
                            <span><strong>Hammer Curl Cabel</strong></span>
                            <Checkbox checked={checkedList[9]} onChange={() => { onChange(event, 10) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Hammer_Curl_Dumbbell.png" alt="" />
                            <span><strong>Hammer Curl Dumbbel</strong></span>
                            <Checkbox checked={checkedList[10]} onChange={() => { onChange(event, 11) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\img_workout\Bicep_Curl_Dumbbell.png" alt="" />
                            <span><strong>Bicep Curl Dumbbell</strong></span>
                            <Checkbox checked={checkedList[11]} onChange={() => { onChange(event, 12) }} className='checkBox_workOut'></Checkbox>
                        </li>
                    </ul>
                </Modal>
            </Modal>
            <ModalAddDiet></ModalAddDiet>
        </section>
    )
}
