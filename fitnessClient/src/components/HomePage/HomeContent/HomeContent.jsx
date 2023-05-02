import React,{useEffect, useState} from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import Recipes from "../Recipes/Recipes";
import "./HomeContent.css"

export default function HomeContent() {
    const [recipes, setRecipes] = useState([]);
    const [type, setType] = useState('muscle')
    const [page, setPage] = useState(0)
    // const [type, setType] = useState('default')
    // const [page, setPage] = useState(1)
    
    const getRecipes=()=>{
        console.log('type:',type,' page: ',page)
        axios.get(`/api/plan/planList?tag=${type}&pageNo=${page}`).then(
            respose=>{
                console.log(respose.data)
                setRecipes(respose.data);
            },
            error=>{
                console.log("GetRecipesFail",error);
            }
            
        )
    }

    
    useEffect(()=>{
        const typeToken = PubSub.subscribe('gettype',(_,t)=>{
            setType(t)
            setPage(1)
        })
        
        return()=>{
            PubSub.unsubscribe(typeToken)
        }
    },[])
    
    useEffect(()=>{
        const pageToken = PubSub.subscribe('getpage',(_,p)=>{
            setPage(p)
        })
        
        return()=>{
            PubSub.unsubscribe(pageToken)
        }
    },[])

    useEffect(()=>{
        getRecipes();
    },[type,page])
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
            <div className="cotentCard">
                {
                    recipes.map((recipe)=>{
                        return <Recipes key={recipe._id} {...recipe} />
                    })
                }
            </div>
        </section>  
    )
}
