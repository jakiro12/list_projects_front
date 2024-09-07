import { useContext,useState, useEffect } from "react"
import { ContextApi } from "../modal-options"
import { getCurrentCards, deleteCurrentCard } from "../../../utils/urls-trello-api";
import HandleDataInformationInOneCard from "./see-or-edit-a-card/handle-one-card";
export default function  UpdateCurrentCards(){
    const { credentials,boardAuth } = useContext(ContextApi);
    const [selectCards,setSelectCards]=useState(null)
    const [loading,setLoading]=useState(true)
    const [seeInformation,setSeeInformation]=useState([])
    const [editCard,setEditCard]=useState(false)
    useEffect(()=>{
        const fetchDataCards=async()=>{
            try {
                let dataCards = await getCurrentCards(credentials.apiKey, credentials.tokenUser,boardAuth);
                setSelectCards(dataCards)
                setLoading(false)
              } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false)
              }
        }
        fetchDataCards()
    },[selectCards])
    const getInformationCard=async(apiKey,personalToken,cardId)=>{
        try {
            const urlApi=`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${personalToken}`
            const data=await fetch(urlApi,{
             method: 'GET',
             headers:{
                'Accept': 'application/json'
             }        
            })
            if (!data.ok) {
                throw new Error(`HTTP error! Status: ${data.status}`);
            }
             const response=await data.json()
             setSeeInformation(response)
           } catch (error) {
             throw error
           }      
    }
    const handleEditOneCard=(cardId)=>{
        setSeeInformation(cardId)
        setEditCard(true)
    }
    return(
        <>
        {seeInformation.length === 0  ?  <div className="cards_currents-container">
           <p>
            Lista de tarjetas - editar/ver/borrar
           </p>
            <ul className='lists_board-container'>
            {loading ? (
                        <span className="loader_data"></span>                   
                ) : (
                    selectCards && selectCards.length > 0 ? (
                        selectCards.map((item) => (
                            <li key={item.id}                               
                            >{item.name}
                            <div className="btn_actions-cards-container">
                                <span
                                   onClick={()=>handleEditOneCard(item.id)}
                                >
                                     &#x270E;
                                </span>
                                <span 
                                    onClick={()=>getInformationCard(credentials.apiKey, credentials.tokenUser,item.id)}>
                                     &#33;
                                </span>
                                <span
                                    onClick={()=>deleteCurrentCard(credentials.apiKey, credentials.tokenUser,item.id)}
                                >&#x1F5D1;</span>
                            </div>
                             </li> 
                        ))
                    ) : (
                        <span>Su tablero de Trello esta vacio</span> 
                    )
                )}
            </ul>
        </div> : <HandleDataInformationInOneCard setSeeInformation={setSeeInformation} seeInformation={seeInformation} editForm={editCard} setEditForm={setEditCard}/>}
       
        </>
    )
}