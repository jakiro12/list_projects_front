import '../../styles-components.css'
export default function ChooseOptionToAssign({setActionOpt,actionOpt}){
    return(
        <header className='header_assign-options_container'>
            <button
                style={{opacity:actionOpt !== 'update' ? 0.5 : 1}}
                onClick={()=>setActionOpt('update')}
            >Update List</button>
            <button
                style={{opacity:actionOpt !== 'newList' ? 0.5 : 1}}
                onClick={()=>setActionOpt('newList')}
            >New List</button>
        </header>
    )
}