import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";

const UpdateMachine = (Headers) => {
    const[service, setService] = useState()
    const[lead, setLead] = useState()
    const[transmisia, setTransmisia] = useState()
    const[model_transmisia, setModel_transmisia] = useState()
    const[engine, setEngine] = useState()
    const[client, setClient] = useState()
    const[bridge, setBridge] = useState()
    const[technic, setTechnic] = useState()
    const[number_machine, setNumberMachine] = useState()
    const[number_engine, setNumberEngine] = useState()
    const[number_transmisia, setNumberTransimisia] = useState()
    const[number_steerable_bridge, setNumber_steerable_bridge] = useState()
    const[contract_postavka, setContractPostavka] = useState()
    const[number_lead, setNumberLead] = useState()
    const[date_otgruzka, setDateOtgruzka] = useState()
    const[consignee, setConsignee] = useState()
    const[complectation, setComplectation] = useState()
    const[adress, setAdress] = useState()
    const[company, setCompany] =useState()
    const[user, setUser] = useState()
    const[steerable, setSteerable] = useState()
    const[model_lead, setModel_lead] = useState()
    const[model_engine, setModel_engine] = useState()
    const[model_technic, setModel_technic] = useState()
    const[message, setMessage] = useState('')
     const params = useParams()
    console.log(params)



    useEffect(()=>{
           const getServiceList= async ()=>{
        const headers = Headers
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
               const headers=Headers
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
               const headers = Headers
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
               const headers = Headers
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
               const headers = Headers
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
               const headers = Headers
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
                then((response)=>{return response.data.Engine
            }).catch((error)=>{
                return error
            })
            setEngine(engine_list)
        }
        getEngine()
    }, [])
     const onFormSubmit =(e)=>{
        e.preventDefault()
        const headers = Headers
        const state = {
            'number_machine': number_machine,
            'model_technic':model_technic,
            'model_engine': model_engine,
            'number_engine': number_engine,
            'model_transmisia': model_transmisia,
            'number_transmisia': number_transmisia,
            'lead_model': model_lead,
            'number_lead': number_lead,
            'model_steerable_bridge': steerable,
             'number_steerable_bridge': number_steerable_bridge,
            'contract_postavka': contract_postavka,
             'date_otgruzka': date_otgruzka,
            'consignee':consignee,
            'adress': adress,
            'complectation': complectation,
            'client_model': user,
            'service_model': company,
        }
        axios.patch(`http://127.0.0.1:8000//machine/${params.id}`, state, {headers}).
            then((response)=>{
                console.log(response)
              setMessage('Данные были успешно изменены!')
        }).catch((error)=>{
            setMessage('Упс! Что-то пошло не так')
            console.log(error)
        })
    }


    return (
        <div>
         <div className='update-to'>{message}</div>
        <div  className='container-machine-add'>
                <h3>Изменение данных о машине</h3>


            <form action='' method='post' onSubmit={onFormSubmit}>
                <div><input placeholder='Номер машины' type='text' value={number_machine} onChange={e=>setNumberMachine(e.target.value)}/></div>
                <div><input placeholder='Номер ведущего моста' type='text' value={number_lead} onChange={e=> setNumberLead(e.target.value)}/></div>
                 <div><input placeholder="Номер двигателя" type='text' value={number_engine} onChange={e=>setNumberEngine(e.target.value)}/></div>
                <div><input placeholder="Номер трансмиссии" type='text' value={number_transmisia} onChange={e=>setNumberTransimisia(e.target.value)}/></div>
                  <div><input placeholder="Номер управляемого моста" type='text' value={number_steerable_bridge} onChange={e=>setNumber_steerable_bridge(e.target.value)}/></div>
                  <div><input placeholder="Договор поставки" type='text' value={contract_postavka} onChange={e=>setContractPostavka(e.target.value)}/></div>
                 <div><input placeholder="Дата загрузки" type='text' value={date_otgruzka} onChange={e=>setDateOtgruzka(e.target.value)} onFocus={(e)=>(e.target.type = 'date')}/></div>
                <div><input placeholder="Грузополучатель" type='text' value={consignee} onChange={e=>setConsignee(e.target.value)}/></div>
                  <div><input placeholder="Адрес" type='text' value={adress} onChange={e=>setAdress(e.target.value)}/></div>
                 <div><input placeholder="Комплектация" type='text' value={complectation} onChange={e=>setComplectation(e.target.value)}/></div>
                <div>
                    {service ?
                <select className='select-add'  value={company} onChange={e => setCompany(e.target.value)}>
                    <option selected>Выберите сервисную организацию</option>
                    {service.map((item, index)=>{
                        return(
                        <option value={item.id} key={index}>{item.title}</option>
                        )
                    })}
                </select>
                    :<div></div>
                }
                </div>
            <div>
                {client ?
                 <select className='select-add' value={user} onChange={e=>setUser(e.target.value)}>
                      <option selected>Выберите клиента</option>
                     {client.map((el, index)=>{
                         return(
                             <option value={el.id} key={index}>{el.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }
            </div>
                <div>
                {bridge ?
                 <select className='select-add' value={steerable} onChange={e => setSteerable(e.target.value)}>
                    <option selected>Выберите управляемый мост</option>
                     {bridge.map((it, index)=>{
                         return(
                             <option value={it.id} key={index}>{it.title}</option>
                         )

            })}
                 </select>
                    :<div></div>
                }
                </div>
                <div>
                {lead?
                 <select className='select-add' value={model_lead} onChange={e=>setModel_lead(e.target.value)}>
                      <option selected>Выберите ведущий мост</option>
                     {lead.map((el, index)=>{
                         return(
                             <option value={el.id} key={index}>{el.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }

                </div>
                    <div>
                {transmisia ?
                 <select className='select-add' value={model_transmisia} onChange={e=>setModel_transmisia(e.target.value)}>
                      <option selected>Выберите трансмиссию</option>
                     {transmisia.map((item, index)=>{
                           return(
                     <option value={item.id} key={index}>{item.title}</option>
                           )
                     }
                     )}

                 </select>
                    :<div></div>
                }
                </div>
                <div>

                {engine ?
                 <select className='select-add' value={model_engine} onChange={e=>setModel_engine(e.target.value)}>
                      <option selected>Выберите двигатель</option>
                     {engine.map((el, index)=>{
                         return(
                             <option value={el.id} key={index}>{el.title}</option>
                         )
                     })}
                 </select>
                    :<div></div>
                }
                </div>
                <div>
                {technic ?
                 <select className='select-add' value={model_technic} onChange={e=>setModel_technic(e.target.value)}>
                      <option selected>Выберите модель техники</option>
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
                <button className='button-add-machine-complaint' type='submit'>Изменить данные о машине</button>
            </form>
        </div>
        </div>
    );
};

export default UpdateMachine;
