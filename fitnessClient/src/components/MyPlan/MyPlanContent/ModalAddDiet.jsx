/*
 * @Author: jack_KaiJing 
 * @Date: 2023-05-21 20:21:23 
 * @Last Modified by: jack_KaiJing
 * @Last Modified time: 2023-05-21 22:07:01
 */
import React, { useEffect, useState } from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import { Checkbox, Button, Modal, Input, InputNumber } from 'antd';
import { DeleteTwoTone, MinusSquareOutlined } from '@ant-design/icons';

export default function ModalAddDiet(props) {

    const { TextArea } = Input;
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [planName, setPlanName] = useState();
    const [information, setInformation] = useState();
    const [checkedList, updateCheckList] = useState([false, false, false, false, false, false, false, false, false, false, false, false]);
    const [addListPrepare, updateAddListPrepare] = useState([]);
    const [addedList, updateAddedList] = useState([]);
    const ingredientGroup = [
        {
            id: 1,
            name: "Avocado",
            "_id": {
                "$oid": "645cbcebdab1b1c5fb11b2b2"
            }
        },
        {
            id: 2,
            name: "Cheese",
            "_id": {
                "$oid": "645cbcfadab1b1c5fb11b2b3"
            }
        },
        {
            id: 3,
            name: "Fish",
            "_id": {
                "$oid": "645cbd09dab1b1c5fb11b2b4"
            }
        },
        {
            id: 4,
            name: "Peas",
            "_id": {
                "$oid": "645cbd8ddab1b1c5fb11b2bc"
            }
        },
        {
            id: 5,
            name: "Carrot",
            "_id": {
                "$oid": "645cbd18dab1b1c5fb11b2b5"
            }
        },
        {
            id: 6,
            name: "Apple",
            "_id": {
                "$oid": "645cbd23dab1b1c5fb11b2b6"
            },
        },
        {
            id: 7,
            name: "Orange",
            "_id": {
                "$oid": "645cbd31dab1b1c5fb11b2b7"
            },
        },
        {
            id: 8,
            name: "Lemon",
            "_id": {
                "$oid": "645cbd3fdab1b1c5fb11b2b8"
            },
        },
        {
            id: 9,
            name: "Onion",
            "_id": {
                "$oid": "645cbd53dab1b1c5fb11b2b9"
            }
        },
        {
            id: 10,
            name: "Strawberry",
            "_id": {
                "$oid": "645cbd69dab1b1c5fb11b2ba"
            }
        },
        {
            id: 11,
            name: "Candy",
            "_id": {
                "$oid": "645cbd79dab1b1c5fb11b2bb"
            }
        },
        {
            id: 12,
            name: "Milk",
            "_id": {
                "$oid": "645cbd9cdab1b1c5fb11b2bd"
            }
        }
    ]

    // update plan panel
    const updatePlanPanel = () => {
        PubSub.publish("updatePlanPanel", true)
    }

    // addPlan
    const addPlan = () => {
        const uuid = localStorage.getItem('uuid');
        let group = [];
        for (let index = 0; index < addedList.length; index++) {
            const element = addedList[index];
            group.push({
                "diet": ingredientGroup[addedList[index].id - 1]._id.$oid,
                "number": 0,
                "weight": 1
            })
        }
        // console.log(group);
        const data = {
            "name": planName,
            "type": "diet",
            "imagBase64": "",
            "information": information,
            "detail": information,
            "uuid": uuid,
            "group": group
        }
        axios.post(`/api/plan/personal/AddPlan`, data).then(
            response => {
                console.log("successful:" + response.data);
                updatePlanPanel();
            },
            err => {
                console.log("err:" + err);
            }
        )
    }

    // select multipy ingredient
    const onChange = (e, id) => {
        // console.log(`checked = ${e.target.checked}`);
        const newArray = [...checkedList];
        newArray[id] = !newArray[id];
        updateCheckList(newArray);
        updateAddListPrepare(addListPrepare =>
            [...addListPrepare, {
                id: ingredientGroup[id].id,
                name: ingredientGroup[id].name,
                sets: [
                    {
                        kg: "0",
                        Reps: "30"
                    }
                ],
                deleteColor: '#5151f0'
            }])
    };

    // add diet plan list
    const addIngredient = (e) => {
        // console.log('addList:' + addList);
        const newArray = addListPrepare.slice();
        updateAddedList(newArray);
        for (let index = 0; index < checkedList.length; index++) {
            updateCheckList([false, false, false, false, false, false, false, false, false, false, false, false])
        }
        setOpen2(false)
    }

    useEffect(() => {
        const token = PubSub.subscribe('openModalAddDiet', (topic, openSwitch) => {
            setOpen(openSwitch)
        });

        return () => {
            PubSub.unsubscribe(token);
        };
    }, []);

    return (
        <Modal
            title="Add Diet Plan"
            centered
            open={open}
            onOk={
                () => {
                    setOpen(false);
                    addPlan();
                }
            }
            onCancel={() => {
                setOpen(false)
                setPlanName("")
                setInformation("")
                updateAddedList([])
                updateAddListPrepare([])
            }}
            width={600}
            okText="Save"
            cancelText="Cancel"
        >
            <Input placeholder="Diet Plan Name" className="add_plan_name"
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
                <li className="Diet_Para">
                    <span>Order</span>
                    <span>Ingredient</span>
                    <span>Gram</span>
                </li>
                {
                    addedList.map((item, index) => (
                        <li className="ingredient_item" key={index}>
                            <div className="ingredient_item_i">
                                <span>{index + 1}</span>
                            </div>
                            <div className="ingredient_item_i">{item.name}</div>
                            <div className="ingredient_item_i">
                                <InputNumber min={1} max={500} defaultValue={0} onChange={() => { }} />
                            </div>
                        </li>
                    ))
                }
            </ul>
            <Button type='primary' className='btn_addWorkOut' onClick={() => {
                setOpen2(true);
            }}>Add Ingredient</Button>
            <Modal title="Add Ingredient" open={open2} onOk={() => setOpen2(false)}
                onCancel={() => setOpen2(false)}
                footer={[
                    <Button key="Add" type='primary' onClick={addIngredient}>Add</Button>,
                    <Button key="Cancel" onClick={() => setOpen2(false)}>Cancel</Button>
                ]} className='modal_add_workout'>
                <h3 className='theme_workout'>Ingredient List</h3>
                <hr />
                <ul>
                    {
                        ingredientGroup.map((item, index) => (
                            <li key={index}>
                                <img className='img_workout' src={'../img_diet/' + item.name + '.jpg'} alt="" />
                                <span><strong> {item.name}</strong></span>
                                <Checkbox checked={checkedList[index]} onChange={() => { onChange(event, index) }} className='checkBox_workOut'></Checkbox>
                            </li>
                        )
                        )
                    }
                </ul>
            </Modal>
        </Modal>
    )
}
