import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../styles/table.css'
const ApiTest = () => {
    const [machine, setMachine] = useState()
    const[data, setData] = useState()
    const[login, setLogin] = useState({})
    const[message, setMessage] = useState()

  const Headers=()=>{
        if(localStorage.getItem('access_Token')){
            const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
                'Authorization': `Token  ${localStorage.getItem('access_Token')}`
            }
            console.log(headers)
            return headers
        } else {
            const headers = {
                 'Content-type': 'application/json',
                    'Accept': 'application/json',
            }
              console.log(headers)
               return headers
        }
    }

     const state = {
        'username': 'merkalov',
         'password': 'Remes7654'
     }
     const postTO = {

         'vid_to': 'TO-5(2000 м/c)',
         'data_to': '2023-10-16',
         'narabotka': '450',
         'number_zakaza': '10',
         'service_company': 'Самостоятельно',
         'data_zakaza': '2023-9-10'
     }
     const TOCreate = {
        'narabotka': 400,
         'car': 2,
         'service_company': 2,
          'vid_to': 4,
         'data_to': '2023-10-16',

     }


    const getStudents = async()=>{
          const headers = Headers()
        const getMachine = await axios.post('http://127.0.0.1:8000//machine-number/', machine, {headers})
            .then((resp) => {
                console.log(resp.data.Machine)
            return resp.data
            }).catch((error)=>{
                setMessage('Упс! Что-то пошло не так, повторите попытку')
                console.log(error)
            })
            setData(getMachine)
        }


    console.log(data)
    return (
        <div>
         <form>
             <div className='check'><span>Проверьте комплектацию и технические характеристики техники Силант</span></div>
             <div className='forma-search'><label>Заводской номер:</label><input className='search' type='text' value={machine} onChange={(e)=>setMachine(e.target.value)}/>
                 <button className='button-add' type='button' onClick={getStudents}>Отправить</button></div>
         </form>
            <div>
                <div className='result'>Результат поиска:</div>

            </div>
            {data?
                <div>
            {data.Machine.length > 0 ?
                <div>
                 <div className='info'>Информация о комплектации и технических характеристиках Вашей техники</div>
                <table  className='table-test'>
                    <tr  className='table-tr'>
                        <td>Зав. № машины</td>
                        <td>Модель техники</td>
                        <td>Модель двигателя</td>
                        <td>Зав. № двигателя</td>
                        <td>Модель трансмиссии</td>
                        <td>Зав. № трансмиссии</td>
                        <td>Модель ведущего моста</td>
                        <td>Зав. № ведущего моста</td>
                        <td>Модель управляемого моста</td>
                        <td>Зав. № управляемого моста</td>
                    </tr>
                    <tr>
                        <td>{data.Machine[0].number_machine}</td>
                        <td>{data.Machine[0].title_technic}</td>
                        <td>{data.Machine[0].title_engine}</td>
                        <td>{data.Machine[0].number_engine}</td>
                        <td>{data.Machine[0].title_transmisia}</td>
                        <td>{data.Machine[0].number_transmisia}</td>
                        <td>{data.Machine[0].title_lead}</td>
                        <td>{data.Machine[0].number_lead}</td>
                        <td>{data.Machine[0].title_bridge}</td>
                        <td>{data.Machine[0].number_steerable_bridge}</td>
                    </tr>
                </table>
                </div>
                : <div>
                    <div className='error-data'>Данных о машине с указанным номером в базе не найдено</div>
                </div>
            }
                </div>
                :<div>
                 <div className='info'>Информация о комплектации и технических характеристиках Вашей техники</div>
                <table  className='table-test'>
                     <tr  className='table-tr'>
                        <td>Зав. № машины</td>
                        <td>Модель техники</td>
                        <td>Модель двигателя</td>
                        <td>Зав. № двигателя</td>
                        <td>Модель трансмиссии</td>
                        <td>Зав. № трансмиссии</td>
                        <td>Модель ведущего моста</td>
                        <td>Зав. № ведущего моста</td>
                        <td>Модель управляемого моста</td>
                        <td>Зав. № управляемого моста</td>
                    </tr>
                    <tr>
                        <td className='table-td'>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                         <td>X</td>
                    </tr>
                </table>
                </div>
            }
            </div>




    );
};

export default ApiTest;