import React from "react";
import "./Filter.css"
import axios from 'axios'
export default class Filter extends React.Component{
    getHot=()=>{
        axios.get().then(
            respose=>{
                console.log("GetHotSuccess",respose.data);
            },
            error=>{
                console.log("GetHotFail",error);
            }
            
        )
    }
    render(){
        return(
            <section className="Filter">
                <a href="#" onClick={this.getHot}>/Hot</a>
                <a href="#">/New</a>
                <a href="#">/Late</a>
                <a href="#">/**</a>
            </section>  
        );
    }
}
