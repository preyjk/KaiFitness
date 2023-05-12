import React, { useEffect, useState } from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import { Checkbox, Button, Modal, Input, InputNumber } from 'antd';
import { DeleteTwoTone, MinusSquareTwoTone } from '@ant-design/icons';
import Recipes from "../Recipes/Recipes";
import DietRecipes from "../DietRecipes/DietRecipes";
import XgPNG from '../xg.png';
import "./MyPlanContent.css"

const staticDietList = [
    {
      "_id": {
        "$oid": "645cbcebdab1b1c5fb11b2b2"
      },
      "name": "Avocado"
    },
    {
      "_id": {
        "$oid": "645cbcfadab1b1c5fb11b2b3"
      },
      "name": "Cheese"
    },
    {
      "_id": {
        "$oid": "645cbd09dab1b1c5fb11b2b4"
      },
      "name": "Fish"
    },
    {
      "_id": {
        "$oid": "645cbd18dab1b1c5fb11b2b5"
      },
      "name": "Carrot"
    },
    {
      "_id": {
        "$oid": "645cbd23dab1b1c5fb11b2b6"
      },
      "name": "Apple"
    },
    {
      "_id": {
        "$oid": "645cbd31dab1b1c5fb11b2b7"
      },
      "name": "Orange"
    },
    {
      "_id": {
        "$oid": "645cbd3fdab1b1c5fb11b2b8"
      },
      "name": "Lemon"
    },
    {
      "_id": {
        "$oid": "645cbd53dab1b1c5fb11b2b9"
      },
      "name": "Onion"
    },
    {
      "_id": {
        "$oid": "645cbd69dab1b1c5fb11b2ba"
      },
      "name": "Strawberry"
    },
    {
      "_id": {
        "$oid": "645cbd79dab1b1c5fb11b2bb"
      },
      "name": "Candy"
    },
    {
      "_id": {
        "$oid": "645cbd8ddab1b1c5fb11b2bc"
      },
      "name": "Peas"
    },
    {
      "_id": {
        "$oid": "645cbd9cdab1b1c5fb11b2bd"
      },
      "name": "Milk"
    }
];

