import React from 'react';
import Header from "../header/Header";
import DirectoryService from "../Books/DirectoryService";
import Footer from "../footer/Footer";

const BookService = () => {
    return (
        <div>
            <Header/>
            <DirectoryService/>
            <Footer/>
        </div>
    );
};

export default BookService;