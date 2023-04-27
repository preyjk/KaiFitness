import React from 'react'
import './Recipes.css'

export default function Recipes(props) {
    const {title, subtitle, type} = props
    return (
        <section className="Recipes">
            <a href="#">
                <div>
                    <div>
                        <img src="https://d18zdz9g6n5za7.cloudfront.net/blog/640/640-1294-cucumber-cottage-cheese-and-grilled-chicken-toasts-9e16.jpg" alt="" />
                    </div>
                    <div className="summary">
                        <h1 className="title">
                            {title}
                            <span className="sub-title">                                
                                {subtitle}              
                            </span>
                        </h1>
                    </div>
                    <div className="primary-type">{type? "Healthy Recipes": "Sport Plan"}</div>
                </div>
                <div className='mask'>
                    <h2>Detial</h2>
                    <p>Meal Type: </p>
                    <p>Prep Time: </p>
                    <p>Cook Time: </p>
                </div>
            </a>
        </section>
  )
}


