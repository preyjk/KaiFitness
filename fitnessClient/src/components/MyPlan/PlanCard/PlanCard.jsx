/*
 * @Author: jack_KaiJing 
 * @Date: 2023-05-21 20:22:00 
 * @Last Modified by: jack_KaiJing
 * @Last Modified time: 2023-05-21 23:27:33
 */
import React, { useEffect, useState } from 'react'
import './PlanCard.css'
import { DeleteFilled } from '@ant-design/icons';

export default function Recipes(props) {
    const { name, information, type } = props
    const [planId, setPlanId] = useState()
    const [cardImg, setCardImg] = useState()

    return (
        <section className="planCard">
            <a href="#">
                <div>
                    <div>
                        <img src={props.type == "muscle" ? "workoutCard.jpg" : "dietCard.jpg"} alt="" />
                    </div>
                    <div className="summary">
                        <h1 className="title">
                            {name}
                            <span className="sub-title">
                                {information}
                            </span>
                        </h1>
                    </div>
                    <div className="primary-type">{type == 'diet' ? "Healthy Recipes" : "Sport Plan"}</div>
                    <DeleteFilled className='delete_btn' onClick={() => {
                        PubSub.publish("deletePlan", props._id)
                    }} />
                </div>
            </a>
        </section>
    )
}


