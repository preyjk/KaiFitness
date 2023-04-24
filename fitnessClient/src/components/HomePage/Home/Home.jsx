import React, { Component } from 'react'
import axios from 'axios'
import "./Home.css"
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import HomeContent from "../HomeContent/HomeContent";
import PageWapper from "../PageWapper/PageWapper";

export default class Home extends Component {
    state = {
        recipes:[
            
        ]   
    }
    getRecipes=()=>{
        axios.get('http://localhost:5173/api/recipes').then(
            respose=>{
                // console.log("GetHotSuccess",respose.data);
                this.setState({recipes:respose.data})
            },
            error=>{
                console.log("GetHotFail",error);
            }
            
        )
    }
    componentDidMount(){
        this.getRecipes()
    }
    
    render() {
        const {recipes} = this.state
        return (
            <div className="Home">
                <SearchBar />
                <Filter />
                {/* <button onClick={this.getRecipes}>getRecipes</button> */}
                <HomeContent recipes={recipes} />
                <PageWapper />
            </div>  
        )
    }
}