import '../../styles-components.css'
import { useContext,useEffect, useState } from 'react'
import { ContextApi } from '../modal-options';
import { getCurrentListsData } from '../../../utils/urls-trello-api';
export default function DataListToUpdate(){
    const { boardAuth, setBoardAuth } = useContext(ContextApi);
    const [selectList,setSelectList]=useState(null)
    const [loading,setLoading]=useState(true)
    useEffect(()=>{
        const fetchDataList=async()=>{
            try {
                let dataList = await getCurrentListsData('f9669717296754d072e61e0f236945f7', 'ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127',boardAuth);
                setSelectList(dataList)
                setLoading(false); 
              } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
              }
        }
        fetchDataList()
    },[])

    return(
        <div className='data_list_update-container'>
            <ul>
            {loading ? (
                    <span className="loader_data"></span> 
                ) : (
                    selectList && selectList.length > 0 ? (
                        selectList.map((item) => (
                            <li key={item.id}>{item.name}</li> 
                        ))
                    ) : (
                        <span>Su tablero de Trello esta vacio</span> // Optional: message if there's no data
                    )
                )}
            </ul>
        </div>
    )
}