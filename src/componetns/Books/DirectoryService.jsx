import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const DirectoryService = () => {
    const[service, setService] =useState()
    const[title, setTitle] = useState()
    const[description, setDescription] = useState()
    const[title_1, setTitle_1] = useState()
    const[description_1, setDescription_1] = useState()
    const[group, setGroup] = useState()
    const[message, setMessage] = useState('')
    const params = useParams()
      const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
    useEffect(() => {
        const getUserGroup = async () => {

        const getGroup = await axios.get('http://127.0.0.1:8000/api/group/', {headers}).then((response) => {
            return response.data
        }).catch((error) => {
            return error
        })
        setGroup(getGroup)
    }
        getUserGroup()
     const getService = async()=>{

            const bridge_list = await axios.get(`http://127.0.0.1:8000/api/service-detail/${params.title}`, {headers}).
                then((response)=>{
                    return response.data
            }).catch((error)=>{
                return error
            })

            setService( bridge_list)
        }
        getService()
         }, []);
    const AddService=(e)=>{
        e.preventDefault();

        const state = {
            'title': title,
            'descrip': description
        }
        axios.post(`http://127.0.0.1:8000/api/service/add/`, state, {headers}).then((result)=>{
            console.log(result)
            setMessage('Данные в справочник успешно добавлены!')
        }).catch((error)=>{
            setMessage('Упс, что-то пошло не так, повторите попытку.')
        })
    }
    const UpdateService= async(e)=>{
          e.preventDefault();
        const state = {
              'title': title_1,
            'descrip': description_1
        }
         const serv = await axios.patch(`http://127.0.0.1:8000/api/update-service/${service[0].id}`, state, {headers}).then((result)=>{
            setMessage('Данные в справочнике успешно изменены!')
            return  [result.data]
        }).catch((error)=>{
            setMessage('Упс, что-то пошло не так, повторите попытку.')
         })
        setService(serv)
    }

    console.log(service)
    return (
       <div>
            <div className='title-table-book'>
                  {service?
             <h3 className='number-machine'>Cправочник сервисной компании {service[0].title} </h3>
                      :<h3></h3>
                  }
              </div>
  <table className='table-book'>
               <tr className='table-tr'>
                   <td>Название</td>
                   <td>Описание</td>
               </tr>
               {service ?
               <tr>
                   <td>{service[0].title}</td>
                   <td>{service[0].descrip}</td>
               </tr>
                   :<div></div>
               }
           </table>
            {group && group[0].Group[0].name === 'managers'?
                <div>
                 <div className='update-to'>{message}</div>
               <div className='container-book'>
                    <div className='add-technic'>
           <span className='title-forma'>Добаление в справочник сервисной компании</span>
           <form  action='' method='post' onSubmit={AddService}>
               <input placeholder='название' type='text' value={title} onChange={e=>setTitle(e.target.value)}/>
                <input placeholder='описание' type='text' value={description} onChange={e=>setDescription(e.target.value)}/>
               <div><button className='button-technic'>Создать</button></div>
           </form>
                         </div>
                    <div className='update-technic'>
           {service ?
           <span className='title-forma'>Изменить данные справочника для {service[0].title}</span>
               :<div></div>
           }
            <form  action='' method='post' onSubmit={UpdateService}>
               <input placeholder='название' type='text' value={title_1} onChange={e=>setTitle_1(e.target.value)}/>
                <input placeholder='описание' type='text' value={description_1} onChange={e=>setDescription_1(e.target.value)}/>
                <div><button className='button-technic'>Изменить</button></div>
           </form>
                 </div>
                </div>
                </div>
                 :<div></div>
            }
              <div className='add-machine'>
              <Link to='/books'><button className='button-add'>Все справочники</button></Link>
             </div>
        </div>
    );
};

export default DirectoryService;