import { useContext } from "react";
import { ContextApi } from "../modal-options";

export default function GetBasicInformationBoard(){
    const { initData } = useContext(ContextApi);
    return(
        <div>
            <p>
              Nombre del propietario: {initData.fullName}
            </p>
            <p>
                usuario de trello:{initData.username}
            </p>
            <p>
                email del propietario:{initData.email}
            </p>
            informacion de ingreso{console.log(initData)}
        </div>
    )
}