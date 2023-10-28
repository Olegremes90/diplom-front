import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../../styles/table.css'
import '../../styles/filters.css'
const FilterComplaint = ({HandleChange, machine, getTO}) => {
     const[service, setService] = useState()
    const[usel, setUsel] = useState()
    const[company, setCompany] = useState()
    const[uselValue, setUselValue] = useState()
    const[recovery, setRecovery] = useState()
    const [methods, setMethods] = useState()
      const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
        async function getСomplaints(){
        const array = []
            for (const item of machine.data) {
                    array.push(await axios.get(`http://127.0.0.1:8000/api/complaint-filter/${item.id}?${filterUrl(company, 'service')}&${filterUrl(uselValue, 'usel')}&${filterUrl(methods, 'recovery')}`, {headers}).then((result) => {
                        return {'arr': result.data, 'number': item.number}

                    }).catch((error)=>{
                        return error
                    }))

            }
            return HandleChange(array)
    }
        function filterUrl(arg, str){
         if(arg && arg >0){
             return str.concat('=', arg)
         }
         else{
             return str
         }
    }
    useEffect(()=>{
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
        const getUselList= async ()=>{

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
    const cleanFilter=()=>{
         getTO()
        setCompany(0)
        setUselValue(0)
        setMethods(0)
    }
    return (
          <div className='container-filter'>
        <div className='filter-to'>
            {service ?
                    <div>

             <select value={company} onChange={e => setCompany(e.target.value)}>
                    <option value={0} selected>Выберите сервисную компанию</option>
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
                {usel ?
                    <div>

             <select value={uselValue} onChange={e => setUselValue(e.target.value)}>
                   <option value={0} selected>Выберите узел отказа</option>
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
                  {recovery ?
                    <div>

             <select value={methods} onChange={e => setMethods(e.target.value)}>
                   <option value={0} selected>Выберите способ восстановления</option>
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
            <button className='filter-button-to' onClick={getСomplaints}>Отфильтровать</button>
            <button  className='filter-button-to' onClick={cleanFilter}>Сбросить параметры фильтра</button>
        </div>
          </div>
    );
};

export default FilterComplaint;