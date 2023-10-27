import React, {useState, useEffect} from 'react';
import axios from 'axios';
const FilterTO = ({ChangeTO, machine, HandleChange, getTO}) => {

    const [service, setService] = useState()
    const [kindTO, setKindTO] = useState()
    const [vidi, setVidi] = useState()
    const[company, setCompany] = useState()
    const[data, setData] = useState()
    const[number_machine, setNumber_machine] = useState()

      const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
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
    useEffect(()=>{
        console.log(company)
    },[service])
     async function getTODetail(){
        const array = []
          const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
            for (const item of machine.data) {

                    array.push(await axios.get(`http://127.0.0.1:8000//todo/${item.id}?${filterUrl(number_machine, 'machine')}&${filterUrl(kindTO, 'vid_to')}&${filterUrl(company, 'company')}`, {headers}).then((result) => {
                        console.log(result)
                        return {'arr':result.data, 'number': item.number}

                    }).catch((error)=>{
                        return error
                    }))

            }
            return ChangeTO(array)
    }
     console.log(machine)

    function filterUrl(arg, str){
        console.log(arg)
        if(arg && arg > 0){
            console.log(arg)
            return str.concat('=', arg)
        }
        else {
             console.log(arg)
            return str
        }
    }
    const Clean=()=>{
        getTO()
        setCompany(0)
        setKindTO(0)
        setNumber_machine(0)
    }
    return (
        <div>





                <div className='container-filter'>
        <div className='filter-to'>
                     {data ?
             <select value={number_machine} onChange={e => setNumber_machine(e.target.value)}>
                 <option  value={0} selected>Выберите машину</option>
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

                {service ?
             <select value={company} onChange={e => setCompany(e.target.value)}>
                 <option  value={0} selected>Выберите сервисную компанию</option>
                 {service.map((el, index)=>{

                 return(

                  <option key={el.id} value={el.id}>
             {el.title}
                  </option>
                    )
                 })}
             </select>
                    : <div></div>
                }


                {vidi ?
                <select value={kindTO} onChange={e=> setKindTO(e.target.value)}>
                    <option value={0} selected>Выберите вид ТО</option>
                    {vidi.map((it)=>{
                        return(
                            <option value={it.id}>{it.title}</option>
                        )
                    })}

                </select>
                    :<div></div>
                }
                  <button  className='filter-button-to' onClick={getTODetail}>Применить фильтр</button>
                <button  className='filter-button-to'type='submit' onClick={Clean}>Сбросить фильтр</button>
                </div>
                </div>

        </div>
    );
};

export default FilterTO;