import React,{useEffect, useState} from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import Recipes from "../Recipes/Recipes";
import "./HomeContent.css"

export default function HomeContent() {
    const [recipes, setRecipes] = useState([]);
    const getRecipes=(type)=>{
        console.log(type)
        axios.get('/api/recipes').then(
            respose=>{
                // console.log("GetSuccess",respose.data);
                setRecipes(respose.data);
            },
            error=>{
                console.log("GetRecipesFail",error);
            }
            
        )
    }

    useEffect(()=>{
        getRecipes("default");
 
    },[])
    /*
    useEffect(()=>{
        axios.get(`/api/recipes/${type}`).then(
            respose=>{
                // console.log("GetSuccess",respose.data);
                setRecipes(respose.data);
            },
            error=>{
                console.log("GetRecipesFail",error);
            }
            
        )
 
    },type)

    */
    useEffect(()=>{
        const typeToken = PubSub.subscribe('gettype',(_,type)=>{
            getRecipes(type);
        })

        return()=>{
            PubSub.unsubscribe(typeToken)
        }
    },[])

    // componentDidMount=()=>{
    //     getRecipes("default");
    //     this.typeToken = PubSub.subscribe('gettype',(_,type)=>{
    //         getRecipes(type);
    //     })
    
    // }
    // componentWillUnmount=()=>{
    //     PubSub.unsubscribe(this.typeToken);
    // };
    return (
        <section className="homeContent">
            <div>
                {
                    recipes.map((recipe)=>{
                        return <Recipes key={recipe.id} {...recipe} />
                    })
                }
            </div>
        </section>  
    )
}