export default function HomeContent() {
    const [recipes, setRecipes] = useState([]);
    const [type, setType] = useState(['mnew', 'muscle'])
    const [page, setPage] = useState(1)

    const getRecipes = () => {
        // console.log('type:', type, ' page: ', page)
        axios.get(`/api/personal/planList?tag=${type[1] == 'diet' ? 'diet' : 'muscle'}&pageNo=${page}&sort=${type[0] == ('mnew' || 'dnew') ? 'latest' : null}`).then(
            respose => {
                // console.log(respose.data)
                setRecipes(respose.data.data);
                const pages = 10 * Math.ceil(respose.data.totalcount / 12);
                PubSub.publish('gettotal', pages)
            },
            error => {
                // mock data for dnew
                // if(type[1] === 'diet') {
                //     const mockDataForDiet = [];
                //     for(let i=0; i<12; i++) {
                //         mockDataForDiet.push({
                //             _id: i,
                //             name: 'Diet Name '+i, 
                //             information: 'Diet Info '+i, 
                //             type: 'diet', 
                //             detail: 'Diet Detail' + i, 
                //             group: [
                //                 {
                //                     _id: 111,
                //                     weight: 123,
                //                     diet: 'Diet 1'
                //                 },
                //                 {
                //                     _id: 222,
                //                     weight: 1234,
                //                     diet: 'Diet 2'
                //                 },
                //                 {
                //                     _id: 333,
                //                     weight: 12345,
                //                     diet: 'Diet 3'
                //                 }
                //             ]
                //         })
                //     }
                //     setRecipes(mockDataForDiet);
                //     const pages = 10 * Math.ceil(25 / 12);
                //     PubSub.publish('gettotal', pages)
                // }
                console.log("GetRecipesFail", error);
            }

        )
    }

    useEffect(() => {
        const typeToken = PubSub.subscribe('gettype', (_, t) => {
            setType(t)
            setPage(1)
            // try to get recipes
            getRecipes();
        })

        return () => {
            PubSub.unsubscribe(typeToken)
        }
    }, [])

    useEffect(() => {
        const pageToken = PubSub.subscribe('getpage', (_, p) => {
            setPage(p)
        })

        return () => {
            PubSub.unsubscribe(pageToken)
        }
    }, [])

    useEffect(() => {
        getRecipes();
    }, [type, page])

    // mock workout data list
    const workoutGroup = [
        {
            id: 1,
            name: "Bicycle Crunch"
        },
        {
            id: 2,
            name: "Cable Crunch"
        },
        {
            id: 3,
            name: "Cable Twist"
        }
    ]
    const test = (workoutId) => { console.log(workoutId); }
    // add workout plan
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const { TextArea } = Input;
    const [normalColor, setnormalColor] = useState('#5151f0');
    const [workoutList, updateWorkoutList] = useState([]);
    const [dietList, setDietList] = useState([]);
    let addList = [];

    // select multipy workout
    const onChange = (e, id) => {
        console.log(`checked = ${e.target.checked}`);
        console.log('id:' + id);
        addList.push({ id: id });
    };

    // const sets = [2, 3, 4]
    const sets = []

    // add workout plan list
    const addWorkOut = (e) => {
        console.log(addList);
        updateWorkoutList([...workoutList, addList]),
            () => {
                console.log('workoutList' + workoutList);
            }
    }

    const addDiet = (item => {
        addList.push(item);
    })

    const onDietItemDelete = (index) => {
        dietList.splice(index, 1);
        setDietList([...dietList]);
    }
    
    const onAddDietOK = () => {
        setDietList([...dietList, ...addList]);
        addList.length = 0;
        setOpen2(false);
    }

    const isDiet = type[1] === 'diet';

    return (
        <section className="homeContent">
            <div className="cotentCard">
                {!recipes.length && <div className="btn_addPlan" onClick={() => setOpen(true)}> + </div>}
                {
                    recipes.map((recipe) => {
                        return type[1] == 'diet' ? <DietRecipes key={recipe._id} {...recipe} /> : <Recipes key={recipe._id} {...recipe} />
                    })
                }
            </div>
            <Modal
                title={isDiet ? 'Add Diet Plan' : 'Add Workout Plan'}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={600}
                okText="Save"
                cancelText="Cancel"
            >
                <Input placeholder={isDiet ? 'Diet Plan Name' : 'Workout Plan Name'} className="add_plan_name" />
                <TextArea placeholder="Description..." className="add_plan_des" autoSize />
                <ul>
                    {
                        workoutList.map(workoutId =>
                        (
                            <li key={workoutId}>
                                <h3 className="exercise_name">
                                    { }
                                    <button className="delete_exercise"><DeleteTwoTone twoToneColor={normalColor} onMouseEnter={() => setnormalColor('red')} onMouseLeave={() => setnormalColor()} /></button>
                                </h3>
                                <ul className="workout_group">
                                    <ul className="excercise_theme">
                                        <li className="exercise_theme_bold">Set</li>
                                        <li className="exercise_theme_bold">kg</li>
                                        <li className="exercise_theme_bold">Reps</li>
                                    </ul>
                                    <ul className="excercise_theme">
                                        <li>
                                            <div className="number_div">1</div>
                                        </li>
                                        <li>
                                            <InputNumber min={1} max={500} defaultValue={0} onChange={() => { }} />
                                        </li>
                                        <li>
                                            {!isDiet ? <InputNumber min={1} max={500} defaultValue={30} onChange={() => { }} /> : null}
                                        </li>
                                        <li>
                                            <div className="delete_set">
                                                <MinusSquareTwoTone />
                                            </div>
                                        </li>
                                    </ul>
                                </ul>
                            </li>)
                        )
                    }
                    {
                        dietList.map((item, index) => 
                            (
                            <li key={index}>
                                <h3 className="exercise_name">
                                    {item.name}
                                    <button className="delete_exercise">
                                        <DeleteTwoTone
                                            twoToneColor={normalColor} 
                                            onMouseEnter={() => setnormalColor('red')} 
                                            onMouseLeave={() => setnormalColor()} 
                                            onClick={() => {
                                                onDietItemDelete(index)
                                            }}
                                        />
                                    </button>
                                </h3>
                                <ul className="workout_group">
                                    <ul className="excercise_theme">
                                        <li className="exercise_theme_bold">Set</li>
                                        <li className="exercise_theme_bold">weight/100g</li>
                                        <li className="exercise_theme_bold"></li>
                                    </ul>
                                    <ul className="excercise_theme">
                                        <li>
                                            <div className="number_div">1</div>
                                        </li>
                                        <li>
                                            <InputNumber min={1} max={500} defaultValue={0} onChange={() => { }} />
                                        </li>
                                        <li></li>
                                        <li>
                                            <div className="delete_set">
                                                <MinusSquareTwoTone />
                                            </div>
                                        </li>
                                    </ul>
                                </ul>
                            </li>)
                        )    
                    }
                </ul>
                <Button type='primary' className='btn_addWorkOut' onClick={() => setOpen2(true)}>
                    {isDiet ? 'Add Diet' : 'Add Exercises'}
                </Button>
                {
                    open2 && 
                    <Modal title={isDiet ? 'Add Diet' : 'Add Workout'} open={open2} onOk={() => setOpen2(false)}
                        onCancel={() => setOpen2(false)} footer={[
                            <Button key="Add" type='primary' onClick={isDiet ? onAddDietOK : addWorkOut}>Add</Button>,
                            <Button key="Cancel">Cancel</Button>
                        ]} className='modal_add_workout'>
                        <h3 className='theme_workout'>{isDiet ? 'Food' : 'Core'}</h3>
                        <hr />
                        {
                            isDiet ?  
                            <ul>
                                {
                                    staticDietList.map(item => {
                                        return <li key={item._id.$oid}>
                                            <img className='img_workout' src={XgPNG} alt="xg" />
                                            <span><strong>{item.name}</strong></span>
                                            <Checkbox onChange={() => {
                                                addDiet(item);
                                            }} value={item._id.$oid} className='checkBox_workOut'></Checkbox>
                                        </li>
                                    })
                                }
                            </ul> : 
                            <ul>
                                <li>
                                    <img className='img_workout' src="..\public\img_workout\Bicycle_Crunch.png" alt="" />
                                    <span><strong>Bicycle Crunch</strong></span>
                                    <Checkbox onChange={() => { onChange(event, 1) }} className='checkBox_workOut'></Checkbox>
                                </li>
                                <li>
                                    <img className='img_workout' src="..\public\img_workout\Cable_Crunch.png" alt="" />
                                    <span><strong>Cable Crunch</strong></span>
                                    <Checkbox onChange={() => { onChange(event, 2) }} className='checkBox_workOut'></Checkbox>
                                </li>
                                <li>
                                    <img className='img_workout' src="..\public\img_workout\Cable_Twist.png" alt="" />
                                    <span><strong>Cable Twist</strong></span>
                                    <Checkbox onChange={() => { onChange(event, 3) }} className='checkBox_workOut'></Checkbox>
                                </li>
                                <li>
                                    <img className='img_workout' src="..\public\img_workout\Cross_Body_Crunch.png" alt="" />
                                    <span><strong>Cross Body Crunch</strong></span>
                                <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                            </li>
                            <li>
                                <img className='img_workout' src="..\public\img_workout\Crunch.png" alt="" />
                                <span><strong>Crunch</strong></span>
                                <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                            </li>
                            <li>
                                <img className='img_workout' src="..\public\img_workout\Bicep_Curl_Cable.png" alt="" />
                                <span><strong>Bicep Curl Cable</strong></span>
                                <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                            </li>
                            <li>
                                <img className='img_workout' src="..\public\img_workout\Bicep_Curl_Dumbbell.png" alt="" />
                                <span><strong>Bicep Curl Dumbbell</strong></span>
                                <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                            </li>
                        </ul>
                        }
                    </Modal>
                }
            </Modal>
        </section>
    )
}
