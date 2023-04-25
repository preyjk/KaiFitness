import React from "react";
import PubSub from 'pubsub-js'
// import axios from 'axios'
import "./Filter.css"

export default function Filter() {
    const getType=(type)=>{
        return()=>{
            PubSub.publish('gettype',type)
        }
    }
    return (
        <section className="Filter">
            <a href="#" onClick={getType('hot')}>/Hot</a>
            <a href="#" onClick={getType('new')}>/New</a>
            <a href="#" onClick={getType('last')}>/Last</a>
            <a href="#" onClick={getType('default')}>/Default</a>
        </section> 
    )
}
