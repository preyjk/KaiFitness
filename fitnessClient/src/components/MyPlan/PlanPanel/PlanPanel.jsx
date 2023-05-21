/*
 * @Author: jack_KaiJing 
 * @Date: 2023-05-21 20:22:17 
 * @Last Modified by:   jack_KaiJing 
 * @Last Modified time: 2023-05-21 20:22:17 
 */
import React,{useState,useEffect} from "react";
import { Pagination } from 'antd';
import "./PlanPanel.css"


export default function PageWapper() {
    
    const [current, setCurrent] = useState(1);
    const [pageNum, setPageNum] = useState(50);

    useEffect(()=>{
        const typeToken = PubSub.subscribe('gettype',(_,t)=>{
            setCurrent(1);
        })

        return()=>{
            PubSub.unsubscribe(typeToken)
        }
    },[])
    useEffect(()=>{
        const pages = PubSub.subscribe('getTotal',(_,t)=>{
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
