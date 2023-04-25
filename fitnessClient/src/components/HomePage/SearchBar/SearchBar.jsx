import React,{setState, useRef} from "react";
import axios from "axios";
import "./SearchBar.css"

export default function SearchBar() {
    const keyWords = useRef()
    const search=()=>{
        const{current:{value:key}} = keyWords
        console.log(key)
        axios.get(`https://api.github.com/search/users?q=${key}`).then(
            response=>{console.log('S',response.data)},
            error=>{console.log('F',error)}
        )
    }
    return (
        <section className="searchBar">
            <input ref={keyWords} type="text" />
            <button onClick={search} >submit</button>
        </section>  
    )
}

