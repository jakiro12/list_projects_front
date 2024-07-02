import '../styles-components.css'
export default function NavBarForOptions({setActionType, typeAction}){
    return(
        <nav className="nav-bar_container">
            <div>Logo</div>
            <div>
                { typeAction === null ? <aside className='nav-bar_section-landing'>
                    <p>My projects</p>
                    <button
                        onClick={()=>setActionType('add')}
                    >+ Add Project</button>
                </aside>: <button
                        className='nav-bar_btn-back'
                        onClick={()=>setActionType(null)}
                >&#10094;Back
                <span style={{fontWeight:'bold'}}>{typeAction === 'add' ? 'Add Project' : 'Edit Project'}</span>
                </button>}
                
            </div>
        </nav>
    )
}