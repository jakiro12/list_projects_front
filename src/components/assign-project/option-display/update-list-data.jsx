import '../../styles-components.css'
import { useContext,useEffect, useRef, useState } from 'react'
import { ContextApi } from '../modal-options';
import { getCurrentListsData, createNewCardInList } from '../../../utils/urls-trello-api';
export default function DataListToUpdate(){
    const { boardAuth, credentials } = useContext(ContextApi);
    const [selectList,setSelectList]=useState(null)
    const [loading,setLoading]=useState(true)
    const [created,setCreated]=useState(false)
    const messageRef = useRef('');
    useEffect(()=>{
        const fetchDataList=async()=>{
            try {
                let dataList = await getCurrentListsData(credentials.apiKey, credentials.tokenUser,boardAuth);
                setSelectList(dataList)
                setLoading(false)
              } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
              }
        }
        fetchDataList()
    },[])
    const handleAddProjectInList=async(id)=>{
        let storageDataProject=JSON.parse(localStorage.getItem('assignProject'))
        if(storageDataProject === null){
            setCreated(true)
            messageRef.current='El proyecto fue asignado anteriormente'
            return
        } 
        try {
            const response=await createNewCardInList(credentials.apiKey, credentials.tokenUser,id,storageDataProject)
            if(response === 200){
                localStorage.setItem('indexAssigned',JSON.stringify({indexValue:storageDataProject.index}))
                localStorage.removeItem('assignProject')
                messageRef.current='Asignado exitosamente'
            }
        } catch (error) {
            console.log(error)
            messageRef.current='Ocurrio un Error'
        }finally{
            setCreated(true)
        }
    }
    return(
        <>
          {
            created === false ?   <div className='data_list_update-container'>
            <p>Seleccione la lista en la cual ingresar su nuevo proyecto</p>
            <ul className='lists_board-container'>
            {loading ? (
                    <span className="loader_data"></span> 
                ) : (
                    selectList && selectList.length > 0 ? (
                        selectList.map((item) => (
                            <li key={item.id}                                
                            >{item.name} <div className='list_board-btn_actions'>
                                <span onClick={()=>handleAddProjectInList(item.id)}>&#43;</span>
                               </div></li> 
                        ))
                    ) : (
                        <span>Su tablero de Trello esta vacio</span> // Optional: message if there's no data
                    )
                )}
            </ul>
        </div> : <div className="modal-list-alert_container">
                <span>{messageRef.current}</span>
                <button 
                className="submit_btn-form-api"
                onClick={()=>setCreated(false)}>Volver</button>
             </div>
        }
        </>
    )
}