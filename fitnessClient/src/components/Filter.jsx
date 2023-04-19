import React from "react";
import "../styles/Filter.css"
class Filter extends React.Component{
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

export default Filter;