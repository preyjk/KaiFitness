import React, { useEffect, useState } from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import { Checkbox, Button, Modal, Input, InputNumber } from 'antd';
import { DeleteTwoTone, MinusSquareTwoTone } from '@ant-design/icons';
import Recipes from "../Recipes/Recipes";
import "./MyPlanContent.css"

export default function HomeContent() {
    const [recipes, setRecipes] = useState([]);
    const [type, setType] = useState(['mnew', 'muscle'])
    const [page, setPage] = useState(1)

    const getRecipes = () => {
        // console.log('type:', type, ' page: ', page)
        axios.get(`/api/plan/planList?tag=${type[1] == 'diet' ? 'diet' : 'muscle'}&pageNo=${page}&sort=${type[0] == ('mnew' || 'dnew') ? 'latest' : null}`).then(
            respose => {
                // console.log(respose.data)
                setRecipes(respose.data.data);
                const pages = 10 * Math.ceil(respose.data.totalcount / 12);
                PubSub.publish('gettotal', pages)
            },
            error => {
                console.log("GetRecipesFail", error);
            }

        )
    }

    useEffect(() => {
        const typeToken = PubSub.subscribe('gettype', (_, t) => {
            setType(t)
            setPage(1)
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
    let addList = [];

    // select multipy workout
    const onChange = (e, id) => {
        console.log(`checked = ${e.target.checked}`);
        console.log('id:' + id);
        addList.push({ id: id });
    };

    const sets = [2, 3, 4]

    // add workout plan list
    const addWorkOut = (e) => {
        console.log(addList);
        updateWorkoutList([...workoutList, addList]),
            () => {
                console.log('workoutList' + workoutList);
            }
    }

    return (
        <section className="homeContent">
            <div className="cotentCard">
                {
                    recipes.map((recipe) => {
                        return <Recipes key={recipe._id} {...recipe} />
                    })
                }
                <div className="btn_addPlan" onClick={() => setOpen(true)}> + </div>
            </div>
            <Modal
                title="Add Workout Plan"
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={600}
                okText="Save"
                cancelText="Cancel"
            >
                <Input placeholder="Workout Plan Name" className="add_plan_name" />
                <TextArea placeholder="Description..." className="add_plan_des" autoSize />
                <ul>
                    <li>
                        <h3 className="exercise_name">
                            V Up
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
                                    <InputNumber min={1} max={500} defaultValue={30} onChange={() => { }} />
                                </li>
                                <li>
                                    <div className="delete_set">
                                        <MinusSquareTwoTone />
                                    </div>
                                </li>
                            </ul>
                            {
                                sets.map((set) =>
                                    <ul className="excercise_theme" key={set}>
                                        <li>
                                            <div className="number_div">{set}</div>
                                        </li>
                                        <li>
                                            <InputNumber min={1} max={500} defaultValue={0} onChange={() => { }} />
                                        </li>
                                        <li>
                                            <InputNumber min={1} max={500} defaultValue={30} onChange={() => { }} />
                                        </li>
                                        <li>
                                            <div className="delete_set">
                                                <MinusSquareTwoTone />
                                            </div>
                                        </li>
                                    </ul>
                                )
                            }
                        </ul>
                    </li>
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
                                            <InputNumber min={1} max={500} defaultValue={30} onChange={() => { }} />
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
                </ul>
                <Button type='primary' className='btn_addWorkOut' onClick={() => setOpen2(true)}>Add Exercises</Button>
                <Modal title="Add Workout" open={open2} onOk={() => setOpen2(false)}
                    onCancel={() => setOpen2(false)} footer={[
                        <Button key="Add" type='primary' onClick={addWorkOut}>Add</Button>,
                        <Button key="Cancel">Cancel</Button>
                    ]} className='modal_add_workout'>
                    <h3 className='theme_workout'>Core</h3>
                    <hr />
                    <ul>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\core\Bicycle_Crunch.png" alt="" />
                            <span><strong>Bicycle Crunch</strong></span>
                            <Checkbox onChange={() => { onChange(event, 1) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\core\Cable_Crunch.png" alt="" />
                            <span><strong>Cable Crunch</strong></span>
                            <Checkbox onChange={() => { onChange(event, 2) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\core\Cable_Twist.png" alt="" />
                            <span><strong>Cable Twist</strong></span>
                            <Checkbox onChange={() => { onChange(event, 3) }} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\core\Cross_Body_Crunch.png" alt="" />
                            <span><strong>Cross Body Crunch</strong></span>
                            <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\core\Crunch.png" alt="" />
                            <span><strong>Crunch</strong></span>
                            <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                        </li>
                    </ul>
                    <h3 className='theme_workout'>Arms</h3>
                    <hr />
                    <ul>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\arms\Bicep_Curl_Cable.png" alt="" />
                            <span><strong>Bicep Curl Cable</strong></span>
                            <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                        </li>
                        <li>
                            <img className='img_workout' src="..\public\img_workout\arms\Bicep_Curl_Dumbbell.png" alt="" />
                            <span><strong>Bicep Curl Dumbbell</strong></span>
                            <Checkbox onChange={onChange} className='checkBox_workOut'></Checkbox>
                        </li>
                    </ul>
                    <h3 className='theme_workout'>Back</h3>
                    <hr />
                    <ul></ul>
                    <h3 className='theme_workout'>Chest</h3>
                    <hr />
                    <ul></ul>
                    <h3 className='theme_workout'>Legs</h3>
                    <hr />
                    <ul></ul>
                    <h3 className='theme_workout'>Shoulders</h3>
                    <hr />
                    <ul></ul>
                    <h3 className='theme_workout'>Cardio</h3>
                    <hr />
                    <ul></ul>
                    <h3 className='theme_workout'>Other</h3>
                    <hr />
                    <ul></ul>
                </Modal>
            </Modal>
        </section>
    )
}
