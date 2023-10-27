import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import '../../styles/table.css'
const ADDSComplaint = () => {
    const [service, setService] = useState()
    const [usel, setUsel] = useState()
    const [company, setCompany] = useState()
    const [uselValue, setUselValue] = useState()
    const [dateRefusal, setDateRefusal] = useState()
    const [working, setWorking] = useState()
    const [description, setDescription] = useState()
    const [recovery, setRecovery] = useState()
    const [spareParts, setSpareParts] = useState()
    const [daterecovery, setDateRecovery] = useState()
    const [methods, setMethods] = useState()
    const [data, setData] = useState()
    const [number_machine, setNumber_machine] = useState()
    const [message, setMessage] = useState('')
    const params = useParams()
    const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Token  ${localStorage.getItem('access_Token')}`
    }
    useEffect(() => {
        console.log(company)
    }, [company])


    useEffect(() => {
        const getData = async () => {
            const getMachine = await axios.get('http://127.0.0.1:8000//todo/', {headers})
                .then((resp) => {
                    console.log(resp)
                    return resp
                }).catch((error) => {
                    console.log(error)
                })
            setData(getMachine)


        }
        getData()
        const getServiceList = async () => {
            const get_serrvice = await axios.get('http://127.0.0.1:8000//service/', {headers}).then((result) => {
                console.log(result)
                return result.data.Service

            }).catch((error) => {
                return error
            })
            setService(get_serrvice)

        }
        getServiceList()
        const getUselList = async () => {

            const get_usels = await axios.get('http://127.0.0.1:8000//usel/', {headers}).then((result) => {
                console.log(result.data.Usels)
                return result.data.Usels

            }).catch((error) => {
                return error
            })
            setUsel(get_usels)
        }
        getUselList()
        const getrecoveryList = async () => {

            const get_recovery = await axios.get('http://127.0.0.1:8000//recovery/', {headers}).then((response) => {
                console.log(response)
                return response.data.Recovery
            }).catch((error) => {
                return error
            })
            setRecovery(get_recovery)
        }
        getrecoveryList()

    }, [])
    const onFormSubmit = (e) => {
        e.preventDefault();

        const state = {
            'date_refusal': dateRefusal,
            'working_off': working,
            'usel': uselValue,
            'description': description,
            'recovery': methods,
            'spare_parts': spareParts,
            'date_recovery': daterecovery,
            'car_complaint': number_machine,
            'service_org': company,
        }
        axios.post('http://127.0.0.1:8000//complaint/add/', state, {headers}).then((result) => {
            setMessage('Рекламация была успешно добавлена')
        }).catch((error) => {
            setMessage('Упс что-то пошло не так, повторите попытку.')
        })
    }
        return (
            <div>
                 <div className='update-to'>{message}</div>
                <div className='container-machine-add'>
                    <h1>Добавление рекламации</h1>
                    <form action='' method='post' onSubmit={onFormSubmit}>

                        <div><input placeholder='дата отказа' type='text' value={dateRefusal} onChange={e => setDateRefusal(e.target.value)} onFocus={(e)=>e.target.type = 'date'}/></div>
                          <div><input  placeholder='наработка' type='text' value={working} onChange={e => setWorking(e.target.value)}/></div>
                          <div><input  placeholder='описание отказа' type='text' value={description} onChange={e => setDescription(e.target.value)}/></div>
                          <div><input  placeholder='запасные части' type='text' value={spareParts} onChange={e => setSpareParts(e.target.value)}/></div>
                    <div><input  placeholder='дата восстановления' type='text' value={daterecovery} onChange={e => setDateRecovery(e.target.value)} onFocus={(e)=>e.target.type = 'date'}/></div>

                        <div>
                        {data ?
                            <select className='select-add' value={number_machine} onChange={e => setNumber_machine(e.target.value)}>
                                <option selected>Выберите машину</option>
                                {data.data.Machine.map((el) => {
                                    console.log(data.data.Machine[0].id)
                                    return (
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
                                    <option selected>Выберите сервисную организацию</option>
                                    {service.map((el) => {
                                        return (
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
                                    {usel.map((el) => {
                                        return (
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
                                    {recovery.map((el) => {
                                        return (
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
                        <button className='button-add-machine' type='submit'>Добавить рекламацию</button>
                    </form>

                </div>
            </div>
        );

}

export default ADDSComplaint;