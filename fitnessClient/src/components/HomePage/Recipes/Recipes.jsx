import React, { Component } from 'react'
import './Recipes.css'

export default class extends Component {
  render() {
    const {title, subtitle, type} = this.props
    return (
    <section className="Recipes">
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
        <div className="more-info">
            <button>-</button>
        </div>
    </section>
    )
  }
}
