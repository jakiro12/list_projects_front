import '../../styles-components.css'
import { useContext,useEffect, useState } from 'react'
import { ContextApi } from '../modal-options';
import { getCurrentListsData, createNewCardInList } from '../../../utils/urls-trello-api';
export default function DataListToUpdate(){
    const { boardAuth, credentials } = useContext(ContextApi);
    const [selectList,setSelectList]=useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchDataList=async()=>{
            try {
                let dataList = await getCurrentListsData(credentials.apiKey, credentials.tokenUser,boardAuth);
                setSelectList(dataList)
                console.log(dataList)
                setLoading(false)
              } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
              }
        }
        fetchDataList()
    },[])

    return(
        <div className='data_list_update-container'>
            <p>Seleccione la lista en la cual insetara su nuevo proyecto</p>
            <ul className='lists_board-container'>
            {loading ? (
                    <span className="loader_data"></span> 
                ) : (
                    selectList && selectList.length > 0 ? (
                        selectList.map((item) => (
                            <li key={item.id}
                                onClick={()=>createNewCardInList(credentials.apiKey, credentials.tokenUser,item.id)}
                            >{item.name}</li> 
                        ))
                    ) : (
                        <span>Su tablero de Trello esta vacio</span> // Optional: message if there's no data
                    )
                )}
            </ul>
        </div>
    )
}