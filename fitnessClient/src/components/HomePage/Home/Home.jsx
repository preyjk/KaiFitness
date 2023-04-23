import React, { Component } from 'react'
import "./Home.css"
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import HomeContent from "../HomeContent/HomeContent";
import PageWapper from "../PageWapper/PageWapper";

export default class Home extends Component {
    state = {
        recipes:[
            {
                id:"1", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

            },
            {
                id:"2", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

            },
            {
                id:"3", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
                
            },
            {
                id:"4", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
                
            },
            {
                id:"5", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,

            },
            {
                id:"6", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
                
            },
            {
                id:"7", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

            },
            {
                id:"8", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
                
            },
            {
                id:"9", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

            },
            {
                id:"10", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:false,
                
            },
            {
                id:"11", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,

            },
            {
                id:"12", title:"Cucumber, Cottage Cheese, and Grilled Chicken Toasts",
                subtitle:"With Balsamic Vinegar and Italian Herbs", type:true,
                
            }
        ]   
    }
    
    render() {
        const {recipes} = this.state
        return (
            <div className="Home">
                <SearchBar />
                <Filter />
                <HomeContent recipes={recipes} />
                <PageWapper />
            </div>  
        )
    }
}