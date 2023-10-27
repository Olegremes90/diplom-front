import React, {useEffect, useState} from 'react';
import axios from "axios";
import TO from "./TO";
import Complaint from './Complaint'
import {Link} from 'react-router-dom'
const Unauthorized = ({data}) => {

    const [button, setButton] = useState(0)
    const [group, setGroup] = useState()
    console.log(data)
    const log_ar = {
        'username': 'trudnikov',
        'password': 'Remes7654'
    }


    const ChangeButton = (arg) => {
        setButton(arg)
        console.log(button)
    }


    const LogIn = () => {
        const headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',

        }
        axios.post(`http://127.0.0.1:8000/auth/token/login/`, log_ar, {headers}).then(data => localStorage.setItem('access_Token', data.data.auth_token))
        console.log(data)
    }
    const LogOut = () => {
        return localStorage.removeItem('access_Token')
    }
  console.log(group)
    console.log(data[0].Machine[0])
    return (
        <div>


            <button onClick={()=>ChangeButton(0)}>Общая инфо</button>

                <div>
                <table  border="1">
                    <tr>
                        <td>Зав № машины</td>
                        <td>Модель техники</td>
                        <td>Модель двигателя</td>
                         <td>Зав № двигателя</td>
                         <td>Модель трансмиссии</td>
                         <td>Зав № трансмиссии</td>
                         <td>Модель управляемого моста</td>
                        <td>Зав № ведущего моста</td>
                         <td>Модель ведущего моста</td>
                        <td>Зав № управляемого моста</td>

                    </tr>
                        <tr>
                               <td>{data[0].Machine[0].number_machine}</td>
                               <td><a href='/SilantProject/frontend/src/componetns/tables/Books'>{data[0].Machine[0].title_technic}</a></td>
                               <td><a href='/SilantProject/frontend/src/componetns/tables/Books'>{data[0].Machine[0].title_engine}</a></td>
                               <td>{data[0].Machine[0].number_engine}</td>
                               <td>
                                   <Link to={`/transmisia/${data[0].Machine[0].title_transmisia}`}>{data[0].Machine[0].title_transmisia}</Link>
                               </td>
                               <td>{data[0].Machine[0].number_transmisia}</td>
                               <td>
                                   <Link to={`/bridge/${data[0].Machine[0].title_bridge}`}>{data[0].Machine[0].title_bridge}</Link>
                               </td>
                               <td>{data[0].Machine[0].number_lead}</td>
                               <td><a href='/SilantProject/frontend/src/componetns/tables/Books'>{data[0].Machine[0].title_lead}</a></td>
                                <td>{data[0].Machine[0].number_steerable_bridge}</td>

                           </tr>






                </table>

                </div>






        </div>
    );
};

export default Unauthorized;