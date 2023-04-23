import React from "react";
import "./Filter.css"
export default class Filter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section className="Filter">
                <a href="#">/Hot</a>
                <a href="#">/New</a>
                <a href="#">/Late</a>
                <a href="#">/**</a>
            </section>  
        );
    }
}
