import React from 'react'
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import HomeContent from "../HomeContent/HomeContent";
import PageWapper from "../PageWapper/PageWapper";
import "./Home.css"

export default function Home() {
    return (
        <div className="Home">
            <SearchBar />
            <Filter />
            <HomeContent />
            <PageWapper />
        </div> 
    )
}
