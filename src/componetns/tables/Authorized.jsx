import React, {useEffect, useState} from 'react';
import axios from "axios";
import TO from "./TO";
import Complaint from './Complaint'
import {Link} from 'react-router-dom'
import Filter from "../filters/Filter";
import '../../styles/table.css'
import '../../styles/machine.css'
const Authorized = () => {
    const [data, setData] = useState()
    const [state, setState] = useState()
    const [button, setButton] = useState(0)
    const [group, setGroup] = useState()
    const[service, setSevice]=useState()

    const log_ar = {
        'username': 'merkalov',
        'password': 'Remes7654'
    }
          const getData = async () => {

            const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                 'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
            const getMachine = await axios.get(`http://127.0.0.1:8000/api/machine-list`, {headers})
                .then((resp) => {
                    console.log(resp)
                    return resp
                }).catch((error) => {
                    console.log(error)
                })
            setData(getMachine)

        }

    useEffect(() => {


        getData()
         const getUserGroup = async () => {
        const headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
             'Authorization': `Token  ${localStorage.getItem('access_Token')}`
        }
        const getGroup = await axios.get('http://127.0.0.1:8000/api/group/', {headers}).then((response) => {
            return response.data
        }).catch((error) => {
            return error
        })
        setGroup(getGroup)
    }
        getUserGroup()

    }, [])
    useEffect(()=>{
        console.log(data)
    }, [data])

    console.log(button)
    console.log(data)
    const ChangeButton = (arg) => {
        setButton(arg)
        console.log(button)
    }
    const CheckButton = (button) => {
        if (button === 1) return <TO data={data}/>
        else if (button === 2) return <Complaint data={data}/>

    }


    function HandleChange(arg){
        setData(arg)
    }
  console.log(group)
    return (
        <div>


            <div className='cont'>
            <div className='container-button'>
             <button className={button===0? 'button-table': 'button-nonactive'} onClick={()=>ChangeButton(0)}>Общая инфо</button>
            <button  className={button===1? 'button-table': 'button-nonactive'} onClick={()=>ChangeButton(1)}>ТО</button>
            <button  className={button===2? 'button-table': 'button-nonactive'} onClick={()=>ChangeButton(2)}>Рекламации</button>
            </div>
            </div>
            {data && button === 0 ?
                <div>
                       <Filter ChangeData={HandleChange} getData={getData}/>
                <div className='table-wrap'>

                <table className='table'>
                    <tr className='table-tr'>
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
                        <td>Договор поставки №</td>
                        <td>Дата отгрузки с завода</td>
                          <td>Грузополучатель (конечный потребитель)</td>
                          <td>Адрес поставки</td>
                          <td>Комплектация</td>
                        <td>Клиент</td>
                        <td>Сервисная компания</td>
                          {group && group[0].Group[0].name === 'managers'?
                        <td>Действия</td>
                              :<div></div>
                          }
                    </tr>

                    {data.data.map((item)=>{
                       return(
                           <tr>
                               <td>{item.number_machine}</td>
                               <td><Link to={`/technic/${item.title_technic}`}>{item.title_technic}</Link></td>
                               <td> <Link to={`/engine/${item.title_engine}`}>{item.title_engine}</Link></td>
                               <td>{item.number_engine}</td>
                                  <td>
                                   <Link to={`/transmisia/${item.title_transmisia}`}>{item.title_transmisia}</Link>
                               </td>
                               <td>{item.number_transmisia}</td>
                               <td>
                                   <Link to={`/bridge/${item.title_bridge}`}>{item.title_bridge}</Link>
                               </td>
                               <td>{item.number_steerable_bridge}</td>
                               <td>
                                   <Link to={`/lead/${item.title_lead}`}>{item.title_lead}</Link>
                               </td>
                               <td>{item.number_lead}</td>
                               <td>{item.contract_postavka}</td>
                               <td>{item.date_otgruzka}</td>
                               <td>{item.consignee}</td>
                               <td>{item.adress}</td>
                               <td>{item.complectation}</td>
                               <td>{item.title_client}</td>
                               <td>
                                   <Link to={`/service/${item.title_service}`}>{item.title_service}</Link>
                               </td>
                               {group && group[0].Group[0].name === 'managers'?
                               <td>
                                     <Link to={`/update-machine/${item.id}`}>Изменить</Link>
                               </td>
                                   :<div></div>
                               }
                           </tr>


                       )
                    })}




                </table>
                </div>
                      {group && group[0].Group[0].name === 'managers'?
                          <div className='add-machine'>
                 <Link to='/create-machine'><button  className='button-add'>Добавить машину</button></Link>
                          </div>
                          :<div></div>
                      }
                </div>
            : CheckButton(button)


            }

        </div>
    );
};

export default Authorized;


