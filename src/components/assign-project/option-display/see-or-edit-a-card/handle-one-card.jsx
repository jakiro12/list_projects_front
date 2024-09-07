import '../../../styles-components.css'
import { updateCardData } from '../../../../utils/urls-trello-api'
import { useContext, useState } from 'react'
import { ContextApi } from '../../modal-options';
export default function HandleDataInformationInOneCard({seeInformation,setSeeInformation,editForm,setEditForm}){
    const [newNameCard,setNewNameCard]=useState('')
    const { credentials } = useContext(ContextApi);
    const closeFormEdit=()=>{
        setSeeInformation([])
        setEditForm(false)
    }
    const onCardNameSubmit=async(e)=>{
        e.preventDefault()
        try {
            let cardUpdate=await updateCardData(credentials.apiKey, credentials.tokenUser,seeInformation,newNameCard)
            return cardUpdate
        } catch (error) {
         console.log(`Error:${error}`)   
        }finally{
            setNewNameCard('')
            closeFormEdit()
        }

    }
    return(
        <>
        {editForm === false ?  <article className="card-data-information_container">
                    <p>nombre de la tarjeta: {seeInformation.name ? seeInformation.name : 'Sin nombre'}</p>
                    <p>descripcion:{seeInformation.desc ? seeInformation.desc : 'Sin descripcion'}</p>
                    <div>
                        <p>Sector encargado: {seeInformation.labels.length > 0 ? 
                            (seeInformation.labels.map((tag)=>(<span key={tag.id} style={{backgroundColor:`${tag.color}`,padding:'3px',borderRadius:'5px',marginLeft:'5px'}}>{tag.name}</span>))) : 'Sin asignar'}</p>
                    </div>
                    <p><a href={seeInformation.url} target="_blank" rel="noopener">{seeInformation.url ? 'Ver tarjeta' : 'Not Aviable'}</a></p>
                <button
                    className="submit_btn-form-api"
                    onClick={()=>setSeeInformation([])}
                >volver</button>
            </article> 
            :
            <div className='edit_card_form-container'>
                <form onSubmit={onCardNameSubmit}>
                    <label htmlFor="cardNameInput">Nuevo Nombre</label>
                    <input type="text" 
                        id="cardNameInput"
                        value={newNameCard}
                        onChange={(e) => setNewNameCard(e.target.value)}
                        required
                    />
                <div>
                    <button type="submit">Editar</button>
                <button
                    onClick={()=>closeFormEdit()}
                >Volver</button>
                </div>
                </form>
            </div>
            }
        </>
       
    )
}