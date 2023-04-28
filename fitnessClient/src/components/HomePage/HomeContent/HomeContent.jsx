import React from "react";
import Recipes from "../Recipes/Recipes";
import "./HomeContent.css"
export default class HomeContent extends React.Component{

    render(){
        const {recipes} = this.props
        return(
            <section className="homeContent">
                <div>
                    {
                        recipes.map((recipe)=>{
                            return <Recipes key={recipe.id} {...recipe} />
                        })
                    }
                </div>
            </section>  
        );
    }
}

