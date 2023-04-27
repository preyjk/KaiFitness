import React, { useState } from "react";
import { Input } from 'antd';
import axios from "axios";
import "./SearchBar.css"

const { Search } = Input;
export default function SearchBar() {
    const[onload,setonload] = useState(false)
    const handleSearch=(key)=>{
        console.log(key)
        setonload(true)
        axios.get(`https://api.github.com/search/users?q=${key}`).then(
            response=>{console.log('S',response.data)},
            error=>{console.log('F',error)}
        )
        setonload(false)
    }
    return (
        <Search className="searchBar" placeholder="input search text" onSearch={handleSearch} enterButton size="large" loading={onload}/>
    );
};
//     const keyWords = useRef()
//     const handleSearch=(value)=>{
//         const{current:{value:key}} = keyWords
//         console.log(key)
//         axios.get(`https://api.github.com/search/users?q=${key}`).then(
//             response=>{console.log('S',response.data)},
//             error=>{console.log('F',error)}
//         )
//     }
//     return (
//         <section className="searchBar">
//             <input ref={keyWords} type="text" />
//             <button onClick={search} >submit</button>
//         </section>  
//     )
// }

