import React from 'react';
import logo from '../../img/svg-edited.svg'
import '../../styles/header.css';
import {Link} from 'react-router-dom';

const Header = () => {
     const LogOut = ()=>{
         localStorage.removeItem('access_Token')
         return window.location.reload();
    }
    return (
        <header>
         <div>
        <div className='container-header'>
            <img className='logo' src={logo} alt='#'/>
              <div className='head-1'>
                  <p className='phone'>+7-8352-20-12-09, telegram</p>
              </div>
              <div className='head-3'>
                  {!localStorage.getItem('access_Token') ?
                  <Link to='/login'><button className='button-login-1'>Авторизоваться</button></Link>
                      :<button className='button-login-1' onClick={LogOut}>Выйти</button>
                  }
              </div>
        </div>
          <h3 className='text-silant'>Электронная книжка "Мой Силант"</h3>
            </div>
            </header>
    );
};

export default Header;