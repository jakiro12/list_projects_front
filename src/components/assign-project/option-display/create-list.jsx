import { useContext, useState, useRef } from "react"
import { createNewList } from "../../../utils/urls-trello-api"
import { ContextApi } from "../modal-options";
export default function CreateNewListWithData(){
    const { credentials,boardAuth } = useContext(ContextApi);
    const [nameList,setNameList]=useState('')
    const [loading,setLoading]=useState(false)
    const [created,setCreated]=useState(false)
    const messageRef = useRef('');

    const handleInputChange = (e) => {
        setNameList(e.target.value);
    };
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        messageRef.current = '';
        const fetchBoardData = async () => {
            try {
              let dataCreate = await createNewList(credentials.apiKey, credentials.tokenUser,boardAuth,nameList);
              messageRef.current='Creado exitosamente'
              return dataCreate
            } catch (error) {
              console.error('Error fetching data:', error);
              messageRef.current='Ocurrio un Error'
            }finally{
                setLoading(false)
                setNameList('')
                setCreated(true)
            }
          };
          fetchBoardData();
    }
    //El modal debe ocupar todo el div :D
    return(
        <>
        {
            created === false ? 
                <div className="new_list-container">
                <p>
                Crear una nueva lista 
                </p>
                {loading ? (
                        <span className="loader_data" style={{margin:'auto'}}></span> 
                    ) :(
                <form onSubmit={onFormSubmit}>
                    <label htmlFor="">
                        Agrege el nuevo nombre de la lista
                    </label>
                    <input 
                        type="text"
                        name="nameList"
                        value={nameList} 
                        onChange={handleInputChange}
                        required
                        />
                    <button
                        className="submit_btn-form-api"
                    type="submit">Crear</button>
                </form>
           )}
                 </div>
             : <div className="modal-list-alert_container">
                <span>{messageRef.current}</span>
                <button 
                className="submit_btn-form-api"
                onClick={()=>setCreated(false)}>Volver</button>
             </div>
        }
        </>
        
    )
}