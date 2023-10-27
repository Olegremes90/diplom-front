
import './App.css';
import TestApi from "./componetns/tables/TestApi";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React from "react";
import Login from "../src/componetns/login/Login";
import MainPage from "./componetns/pages/MainPage";
import AddAuto from "./componetns/pages/AddAuto";
import ChangeAuto from "./componetns/pages/ChangeAuto";
import NewComplaint from "./componetns/pages/NewComplaint";
import ChangeComplaint from "./componetns/pages/ChangeComplaint";
import NewTO from "./componetns/pages/NewTO";
import ChangeTO from "./componetns/pages/ChangeTO";
import BookTechnic from "./componetns/pages/BookTechnic";
import BookBridge from "./componetns/pages/BookBridge";
import BookEngine from "./componetns/pages/BookEngine";
import BookLead from "./componetns/pages/BookLead";
import BookService from "./componetns/pages/BookService";
import BookTransmisia from "./componetns/pages/BookTransmisia";
import BookRecovery from "./componetns/pages/BookRecovery";
import BookVidTO from "./componetns/pages/BookVidTO";
import BookUsel from "./componetns/pages/BookUsel";
import AllBooks from "./componetns/pages/AllBooks";
function App() {


  return (
  <BrowserRouter>
      <Routes>
          <Route path='/update-machine/:id' element={<ChangeAuto/>}/>
          <Route path='/update-to/:id' element={<ChangeTO/>}/>
          <Route path='/update-complaint/:id' element={<ChangeComplaint/>}/>
          <Route path='/lead/:title' element ={<BookLead/>}/>
          <Route path='/engine/:title' element ={<BookEngine/>}/>
          <Route path='/technic/:title' element ={<BookTechnic/>}/>
          <Route path='/bridge/:title' element={<BookBridge/>}/>
          <Route path='/transmisia/:title' element={<BookTransmisia/>}/>
          <Route path='/service/:title' element={<BookService/>}/>
          <Route path='/vidto/:title' element={<BookVidTO/>}/>
          <Route path='/usel/:title' element={<BookUsel/>}/>
          <Route path='/recovery/:title' element={<BookRecovery/>}/>
          <Route path='/create-machine' element={<AddAuto/>}/>
          <Route path='/create-to' element={<NewTO/>}/>
          <Route path='/create-complaint' element={<NewComplaint/>}/>
          <Route path='/books' element={<AllBooks/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<MainPage/>}/>

      </Routes>
  </BrowserRouter>
  );
}

export default App;
