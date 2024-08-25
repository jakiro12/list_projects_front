import React, { useState } from 'react';
import '../styles-components.css';
import GetCredentialsToAssign from './get-auth/get-auth-credentials';
import ChooseOptionToAssign from './choose-place/choose-assigment';
import DataListToUpdate from './option-display/update-list-data';
import CreateNewListWithData from './option-display/create-list';
export const ContextApi=React.createContext()
export default function OptionsAviableToTrello(){
    const [boardAuth,setBoardAuth]=useState(null)
    const [actionOpt,setActionOpt]=useState(null)
    let tabValues;
    const handleSetActionOption=(value)=>{
        setActionOpt(value)
    }
    switch (actionOpt) {
        case 'update':
            tabValues=<DataListToUpdate/>
            break;
        case 'newList':
            tabValues=<CreateNewListWithData/>
            break;
        default:
            tabValues='elegir algo'
            break;
    }
    return(
        <ContextApi.Provider value={{boardAuth,setBoardAuth}}>
        <section className='options_assign_container'>
           {boardAuth === null ? <article>
                <header className='assign-container_auth'>Ingresar credenciales de Trello</header>
                <GetCredentialsToAssign/>
            </article>
                :
            <article >
                <ChooseOptionToAssign 
                    setActionOpt={handleSetActionOption}
                    actionOpt={actionOpt}
                />
                <main className='current_actions_assign-container'>
                    {tabValues}
                </main>
            </article>
            }
        </section>
        </ContextApi.Provider>
    )
}