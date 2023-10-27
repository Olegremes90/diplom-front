import React from 'react';
import Header from "../header/Header";
import Books from "../tables/Books";
import Footer from "../footer/Footer";

const AllBooks = () => {
    return (
        <div>
            <Header/>
            <Books/>
            <Footer/>
        </div>
    );
};

export default AllBooks;