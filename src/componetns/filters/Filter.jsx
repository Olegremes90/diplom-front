import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../../styles/filters.css'
const Filter = ({ChangeData, getData}) => {
     const[service, setService] = useState()
    const[lead, setLead] = useState()
    const[transmisia, setTransmisia] = useState()
    const[model_transmisia, setModel_transmisia] = useState()
    const[engine, setEngine] = useState()
    const[client, setClient] = useState()
    const[bridge, setBridge] = useState()
    const[technic, setTechnic] = useState()
    const[company, setCompany] =useState()
    const[user, setUser] = useState()
    const[steerable, setSteerable] = useState()
    const[model_lead, setModel_lead] = useState()
    const[model_engine, setModel_engine] = useState()
    const[model_technic, setModel_technic] = useState()
    const[filter, setFilter] = useState()
       const headers = {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                 'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
     useEffect(()=>{
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
        const getLead = async()=>{
        const lead_list = await axios.get('http://127.0.0.1:8000//lead/', {headers}).
            then((result)=>{
                return result.data.Lead
        }).catch((error)=>{
            return error
        })
        setLead(lead_list)
    }
    getLead()
        const getTechnic = async()=>{

            const technic_list = await axios.get('http://127.0.0.1:8000//technica/', {headers}).
                then((result)=>{
                    console.log( result.data.Technic)
                    return result.data.Technic
            }).catch((error)=>{
                return error
            })
            setTechnic(technic_list)
        }
        getTechnic()
        const getTransmisia = async()=>{

            const transmisia_list = await axios.get('http://127.0.0.1:8000//transmisia/', {headers}).
                then((result)=>{
                    return result.data.Transmisia
            }).catch((error)=>{
                return error
            })
            setTransmisia(transmisia_list)
        }
        getTransmisia()
        const getClients = async()=>{

            const client_list = await axios.get('http://127.0.0.1:8000//client/', {headers}).
                then((response)=>{
                    return response.data.Clients
            }).catch((error)=>{
                return error
            })
            setClient(client_list)
        }
        getClients()
        const getBridge = async()=>{

            const bridge_list = await axios.get('http://127.0.0.1:8000//steerablebridge/', {headers}).
                then((response)=>{
                    return response.data.Steerable_bridge
            }).catch((error)=>{
                return error
            })
            setBridge(bridge_list)
        }
        getBridge()
        const getEngine = async()=>{
               const headers = Headers
            const engine_list = await axios.get('http://127.0.0.1:8000//engine/', {headers}).
                then((response)=>{
                    return response.data.Engine
            }).catch((error)=>{
                return error
            })
            setEngine(engine_list)
        }
        getEngine()
    }, [])
    function filterUrl(arg, str){
         if(arg){
             return str.concat('=', arg)
         }
         else{
             return str
         }
    }

    const FilterMachine= async()=>{
         const filter_data = await axios.get(`http://127.0.0.1:8000//machine-list?${filterUrl(company, 'number')}&${filterUrl(model_transmisia, 'transmisia')}&${filterUrl(model_engine, 'engine')}&${filterUrl(model_technic, 'technic')}&${filterUrl(model_lead, 'lead')}&${filterUrl(steerable, 'steerable_bridge')}`, {headers}).then((response)=>{
             console.log(response)
            return response
         }).catch((error)=>{
             return error
         })
        ChangeData(filter_data)
       return filter_data
    }
    function Reset(){
         getData()
        setModel_transmisia(0)
        setModel_engine(0)
        setModel_technic(0)
        setModel_lead(0)
        setSteerable(0)
    }


    return (
        <div>
        <div className='container-filter'>
        <div className='filter-to'>


                {bridge ?
                 <select value={steerable} onChange={e => setSteerable(e.target.value)}>
                     <option selected>Выберите управляемый мост</option>
                     {bridge.map((it, index)=>{


                return(
                <option value={it.id} key={index}>{it.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }

                {lead?
                 <select value={model_lead} onChange={e=>setModel_lead(e.target.value)}>
                     <option selected> Выберите ведущий мост</option>
                     {lead.map((el, index)=>{
                         return(
                             <option value={el.id} key={index}>{el.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }

                {transmisia ?
                 <select value={model_transmisia} onChange={e=>setModel_transmisia(e.target.value)}>
                     <option value={0} selected>Выберите трансмиссию</option>
                     {transmisia.map((item, index)=>{
                           return(
                     <option value={item.id} key={index}>{item.title}</option>
                           )
                     }
                     )}

                 </select>
                    :<div></div>
                }

                {engine ?
                 <select value={model_engine} onChange={e=>setModel_engine(e.target.value)}>
                     <option value={0} selected>Выберите модель двигателя</option>
                     {engine.map((el, index)=>{
                         return(
                             <option value={el.id} key={index}>{el.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }

                {technic ?
                 <select value={model_technic} onChange={e=>setModel_technic(e.target.value)}>
                     <option value={0} selected>Выберите модель техники</option>
                     {technic.map((it, index)=>{
                         console.log(technic)
                         return(
                             <option value={it.id} key={index}>{it.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }
                </div>
        </div>
            <div className='container-button-filter'>
                <button className='filter-button' onClick={FilterMachine}>Применить параметры фильтра</button>
                <button className='filter-button' onClick={Reset}>Сбросить фильтры</button>
            </div>

        </div>
    );
};

export default Filter;