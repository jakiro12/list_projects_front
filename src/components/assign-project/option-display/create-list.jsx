import { useContext, useState } from "react"
import { createNewList } from "../../../utils/urls-trello-api"
import { ContextApi } from "../modal-options";
export default function CreateNewListWithData(){
    const { credentials,boardAuth } = useContext(ContextApi);
    const [nameList,setNameList]=useState('')
    const [loading,setLoading]=useState(false)
    const handleInputChange = (e) => {
        setNameList(e.target.value);
    };
    const onFormSubmit=async(e)=>{
        e.preventDefault()
        setLoading(true)
        const fetchBoardData = async () => {
            try {
              let dataCreate = await createNewList(credentials.apiKey, credentials.tokenUser,boardAuth,nameList);
              return dataCreate
            } catch (error) {
              console.error('Error fetching data:', error);
            }finally{
                setLoading(false)
                setNameList('')
            }
          };
          fetchBoardData();
    }
    return(
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
    )
}