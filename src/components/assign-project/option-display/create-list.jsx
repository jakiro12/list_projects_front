export default function CreateNewListWithData(){
    return(
        <div className="new_list-container">
            <p>
            Crear una nueva lista con sus datos
            </p>
            <form action="">
                <label htmlFor="">
                    Agrege el nuevo nombre de la lista
                </label>
                <input type="text" />
            </form>
        </div>
    )
}