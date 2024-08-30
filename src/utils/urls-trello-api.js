//GET DATA
export const getBoarddata='https://api.trello.com/1/boards/66c430b8bab73f67189077db?key=f9669717296754d072e61e0f236945f7&token=ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127'
export const getListsBoarddata='https://api.trello.com/1/boards/66c430b8bab73f67189077db/lists?key=f9669717296754d072e61e0f236945f7&token=ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127'

export const getAuthData=async(apiKey,personalToken)=>{
    try {
        const urlApi=`https://api.trello.com/1/members/me?key=${apiKey}&token=${personalToken}`
        const data=await fetch(urlApi,{
         method: 'GET'        
        })
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
         const response=await data.json()
         console.log(response)
         const result={
            idBoards: response.idBoards ? response.idBoards[0] : null
         }
         return result
       } catch (error) {
         throw error
       }      
}
export const getCurrentListsData=async(apiKey,personalToken,boardAuth)=>{
    try {
        const urlApi=`https://api.trello.com/1/boards/${boardAuth}/lists?key=${apiKey}&token=${personalToken}`
        const data=await fetch(urlApi,{
         method: 'GET'        
        })
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
         const response=await data.json()
         return response
       } catch (error) {
         throw error
       }      
}
export const getCurrentCards=async(apiKey,personalToken,boardAuth)=>{
    try {
        const urlApi=`https://api.trello.com/1/boards/${boardAuth}/cards?key=${apiKey}&token=${personalToken}`
        const data=await fetch(urlApi,{
         method: 'GET'        
        })
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
         const response=await data.json()
         return response
       } catch (error) {
         throw error
       }      
}


//CREATE DATA

export const createNewCardInList=async(apiKey,personalToken,listId)=>{
    try {
        const data= await fetch(`https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${personalToken}`,
            {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    desc: "👋Hola,\n\nTrello's Platform team uses this board to keep developers up-to-date.",
                    name:"nueva card"
                  })
            }
        )
        console.log(`Response: ${data.status} ${data.statusText}`);
        const response=await data.json()
        console.log(response)        
    } catch (error) {
        console.log(error)
    }
}

export const createNewList=async(apiKey,personalToken,idBoard,nameList)=>{
    try {
        const data= await fetch(`https://api.trello.com/1/lists?name=${nameList}&idBoard=${idBoard}&key=${apiKey}&token=${personalToken}`,
            {
                method:'POST'
            }
        )
        console.log(`Response: ${data.status} ${data.statusText}`);
        const response=await data.json()
        console.log(response)        
    } catch (error) {
        console.log(error)
    }
}

//DELETE DATA
export const deleteCurrentCard=async(apiKey,personalToken,cardId)=>{
    try {
        const data= await fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${personalToken}`,
            {
                method:'DELETE'
            }
        )
        console.log(`Response: ${data.status} ${data.statusText}`);
        const response=await data.json()
        return response
    } catch (error) {
        console.log(error)
    }
}