import React from "react";
import "./PageWapper.css"
export default class PageWapper extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <section className="pageWapper">
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </section>  
        );
    }
}
