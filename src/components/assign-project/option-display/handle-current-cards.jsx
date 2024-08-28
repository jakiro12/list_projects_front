import { useContext,useState, useEffect } from "react"
import { ContextApi } from "../modal-options"
import { getCurrentCards, deleteCurrentCard } from "../../../utils/urls-trello-api";
export default function  UpdateCurrentCards(){
    const { credentials,boardAuth } = useContext(ContextApi);
    const [selectCards,setSelectCards]=useState(null)
    const [loading,setLoading]=useState(true)
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
    return(
        <div className="cards_currents-container">
           <p>
            lista de tarjetas con nombre/editar/ color/borrar
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
                                <span>
                                &#x270E;
                                </span>
                                <span
                                    onClick={()=>deleteCurrentCard(credentials.apiKey, credentials.tokenUser,item.id)}
                                >&#x1F5D1;</span>
                            </div>
                             </li> 
                        ))
                    ) : (
                        <span>Su tablero de Trello esta vacio</span> // Optional: message if there's no data
                    )
                )}
            </ul>
        </div>
    )
}