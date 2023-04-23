import React from "react";
import "./SearchBar.css"
export default class SearchBar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section className="searchBar">
                <input type="text" />
                <button>submit</button>
            </section>  
        );
    }
}
