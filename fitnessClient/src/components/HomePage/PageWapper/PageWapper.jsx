import React,{useState} from "react";
import { Pagination } from 'antd';
import "./PageWapper.css"


export default function PageWapper() {
    const [current, setCurrent] = useState(1);
    const onChange = (page) => {
        console.log(page);
        setCurrent(page);
    };
    return <Pagination className="pageWapper" current={current} onChange={onChange} total={50} />;
}
