import React from "react";
import "../styles/Home.css"
import SearchBar from "./searchBar";
import Filter from "./Filter";
import HomeContent from "./homeContent";
import PageWapper from "./PageWapper";
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