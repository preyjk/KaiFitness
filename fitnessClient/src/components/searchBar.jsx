import React from "react";
import "../styles/searchBar.css"
class SearchBar extends React.Component{
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

export default SearchBar;