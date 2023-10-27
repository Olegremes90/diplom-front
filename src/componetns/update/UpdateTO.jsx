import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
const UpdateTO = () => {

    const [service, setService] = useState()
    const [kindTO, setKindTO] = useState()
    const [vidi, setVidi] = useState()
    const[company, setCompany] = useState()
    const[date_to, setDate_to] = useState()
    const[dateZakaza, setDateZakaza] = useState()
    const[narabotka, setNarabotka] = useState()
    const[numberZakaza, setNumberZakaza] = useState()
    const[number_machine, setNumber_machine] = useState()
    const[result, setResult] = useState()
    const[message, setMessage] = useState('')
    const[data, setData] = useState()
      const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
     const params = useParams()
    useEffect(()=>{
             const getData = async()=>{
        const getMachine = await axios.get('http://127.0.0.1:8000//todo/', {headers})
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

        const get_serrvice = await axios.get('http://127.0.0.1:8000//service/', {headers} ).
            then((result)=>{
                console.log(result)
               return result.data.Service

        }).catch((error)=>{
            return error
        })
               setService(get_serrvice)

    }
    getServiceList()
           const getVidiTOList= async ()=>{
        const headers = Headers
        const get_vidi = await axios.get('http://127.0.0.1:8000//vidi/', {headers} ).
            then((result)=>{

                 return result.data.Vidi_TO

        }).catch((error)=>{
            return error
        })
    setVidi(get_vidi)
    }
    getVidiTOList()
    }, [])

    const onFormSubmit=(e)=>{
        e.preventDefault();
        const headers = Headers
        const state = {
                 'narabotka': narabotka,
            'number_zakaza': numberZakaza,
         'service_company': company,
          'vid_to': kindTO,
         'data_to': date_to,
            'data_zakaza': dateZakaza,
                'car': number_machine
        }
        axios.patch(`http://127.0.0.1:8000//TO/${params.id}`, state, {headers}).then((response)=>{
            console.log(response.data)
            setResult(response.data)
        }).catch((error)=>{
            setMessage('Упс! Что-то пошло не так, повторите попытку.')
        })
    }





    console.log(service)
    console.log(vidi)
    console.log(company)
    return (
        <div>
            {result?
            <div className='update-to'>Данные ТО для машины с номером {result.car_title} были успешно изменены!</div>
                :<div className='update-to'>{message}</div>
            }
        <div className='container-machine-add'>
            <h1>Изменение записей в ТО</h1>
            <form action='' method='post' onSubmit={onFormSubmit}>
                   <div>   <input placeholder='наработка' type='text' value={narabotka} onChange={e=>setNarabotka(e.target.value)}/></div>
                   <div>   <input placeholder='номер заказа' type='text' value={numberZakaza} onChange={e=>setNumberZakaza(e.target.value)}/></div>
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
             <select className='select-add' value={company} onChange={e => setCompany(e.target.value)}>
                 <option selected>Выберите сервисную огранизацию</option>
                 {service.map((el)=>{
                 return(
                  <option value={el.id}>
             {el.title}
                  </option>
                    )
                 })}
             </select>
                      : <div></div>
                }
                </div>
                  <div>
                {vidi ?
                <select className='select-add' value={kindTO} onChange={e=> setKindTO(e.target.value)}>
                    <option selected>Выберите вид ТО</option>
                    {vidi.map((it)=>{
                        return(
                            <option value={it.id}>{it.title}</option>
                        )
                    })}

                </select>
                    :<div></div>
                }
                </div>
                  <div><input placeholder='дата заказа' type='text' value={dateZakaza} onChange={e=>setDateZakaza(e.target.value)} onFocus={(e)=>(e.target.type ='date')}/></div>
                      <div><input placeholder='дата проведения ТО' type='text' value={date_to} onChange={e=>setDate_to(e.target.value)} onFocus={(e)=>(e.target.type ='date')}/></div>
                <button  className='button-add-machine-to'type='submit'>Изменить</button>
            </form>

        </div>
        </div>
    );
};

export default UpdateTO;