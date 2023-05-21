import React, { useState } from "react";
import { Checkbox, Button, Modal, Input, InputNumber } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import XgPNG from '../xg.png';


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

export default function AddDiet(props) {
    const {open, onOk = () => {} , onCancel = () =>{}} = props;

    const [diet, setDiet] = useState({
        name: '',
        type: 'diet',
        imageBase64: '',
        information: '',
        detail: '',
        uuid: localStorage.getItem('uuid'),
        group: []
    });
    const [openAddGroup, setOpenAddGroup] = useState(false);
    const [list, setList] = useState([]);
    const addList = [];

    const onListChange = (checked, currentDiet) => {
        if(checked) {
            addList.push(currentDiet);
        } else {
            const index = addList.indexOf(item => item._id.$oid === currentDiet._id.$oid);
            if(index >= 0) {
                addList.splice(index, 1)
            }
        }
    }

    const onAddDietList = () => {
        const dietList = [];
        addList.forEach(item => {
            dietList.push({
                id: item._id.$oid,
                diet: item.name,
                weight: 0
            });
        })
        addList.length = 0;
        setList([...list, ...dietList])
        setOpenAddGroup(false);
    }

    const onAddDiet = () => {
        const addDiet = {...diet, group: list};
        console.log('add diet', addDiet);
        onOk(addDiet);
    }

    return (
        <Modal
            title="Add Diet Plan"
            centered
            open={open}
            onOk={onAddDiet}
            onCancel={onCancel}
            width={600}
            okText="Save"
            cancelText="Cancel"
        >
            <Input placeholder="Diet Plan Name" className="add_plan_name"
                onChange={(e) => {
                    setDiet({...diet, name: e.target.value})
                }}
            />
            <Input.TextArea placeholder="Description..." className="add_plan_des" autoSize
                onChange={(e) => {
                    setDiet({...diet, information: e.target.value})
                }}
            />
            <ul>
                {
                    list.map((item, index_out) =>
                    (
                        <li key={item.id}>
                            <h3 className="exercise_name">
                                {item.diet}
                                <button className="delete_exercise">
                                    <DeleteTwoTone twoToneColor={item.deleteColor}
                                        onClick={() => {
                                            const newArray = list.filter((_, i) => i !== index_out);
                                            setList(newArray);
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
                                        <InputNumber min={1} max={500} defaultValue={0} onChange={(val) => {
                                            list[index_out].weight = val;
                                            setList([...list]);
                                        }} />
                                    </li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </ul>
                        </li>)
                    )
                }
            </ul>
            <Button type='primary' className='btn_addWorkOut' onClick={() => {
                setOpenAddGroup(true);
            }}>Add Diet</Button>
            {
                openAddGroup &&
                <Modal
                    title="Add Diet"
                    open={openAddGroup}
                    onOk={onAddDietList}
                    onCancel={() => setOpenAddGroup(false)}
                    className='modal_add_workout'
                    okText="Add"
                    cancelText="Cancel"
                >
                    <h3 className='theme_workout'>Food</h3>
                    <hr />
                    <ul>
                        {
                            staticDietList.map(item => {
                                return <li key={item._id.$oid}>
                                    <img className='img_workout' src={XgPNG} alt="xg" />
                                    <span><strong>{item.name}</strong></span>
                                    <Checkbox onChange={(e) => {
                                        onListChange(e.target.checked, item)
                                    }} className='checkBox_workOut'></Checkbox>
                                </li>
                            })
                        }
                    </ul>
                </Modal>
            }
        </Modal>

    )
}