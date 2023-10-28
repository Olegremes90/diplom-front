import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../styles/table.css'
const AddTO = () => {

    const [service, setService] = useState()
    const [kindTO, setKindTO] = useState()
    const [vidi, setVidi] = useState()
    const[company, setCompany] = useState()
    const[date_to, setDate_to] = useState()
    const[dateZakaza, setDateZakaza] = useState()
    const[narabotka, setNarabotka] = useState()
    const[numberZakaza, setNumberZakaza] = useState()
    const[data, setData] = useState()
    const[number_machine, setNumber_machine] = useState()
    const [message, setMessage] = useState('')
      const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
    useEffect(()=>{
        const getData = async()=>{
        const getMachine = await axios.get('http://127.0.0.1:8000/apiv/todo/', {headers})
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
           const getVidiTOList= async ()=>{
        const get_vidi = await axios.get('http://127.0.0.1:8000/api/vidi/', {headers} ).
            then((result)=>{

                 return result.data.Vidi_TO

        }).catch((error)=>{
            return error
        })
    setVidi(get_vidi)
    }
    getVidiTOList()
    }, [])
    useEffect(()=>{
        console.log(company)
    },[service])
    const onFormSubmit=(e)=>{
        e.preventDefault();
        const state = {
                 'narabotka': narabotka,
            'number_zakaza': numberZakaza,
         'car': number_machine,
         'service_company': company,
          'vid_to': kindTO,
         'data_to': date_to,
            'data_zakaza': dateZakaza
        }
        axios.post('http://127.0.0.1:8000/api/to/add/', state, {headers}).then((response)=>{
           setMessage('Новое ТО было успешно добавлено!')
        }).catch((error)=>{
            setMessage('Упс что-то пошло не так, повторите попытку.')
        })
    }
    console.log(service)
    console.log(vidi)
    console.log(company)
    console.log(data)
    return (
        <div>
          <div className='update-to'>{message}</div>
        <div className='container-machine-add'>
            <h1>Добавление ТО</h1>
            <form action='' method='post' onSubmit={onFormSubmit}>
               <div><input placeholder='наработка' type='text' value={narabotka} onChange={e=>setNarabotka(e.target.value)}/></div>
                 <div><input placeholder='номер заказа' type='text' value={numberZakaza} onChange={e=>setNumberZakaza(e.target.value)}/></div>
                <div>
                     {data ?
             <select className='select-add' value={number_machine} onChange={e => setNumber_machine(e.target.value)}>
                 <option selected>Выберите машину</option>
                 {data.data.Machine.map((el)=>{
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
                 <option selected>Выберите сервисную компанию</option>
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
                 <div><input placeholder='дата заказа' type='text' value={dateZakaza} onChange={e=>setDateZakaza(e.target.value)} onFocus={(e)=>(e.target.type = 'date')}/></div>
                   <div><input placeholder='дата проведениия ТО' type='text' value={date_to} onChange={e=>setDate_to(e.target.value)} onFocus={(e)=>(e.target.type = 'date')}/></div>
                <button className='button-add-machine-to' type='submit'>Создать ТО</button>
            </form>
        </div>
        </div>
    );
};

export default AddTO;