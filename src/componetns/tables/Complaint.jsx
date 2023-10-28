import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom';
import FilterComplaint from "../filters/FilterComplaint";

const Complaint = (data) => {
     const[machine, setMachine] = useState({data:null, loading: false})
    const[complaint_list, setComplaint_list] = useState({data:null})
      const [group, setGroup] = useState()

    useEffect(() => {
        setMachine({data: getID(data.data.data), loading:true})
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
                    array.push(await axios.get(`http://127.0.0.1:8000/api/complaint-filter/${item.id}`, {headers}).then((result) => {
                        return {'arr': result.data, 'number': item.number}

                    }).catch((error)=>{
                        return error
                    }))

            }
            return setComplaint_list({data:array})
    }
        const getID = (arg) => {

            const test = arg.map((item) => {
                return {'id': item.id,  'number': item.number_machine}
            })

           return test

        }
        const HandleChange=(data)=>{
        setComplaint_list({data:data})
        }
        console.log(group)
    console.log(complaint_list)
    console.log(machine)
    return (
        <div>
                  <FilterComplaint HandleChange={HandleChange} machine={machine} getTO={getTO}/>

            {complaint_list.data ?
                <div  className='table-complaint-container'>
            <div>

            {complaint_list.data.map((el, index)=>{
                console.log(el.arr)
                return(
                    <div>

                        {el.arr.length > 0 ?
                            <div>
                                <div className='title-table'>
                              <span className='number-machine'>Рекламации для машины с номером {el.number} </span>
                                </div>
                     <table  className='table table-to'>
                        <tr className='table-tr'>
                            <td>Дата отказа</td>
                            <td>Наработка м/ч</td>
                             <td>Узел отказа</td>
                             <td>Описание отказа</td>
                             <td>Способ восстановления</td>
                             <td>Используемые запасные части</td>
                            <td>Сервисная компания</td>
                            <td>Дата восстановления</td>
                            <td>Время простоя техники</td>
                            <td>Машина</td>
                             {group[0].Group[0].name !== 'clients'?
                            <td>Действия</td>
                                 :<div></div>
                             }


                        </tr>

                {el.arr.map((it,index)=>{
                    console.log(it)
                    console.log(it.id)
                    return(
                        <tr>
                        <td key={index}>{it.date_refusal}</td>
                             <td key={index}>{it.working_off}</td>
                             <td key={index}>
                                 <Link to={`/usel/${it.usel_title}`}>{it.usel_title}</Link>
                             </td>
                             <td key={index}>{it.description}</td>
                             <td key={index}>
                                 <Link to={`/recovery/${it.recovery_title}`}>{it.recovery_title}</Link></td>
                            <td key={index}>{it.spare_parts}</td>
                             <td key={index}>
                                  <Link to={`/service/${it.service_title}`}>{it.service_title}</Link></td>
                             <td key={index}>{it.date_recovery}</td>
                             <td  key={index}>{it.downtime.substring(0, it.downtime.length - 2)} дней</td>
                             <td  key={index}>{it.car_title}</td>
                              {group && group[0].Group[0].name !== 'clients'?
                            <td>
                              <Link to={`/update-complaint/${it.id}`}>Изменить</Link>
                            </td>
                                  :<div></div>
                              }



                        </tr>

                    )
                })}
                  </table>
                            </div>
                            :<div></div>
                        }
                    </div>
            )
            })}

            </div>
                </div>
                :<h1>Hello</h1>
            }
              {group && group[0].Group[0].name !== 'clients'?
                   <div className='add-machine'>
            <Link to='/create-complaint'><button className='button-add'>Добавить рекламацию</button></Link>
                   </div>
                  :<div></div>
              }

        </div>
    );
};

export default Complaint;