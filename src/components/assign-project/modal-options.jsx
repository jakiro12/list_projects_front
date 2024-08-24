import React, { useState } from 'react';
import '../styles-components.css';
import GetCredentialsToAssign from './get-auth/get-auth-credentials';
export const ContextApi=React.createContext()
export default function OptionsAviableToTrello(){
    const [boardAuth,setBoardAuth]=useState(null)
   
    let tabValues;
    
    return(
        <ContextApi.Provider value={{boardAuth,setBoardAuth}}>
        <section className='options_assign_container'>
            <article>
                <header className='assign-container_options'>Ingresar credenciales de Trello</header>
                <GetCredentialsToAssign/>
            </article>
        </section>
        </ContextApi.Provider>
    )
}