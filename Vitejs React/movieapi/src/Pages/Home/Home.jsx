import React from "react";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/Banner/Banner";
import Popular from "../../Components/Popular/Popular";
import Trending from "../../Components/Trending/Trending";
import Toprated from "../../Components/Toprated/Toprated";




export default function Home() {



    return (
        <>

            <Header path ={"Movies and TV shows"}/>

            <Banner />

            <Popular />

            <Trending />

            <Toprated/>

        </>
    )


}
