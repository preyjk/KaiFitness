import React,{useState,useEffect} from "react";
import { Pagination } from 'antd';
import "./PageWapper.css"


export default function PageWapper() {
    
    const [current, setCurrent] = useState(1);
    const [pageNum, setPageNum] = useState(50);
    // const getPage=()=>{
    //     PubSub.publish('getpage',current)
    // }
    useEffect(()=>{
        const typeToken = PubSub.subscribe('gettype',(_,t)=>{
            setCurrent(1);
        })

        return()=>{
            PubSub.unsubscribe(typeToken)
        }
    },[])
    useEffect(()=>{
        const pages = PubSub.subscribe('gettotal',(_,t)=>{
            setPageNum(t);
        })
        
        return()=>{
            PubSub.unsubscribe(pages)
        }
    },[])
    const onChange = (page) => {
        PubSub.publish('getpage',page)
        setCurrent(page);
    };

    return <Pagination className="pageWapper" current={current} onChange={onChange} total={pageNum}  />;
}
