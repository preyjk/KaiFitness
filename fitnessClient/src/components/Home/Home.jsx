import React from "react";
import "./Home.css"
import SearchBar from "../SearchBar/SearchBar";
import Filter from "../Filter/Filter";
import HomeContent from "../HomeContent/HomeContent";
import PageWapper from "../PageWapper/PageWapper";
const Home = () => {
    return(
        <div className="Home">
            <SearchBar />
            <Filter />
            <HomeContent />
            <PageWapper />
        </div>  
    );
};

export default Home;