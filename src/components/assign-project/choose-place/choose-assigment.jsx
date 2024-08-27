import '../../styles-components.css'
export default function ChooseOptionToAssign({setActionOpt,actionOpt}){
    return(
        <header className='header_assign-options_container'>
            <button
                style={{opacity:actionOpt !== 'update' ? 0.5 : 1,border:actionOpt !== 'update' ? 'none' : '1px solid black'}}
                onClick={()=>setActionOpt('update')}
            >Update List</button>
            <button
                style={{opacity:actionOpt !== 'newList' ? 0.5 : 1,border:actionOpt !== 'newList' ? 'none' : '1px solid black'}}
                onClick={()=>setActionOpt('newList')}
            >New List</button>
            <button
                style={{opacity:actionOpt !== 'checkCards' ? 0.5 : 1,border:actionOpt !== 'checkCards' ? 'none' : '1px solid black'}}
                onClick={()=>setActionOpt('checkCards')}
            >Cards</button>
        </header>
    )
}