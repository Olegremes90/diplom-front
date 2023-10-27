import React from 'react';
import Header from "../header/Header";
import DirectoryBridge from "../Books/DirectoryBridge";
import Footer from "../footer/Footer";

const BookBridge = () => {
    return (
        <div>
            <Header/>
            <DirectoryBridge/>
            <Footer/>
        </div>
    );
};

export default BookBridge;