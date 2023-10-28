import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const UpdateComplaint = () => {
    const[service, setService] = useState()
    const[usel, setUsel] = useState()
    const[company, setCompany] = useState()
    const[uselValue, setUselValue] = useState()
    const[dateRefusal, setDateRefusal] = useState()
    const[working, setWorking] = useState()
    const[description, setDescription] = useState()
    const[recovery, setRecovery] = useState()
    const[spareParts, setSpareParts] =useState()
    const[daterecovery, setDateRecovery] = useState()
    const [methods, setMethods] = useState()
    const[number_machine, setNumber_machine] = useState()
    const[data, setData] = useState()
    const[title, setTitle] = useState()
     const[message, setMessage] = useState('')
    const params = useParams()

    useEffect(()=>{
        console.log(company)
    },[company])

     const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
    useEffect(()=>{
          const getData = async()=>{
        const getMachine = await axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then((resp) => {
                console.log(resp)
            return resp
            }).catch((error)=>{
                console.log(error)
            })
            setData(getMachine)

        }
        getData()
        const getServiceList= async ()=>{
        const headers = Headers
        const get_serrvice = await axios.get('http://127.0.0.1:8000/api/service/', {headers} ).
            then((result)=>{
                console.log(result)
               return result.data.Service

        }).catch((error)=>{
            return error
        })
               setService(get_serrvice)

    }
    getServiceList()
        const getUselList= async ()=>{
        const headers = Headers
        const get_usels = await axios.get('http://127.0.0.1:8000/api/usel/', {headers} ).
            then((result)=>{
                    console.log(result.data.Usels)
                 return result.data.Usels

        }).catch((error)=>{
            return error
        })
    setUsel(get_usels)
    }
    getUselList()
        const getrecoveryList = async () =>{
            const headers = Headers
            const get_recovery = await axios.get('http://127.0.0.1:8000/api/recovery/', {headers}).
                then((response)=>{
                    console.log(response)
                    return response.data.Recovery
            }).catch((error)=>{
                return error
            })
            setRecovery(get_recovery)
        }
        getrecoveryList()
        }, [])
    const UpdateComplaint=(e)=>{
          e.preventDefault();
        const headers = Headers
        const state = {
            'id': 1,
             'date_refusal': dateRefusal,
            'working_off': working,
            'usel' : uselValue,
            'description': description,
            'recovery': methods,
            'spare_parts': spareParts,
            'date_recovery':daterecovery,
            'car_complaint': number_machine,
            'service_org': company,
        }
        axios.patch(`http://127.0.0.1:8000/api/complaint/${params.id}`, state, {headers}).then((result)=>{
            console.log(result.data.car_title)
            setTitle(result.data.car_title)
        }).catch((error)=>{
            setMessage('Упс что-то пошло не так, повторите попытку.')
        })
    }
    console.log(data)
    return (
        <div>
            {title?
            <div className='update-to'>Данные рекламации для машины с номером {title} были успешно изменены!</div>
                :<div className='update-to'>{message}</div>
            }
            <div className='container-machine-add'>
            <h1>Изменение рекламации</h1>
            <form action='' method='post' onSubmit={UpdateComplaint}>
                <div><input placeholder='дата отказа' type='text' value={dateRefusal} onChange={e=>setDateRefusal(e.target.value)} onFocus={(e)=>(e.target.type = 'date')}/></div>
              <div><input placeholder='наработка' type='text' value={working} onChange={e=>setWorking(e.target.value)}/></div>
              <div><input placeholder='описание отказа' type='text' value={description} onChange={e=>setDescription(e.target.value)}/></div>
              <div><input placeholder='запасные части' type='text' value={spareParts} onChange={e=>setSpareParts(e.target.value)}/></div>
              <div><input placeholder='дата восстановления' type='text' value={daterecovery} onChange={e=>setDateRecovery(e.target.value)} onFocus={(e)=>(e.target.type = 'date')}/></div>

                    <div>
                     {data ?
             <select className='select-add' value={number_machine} onChange={e => setNumber_machine(e.target.value)}>
                 <option selected>Выберите машину</option>
                 {data.data.Machine.map((el, index)=>{
                 return(
                  <option value={el.id}>
             {el.number_machine}
                  </option>
                    )
                 })}
             </select>
                      : <div></div>
                }
                </div>
                 <div>
        {service ?
                    <div>

             <select className='select-add' value={company} onChange={e => setCompany(e.target.value)}>
                    <option>Выберите сервисную компанию</option>
                 {service.map((el)=>{
                 return(
                  <option value={el.id}>
             {el.title}
                  </option>
                    )
                 })}
             </select>
                    </div>
                    : <div></div>
                }
                </div>
                 <div>
                {usel ?
                    <div>
             <select className='select-add' value={uselValue} onChange={e => setUselValue(e.target.value)}>
                   <option selected>Выберите узел отказа</option>
                 {usel.map((el)=>{
                 return(
                  <option value={el.id}>
             {el.title}
                  </option>
                    )
                 })}
             </select>
                    </div>
                    : <div></div>
                }
                </div>
                 <div>
                  {recovery ?
                    <div>
             <select className='select-add' value={methods} onChange={e => setMethods(e.target.value)}>
                   <option selected>Выберите способ восстановления</option>
                 {recovery.map((el)=>{
                 return(
                  <option value={el.id}>
             {el.title}
                  </option>
                    )
                 })}
             </select>
                    </div>
                    : <div></div>
                }
                </div>
                <button className='button-add-machine' type='submit'>Изменить рекламацию</button>
            </form>

        </div>
        </div>
    );
};

export default UpdateComplaint;