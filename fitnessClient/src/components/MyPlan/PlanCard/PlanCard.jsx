/*
 * @Author: jack_KaiJing 
 * @Date: 2023-05-21 20:22:00 
 * @Last Modified by: jack_KaiJing
 * @Last Modified time: 2023-05-21 21:42:13
 */
import React, { useEffect, useState } from 'react'
import './PlanCard.css'
import { DeleteFilled } from '@ant-design/icons';

export default function Recipes(props) {
    const { name, information, type } = props
    const [planId, setPlanId] = useState();

    return (
        <section className="planCard">
            <a href="#">
                <div>
                    <div>
                        <img src="https://d18zdz9g6n5za7.cloudfront.net/blog/640/640-1294-cucumber-cottage-cheese-and-grilled-chicken-toasts-9e16.jpg" alt="" />
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


