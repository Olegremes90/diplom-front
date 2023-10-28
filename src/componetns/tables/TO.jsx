import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useParams} from "react-router-dom";
import FilterTO from "../filters/FilterTO";
const TO = (data,headers) => {
    const[machine, setMachine] = useState({data:null, loading: false})
    const[to_list, setTo_list] = useState({data:null})

    useEffect(() => {
        setMachine({data: getID(data.data.data), loading:true})
    }, []);
    useEffect(()=>{
        if(machine.loading) {
         getTO()
        }
    },[machine])
    async function getTO(){
        const array = []
          const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
            for (const item of machine.data) {
                    array.push(await axios.post('http://127.0.0.1:8000/api/TO/', item.id, {headers}).then((result) => {
                        return {'arr':result.data.TO, 'number': item.number}

                    }).catch((error)=>{
                        return error
                    }))

            }
            return setTo_list({data:array})
    }
        const getID = (arg) => {

            const test = arg.map((item) => {
                return {'id':item.id, 'number': item.number_machine}
            })

           return test

        }
        const ChangeTO=(data)=>{
        setTo_list({data: data})
        }


    console.log(to_list)
    return (
        <div>

             <FilterTO ChangeTO={ChangeTO} machine={machine} getTO={getTO}/>
            {to_list.data ?

            <div  className='table-to-container'>

            {to_list.data.map((el, index)=>{
                console.log(el)
                return(
                    <div>
                    {el.arr.length ?
                            <div>
                                <div className='title-table'>
                                    <span className='number-machine'>TO для машины с номером {el.number}</span>
                                </div>

                                <table className='table-to'>
                                    <tr className='table-tr'>
                                        <td>№TO</td>
                                        <td>Вид ТО</td>
                                        <td>Дата проведения ТО</td>
                                        <td>Наработка м/час</td>
                                        <td>№ заказ-наряда</td>
                                        <td>Машина</td>
                                        <td>Сервисная компания</td>
                                        <td>Действия</td>

                                    </tr>

                                    {el.arr.map((it, index) => {
                                        console.log(it.to_vid)
                                        return (
                                            <tr key={index}>
                                                <td key={index}>{index + 1}</td>
                                                <td>
                                                    <Link to={`/vidto/${it.to_vid}/`}>{it.to_vid}</Link>
                                                </td>
                                                <td key={index}>{it.data_to}</td>
                                                <td key={index}>{it.narabotka}</td>
                                                <td key={index}>{it.number_zakaza}</td>
                                                <td key={index}>{it.car_number}</td>
                                                <td key={index}>
                                                     <Link to={`/service/${it.company}`}>{it.company}</Link>
                                                </td>
                                                <td key={index}>
                                                     <Link to={`/update-to/${it.id}`}>Изменить</Link>
                                                </td>

                                            </tr>

                                        )
                                    })}
                                </table>
                            </div>
                            : <div></div>
                    }
                    </div>
            )
            })}

            </div>
                :<h1>Hello</h1>
            }
               <div className='add-machine'>
            <Link to='/create-to'><button className='button-add'>Добавить ТО</button></Link>
               </div>
        </div>
    );
};

export default TO;