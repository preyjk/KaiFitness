import React, { useState } from "react";
import { Input } from 'antd';
import "./SearchBar.css"

const { Search,count } = Input;
export default function SearchBar() {
    const[onload,setonload] = useState(false)
    const handleSearch=(key)=>{
        console.log(key)
        setonload(true)
        PubSub.publish('getkey',key)
        setonload(false)
    }
    const handleCheck=(e)=>{
        console.log(e.target.value)
        if (e.target.value == '') PubSub.publish('getkey','')
    }
    return (
        <Search className="searchBar" placeholder="input search text" onChange={handleCheck} onSearch={handleSearch} enterButton size="large" loading={onload}/>
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

