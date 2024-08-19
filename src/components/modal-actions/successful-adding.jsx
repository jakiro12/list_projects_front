import '../styles-components.css'

export default function AlertForProjectAdd({actionMessage}){
    return(
        <div className='modal_successful-add'>
            <span >
                {actionMessage === '' ? 'Proyecto asignado!' : actionMessage}                
            </span>
            {actionMessage === '' ? <progress max={100} value={100} style={{marginTop:'auto'}}/> : null}                            
        </div>
    )
}