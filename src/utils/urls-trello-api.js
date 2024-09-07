//GET DATA

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
         const result={
            idBoards: response.idBoards ? response.idBoards[0] : null,
            fullName: response.fullName ? response.fullName : null,
            username:response.username ? response.username : null,
            email:response.email ? response.email : null,
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
export const getListCards=async(apiKey,personalToken,listId)=>{
    try {
        const urlApi=`https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${personalToken}`
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

export const createNewCardInList=async(apiKey,personalToken,listId,dataAssign)=>{
    try {
        const data= await fetch(`https://api.trello.com/1/cards?idList=${listId}&key=${apiKey}&token=${personalToken}`,
            {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    name:dataAssign.projectName,
                    desc: dataAssign.description
                  })
            }
        )
        return data.status
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
        const response=await data.json()
        return response
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

//UPDATE DATA

export const updateCardData=async(apiKey,personalToken,cardId,cardName)=>{
    try {
        const data= await fetch(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${personalToken}`,
            {
                method:'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body:JSON.stringify({
                    name:cardName,                    
                  })
            }
        )
        return data.status
    } catch (error) {
        console.log(error)
    }
}