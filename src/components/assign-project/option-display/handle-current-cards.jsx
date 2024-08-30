import { useContext,useState, useEffect } from "react"
import { ContextApi } from "../modal-options"
import { getCurrentCards, deleteCurrentCard } from "../../../utils/urls-trello-api";
export default function  UpdateCurrentCards(){
    const { credentials,boardAuth } = useContext(ContextApi);
    const [selectCards,setSelectCards]=useState(null)
    const [loading,setLoading]=useState(true)
    const [seeInformation,setSeeInformation]=useState([])
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
             console.log(response)             
           } catch (error) {
             throw error
           }      
    }
    //crear el modal para mostar todo aqui y la info con un state aqui mismo
    return(
        <>
        {seeInformation.length === 0  ?  <div className="cards_currents-container">
           <p>
            lista de tarjetas - editar/ver/borrar
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
                        <span>Su tablero de Trello esta vacio</span> // Optional: message if there's no data
                    )
                )}
            </ul>
        </div> : <article className="card-data-information_container">
                    <p>nombre de la tarjeta: {seeInformation.name ? seeInformation.name : 'Sin nombre'}</p>
                    <p>descripcion:{seeInformation.desc ? seeInformation.desc : 'Sin descripcion'}</p>
                    <div>
                        <p>Sector encargado: {seeInformation.labels.length > 0 ? 
                            (seeInformation.labels.map((tag)=>(<span key={tag.id} style={{backgroundColor:`${tag.color}`,padding:'3px',borderRadius:'5px',marginLeft:'5px'}}>{tag.name}</span>))) : 'Sin asignar'}</p>
                    </div>
                    <p><a href={seeInformation.url} target="_blank" rel="noopener">{seeInformation.url ? seeInformation.url : 'Not Aviable'}</a></p>
                <button
                    className="submit_btn-form-api"
                    onClick={()=>setSeeInformation([])}
                >cerrar</button>
            </article>}
       
        </>
    )
}