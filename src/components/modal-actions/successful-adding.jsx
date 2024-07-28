import '../styles-components.css'

export default function AlertForProjectAdd(){
    return(
        <div className='modal_successful-add'>
            <span >
                Agregaste un proyecto!
            </span>
            <progress max={100} value={100} style={{marginTop:'auto'}}/>
        </div>
    )
}