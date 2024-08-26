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
//Body example
const bodyTest={
    "id": "66ccf7e18414507f63f66de8",
    "badges": {
        "attachmentsByType": {
            "trello": {
                "board": 0,
                "card": 0
            }
        },
        "externalSource": null,
        "location": false,
        "votes": 0,
        "viewingMemberVoted": false,
        "subscribed": false,
        "attachments": 0,
        "fogbugz": "",
        "checkItems": 0,
        "checkItemsChecked": 0,
        "checkItemsEarliestDue": null,
        "comments": 0,
        "description": false,
        "due": null,
        "dueComplete": false,
        "lastUpdatedByAi": false,
        "start": null
    },
    "checkItemStates": [],
    "closed": false,
    "dueComplete": false,
    "dateLastActivity": "2024-08-26T21:47:13.411Z",
    "desc": "",
    "descData": {
        "emoji": {}
    },
    "due": null,
    "dueReminder": null,
    "email": null,
    "idBoard": "66c430b8bab73f67189077db",
    "idChecklists": [],
    "idList": "66c66cab779c4205c1ae64e8",
    "idMembers": [],
    "idMembersVoted": [],
    "idShort": 10,
    "idAttachmentCover": null,
    "labels": [],
    "idLabels": [],
    "manualCoverAttachment": false,
    "name": "",
    "pos": 114688,
    "shortLink": "3CqdBjcg",
    "shortUrl": "https://trello.com/c/3CqdBjcg",
    "start": null,
    "subscribed": false,
    "url": "https://trello.com/c/3CqdBjcg/10--",
    "cover": {
        "idAttachment": null,
        "color": null,
        "idUploadedBackground": null,
        "size": "normal",
        "brightness": "dark",
        "idPlugin": null
    },
    "isTemplate": false,
    "cardRole": null,
    "attachments": [],
    "stickers": [],
    "limits": {}
}


//CREATE DATA
export const createNewCard='https://api.trello.com/1/cards?idList={id}&key=f9669717296754d072e61e0f236945f7&token=ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127'

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
                    name:"hola"
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

export const createNewList=async(nameList,idBoard)=>{
    try {
        const data= await fetch(`https://api.trello.com/1/lists?name=${nameList}&idBoard=${idBoard}&key=f9669717296754d072e61e0f236945f7&token=ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127`,
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