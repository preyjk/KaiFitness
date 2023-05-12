import React from 'react'
import './Recipes.css'

export default function Recipes(props) {
    const {name, information, type} = props
    return (
        <section className="Recipes">
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
                    <div className="primary-type">{type=='diet'? "Healthy Recipes": "Sport Plan"}</div>
                </div>
            </a>
        </section>
  )
}


