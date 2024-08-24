import { useState,useEffect } from 'react';
import '../styles-components.css';
import { getAuthData } from '../../utils/urls-trello-api';
export default function OptionsAviableToTrello(){
    const[credentials,setCredentials]=useState({
        apiKey:'',
        tokenUser:''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials,[name]: value
        });
    };
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        console.log(credentials)
        const fetchBoardData = async () => {
            try {
              let dataToGetBoard = await getAuthData(credentials.apiKey, credentials.tokenUser);
              console.log(dataToGetBoard);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchBoardData();
    }
    return(
        <section className='options_assign_container'>
            <article>
                <header className='assign-container_options'>Agregar credenciales</header>
                <form className='assign-form_auth' onSubmit={onFormSubmit}>
                    <input type="text"
                     name="apiKey"
                     value={credentials.apiKey}
                    onChange={handleInputChange}
                     required/>
                    <input type="text" 
                    name="tokenUser"
                    value={credentials.tokenUser}
                    onChange={handleInputChange}
                    required/>
                    <button type='submit'>
                        check
                    </button>
                </form>
            </article>
        </section>
    )
}