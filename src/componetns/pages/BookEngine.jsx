import React from 'react';
import Header from "../header/Header";
import DirectoryEngine from "../Books/DirectoryEngine";
import Footer from "../footer/Footer";

const BookEngine = () => {
    return (
        <div>
            <Header/>
            <DirectoryEngine/>
            <Footer/>
        </div>
    );
};

export default BookEngine;