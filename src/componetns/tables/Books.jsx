import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../../styles/table.css'
import {Link, useParams} from "react-router-dom";
const Books = () => {
    const[lead, setLead] = useState()
    const[transmisia, setTransmisia] = useState()
    const[engine, setEngine] = useState()
    const[bridge, setBridge] = useState()
    const[technic, setTechnic] = useState()
    const[vid, setVid] = useState()
    const[usel, setUsel] = useState()
    const[recovery, setRecovery] = useState()
    const[service, setService] = useState()
    const params = useParams()

    const headers = {
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token  ${localStorage.getItem('access_Token')}`

        }

     useEffect(()=>{
         const getRecovery = async()=>{

        const lead_list = await axios.get(`http://127.0.0.1:8000/api/recovery/`, {headers}).
            then((result)=>{
                console.log(result.data)
                return result.data.Recovery
        }).catch((error)=>{
            return error
        })
        setRecovery(lead_list)
    }
    getRecovery()
         const getUsel = async()=>{

        const lead_list = await axios.get(`http://127.0.0.1:8000/api/usel/`, {headers}).
            then((result)=>{
                console.log(result.data)
                return result.data.Usels
        }).catch((error)=>{
            return error
        })
        setUsel(lead_list)
    }
    getUsel()
                 const getVid = async()=>{

        const lead_list = await axios.get(`http://127.0.0.1:8000/api/vidi/`, {headers}).
            then((result)=>{
                console.log(result.data)
                return result.data.Vidi_TO
        }).catch((error)=>{
            return error
        })
        setVid(lead_list)
    }
    getVid()
        const getLead = async()=>{

        const lead_list = await axios.get('http://127.0.0.1:8000/api/lead/', {headers}).
            then((result)=>{
                return result.data.Lead
        }).catch((error)=>{
            return error
        })
        setLead(lead_list)
    }
    getLead()
        const getTechnic = async()=>{

            const technic_list = await axios.get('http://127.0.0.1:8000/api/technica/', {headers}).
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

            const transmisia_list = await axios.get('http://127.0.0.1:8000/api/transmisia/', {headers}).
                then((result)=>{
                    return result.data.Transmisia
            }).catch((error)=>{
                return error
            })
            setTransmisia(transmisia_list)
        }
        getTransmisia()

        const getBridge = async()=>{

            const bridge_list = await axios.get('http://127.0.0.1:8000/api/steerablebridge/', {headers}).
                then((response)=>{
                    return response.data.Steerable_bridge
            }).catch((error)=>{
                return error
            })
            setBridge(bridge_list)
        }
        getBridge()
        const getEngine = async()=>{

            const engine_list = await axios.get('http://127.0.0.1:8000/api/engine/', {headers}).
                then((response)=>{
                    return response.data.Engine
            }).catch((error)=>{
                return error
            })
            setEngine(engine_list)
        }
        getEngine()
          const getService = async()=>{

            const bridge_list = await axios.get(`http://127.0.0.1:8000/api/service/`, {headers}).
                then((response)=>{
                    return response.data.Service
            }).catch((error)=>{
                return error
            })

            setService( bridge_list)
        }
        getService()
    }, [])
    return (
        <div>
            <div className='all-title-books'><span>Все справочники</span></div>
             <div className='title-books'><span>Справочник ведущий мост</span></div>
            {lead?
            <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                </tr>
                {lead.map((item)=>{
                    console.log(item)
                    return(
                        <tr>
                            <td><Link to={`/lead/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
            </table>
            :<div></div>
            }
            <div className='title-books'><span>Справочник модель техники</span></div>
            {technic?
              <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {technic.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/technic/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
            <div className='title-books'><span>Справочник управляемый мост</span></div>
            {bridge?
               <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {bridge.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/bridge/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
            <div className='title-books'><span>Справочник модель двигателя</span></div>
            {engine?
                <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {engine.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/engine/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
              <div className='title-books'><span>Справочник модель трансмиссии</span></div>
            {transmisia?
                <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {transmisia.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/transmisia/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
             <div className='title-books'><span>Справочник виды ТО</span></div>
            {vid?
                <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {vid.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/vidto/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
            <div className='title-books'><span>Справочник узел отказа</span></div>
            {usel?
                <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {usel.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/usel/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
             <div className='title-books'><span>Справочник способы восстановления</span></div>
            {recovery?
                <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {recovery.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/recovery/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }
             <div className='title-books'><span>Справочник сервисных компаний</span></div>
            {service?
                <table className='table-book'>
                <tr className='table-tr'>
                    <td>Название</td>
                    <td>Описание</td>
                   </tr>
                      {service.map((item)=>{
                    return(
                        <tr>
                            <td><Link to={`/service/${item.title}`}>{item.title}</Link></td>
                            <td>{item.descrip}</td>
                        </tr>
                    )
                })}
                    </table>
                     :<div></div>
            }



        </div>
    );
};

export default Books;