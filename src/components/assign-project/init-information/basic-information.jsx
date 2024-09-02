import { useContext } from "react";
import { ContextApi } from "../modal-options";

export default function GetBasicInformationBoard(){
    const { initData } = useContext(ContextApi);
    return(
        <div className="general_user_information-container">
            <p>
              Nombre del propietario: {initData.fullName}
            </p>
            <p>
                usuario de trello:{initData.username}
            </p>
            <p>
                email:{initData.email}
            </p>
        </div>
    )
}