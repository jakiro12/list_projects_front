import { getAuthData } from '../../../utils/urls-trello-api';
import '../../styles-components.css';
import { useState } from "react";
export default function GetCredentialsToAssign(){
    const[credentials,setCredentials]=useState({
        apiKey:'',
        tokenUser:''
    })
    const[loading,setLoading]=useState(false)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({...credentials,[name]: value
        });
    };
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        console.log(credentials)
        const fetchBoardData = async () => {
            try {
              let dataToGetBoard = await getAuthData(credentials.apiKey, credentials.tokenUser);
              console.log(dataToGetBoard);
            } catch (error) {
              console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
            }
          };
          fetchBoardData();
    }
    return(
        <>
        {
            loading === false ? <form className='assign-form_auth' onSubmit={onFormSubmit}>
            <div>
                <label htmlFor="">Ingresar API Key</label>
                <input type="password"
                name="apiKey"
                value={credentials.apiKey}
                onChange={handleInputChange}
                required/>
            </div>
            <div>
                <label htmlFor="">Ingresar Token de acceso</label>
                <input type="password" 
                name="tokenUser"
                value={credentials.tokenUser}
                onChange={handleInputChange}
                required/>
            </div>                                        
            <button type='submit'>
                Acceder
            </button>
        </form> : <span class="loader"></span>
        }
        </>
        
    )
}