import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const DirectoryVidTO = () => {
    const[vid, setVid]= useState()
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

    useEffect(()=>{
        const getVid = async()=>{

        const lead_list = await axios.get(`http://127.0.0.1:8000//vid-detail/${params.title}`, {headers}).
            then((result)=>{
                console.log(result.data)
                return result.data
        }).catch((error)=>{
            return error
        })
        setVid(lead_list)
    }
    getVid()
         const getUserGroup = async () => {

        const getGroup = await axios.get('http://127.0.0.1:8000//group/', {headers}).then((response) => {
            return response.data
        }).catch((error) => {
            return error
        })
        setGroup(getGroup)
    }
        getUserGroup()
    }, [])
    const AddVid=(e)=>{
        e.preventDefault();

        const state = {
            'title': title,
            'descrip': description
        }
        axios.post(`http://127.0.0.1:8000//vid/add`, state, {headers}).then((result)=>{
            console.log(result)
            setMessage('Данные в справочник видов ТО успешно добавлены!')
        }).catch((error)=>{setMessage('Упс, что-то пошло не так, повторите попытку.')})
    }
     const UpdateVid= async(e)=>{
          e.preventDefault();
        const state = {
              'title': title_1,
            'descrip': description_1
        }
         const serv = await axios.patch(`http://127.0.0.1:8000//update-vid/${vid[0].id}`, state, {headers}).then((result)=>{
            setMessage('Данные в справочнике видов ТО успешно изменены!')
            return  [result.data]
        }).catch((error)=>{
            setMessage('Упс, что-то пошло не так, повторите попытку.')
         })
        setVid(serv)
    }

    return (
        <div>
             <div className='title-table-book'>
                  {vid?
             <h3 className='number-machine'>Cправочник вида ТО - {vid[0].title} </h3>
                      :<h3></h3>
                  }
              </div>
           <table className='table-book'>
               <tr className='table-tr'>
                   <td>Название</td>
                   <td>Описание</td>
               </tr>
               {vid ?
               <tr>
                   <td>{vid[0].title}</td>
                   <td>{vid[0].descrip}</td>
               </tr>
                   :<div></div>
               }
           </table>
             {group && group[0].Group[0].name === 'managers'?
                  <div>
                  <div className='update-to'>{message}</div>
                <div className='container-book'>
                    <div className='add-technic'>
             <span  className='title-forma'>Добаление в справочник вида ТО</span>
           <form  action='' method='post' onSubmit={AddVid}>
               <input placeholder='название' type='text' value={title} onChange={e=>setTitle(e.target.value)}/>
                <input placeholder='описание' type='text' value={description} onChange={e=>setDescription(e.target.value)}/>
              <div><button className='button-technic'>Создать</button></div>
           </form>
                            </div>
                    <div className='update-technic'>
           {vid ?
           <span  className='title-forma'>Изменить данные справочника для {vid[0].title}</span>
               :<div></div>
           }
            <form  action='' method='post' onSubmit={UpdateVid}>
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

export default DirectoryVidTO;