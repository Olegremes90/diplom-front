import React from 'react';
import Header from "../header/Header";
import Authorized from '../tables/Authorized'
import Unauthorized from "../tables/Unauthorized";
import TestApi from "../tables/TestApi";
import Footer from "../footer/Footer";
const MainPage = () => {
    return (
        <div>
            <Header/>
            {window.localStorage.getItem('access_Token')?
                <Authorized/>
                :<TestApi/>
            }

            <Footer/>
        </div>
    );
};

export default MainPage;