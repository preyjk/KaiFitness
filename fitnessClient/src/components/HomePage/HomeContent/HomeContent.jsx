import React,{useEffect, useState} from "react";
import PubSub from 'pubsub-js'
import axios from 'axios'
import Recipes from "../Recipes/Recipes";
import "./HomeContent.css"

export default function HomeContent() {
    const [recipes, setRecipes] = useState([]);
    const [type, setType] = useState(['mnew', 'muscle'])
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('')
    // const [type, setType] = useState('default')
    // const [page, setPage] = useState(1)
    
    const getRecipes=()=>{
        // console.log('type:',type,' page: ',page)
        axios.get(`/api/plan/planList?tag=${type[1]=='diet'?'diet':'muscle'}&pageNo=${page}&sort=${type[0]==('mnew'||'dnew')?'latest':null}1&queryContent=${keyword}`).then(
            respose=>{
                setRecipes(respose.data.data);  
                const pages = 10*Math.ceil(respose.data.totalcount/12);
                PubSub.publish('gettotal',pages)
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
        const typeToken = PubSub.subscribe('getkey',(_,t)=>{
            setKeyword(t)
            setPage(1)
        })
        
        return()=>{
            PubSub.unsubscribe(typeToken)
        }
    },[])



    useEffect(()=>{
        getRecipes();
    },[type,page,keyword])
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
