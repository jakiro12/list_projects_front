import '../styles-components.css'

export default function AlertForProjectAdd({actionMessage}){
    return(
        <div className='modal_successful-add'>
            <span >
                {actionMessage === '' ? 'Agregaste un proyecto!' : actionMessage}                
            </span>
            <progress max={100} value={100} style={{marginTop:'auto'}}/>
        </div>
    )
}