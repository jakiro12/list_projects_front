import { useState,useEffect } from 'react';
import '../styles-components.css';

export default function ListCurrentProjects({ currentData, setActionType, deleteAnyProjects,assignCurrentProject }) {
    const [openModal, setOpenModal] = useState(Array(currentData.length).fill(false));
    const currentDate = new Date();
    const formatCurrentDay = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
   
    const dateData = formatCurrentDay.format(currentDate);
    const handleOpenModal = (index) => {
        if(openModal[index]=== false){
            const newModals = [...openModal];
            newModals[index] = true;
            setOpenModal(newModals);
        }else{
            const newModals = [...openModal];
            newModals[index] = false;
            setOpenModal(newModals);
        }
    };
    const setIndexProject=(position)=>{
        localStorage.setItem('indexArr',position)
        setActionType('update')
    }
    const deleteProject=(index)=>{
        let updateData = [...currentData];
        updateData.splice(index, 1);
        deleteAnyProjects([updateData])
        const newModals = [...openModal];
        newModals[index] = false;
        setOpenModal(newModals);
    }
    const handleAssigProject=(index)=>{
        assignCurrentProject()
        let fullSelectedData=Object.assign({index:index},currentData[index])        
        localStorage.setItem('assignProject',JSON.stringify(fullSelectedData))
    }
    useEffect(()=>{
        const projectAssigned=JSON.parse(localStorage.getItem('indexAssigned'))
        if(projectAssigned !== null){           
            deleteProject(projectAssigned.indexValue)
            localStorage.removeItem('indexAssigned')
        }else{
            console.log('no se agrego u no se selecciono')
        }
    })
    return (
        <section className='list-projects_container'>
            <div className='list-projects-header'>
                    <span>Informacion</span>
                    <span>Project Manager</span>
                    <span>Asignado a</span>
                    <span>Estado</span>
                    <span>Accion</span>
                </div>
                <aside className='list-projects_container-aside' style={{overflowY: currentData.length > 5 ? 'scroll': 'hidden'}}>
                    { currentData?.map((project, index) => (
                        <div key={index} className='list-projects_container-boxes'>
                            <div>
                                <article className='list-projects_container-boxes-modal' style={{ display: openModal[index] ? 'block' : 'none' }}>
                                <div 
                                        style={{cursor:'pointer'}}
                                        onClick={()=>handleAssigProject(index)}
                                        >&#10004; Asignar</div>
                                    <div 
                                        style={{cursor:'pointer'}}
                                        onClick={() =>setIndexProject(index) }>&#9998; Editar</div>
                                    <div 
                                        style={{cursor:'pointer'}}
                                        onClick={()=>deleteProject(index)}>&#10006; Borrar</div>
                                </article>
                                <div className='list-projects_data-name'>
                                    <p style={{ fontWeight: '500' }}>{project.projectName}</p>
                                    <small style={{ color: '#0000004d' }}>Creation date:{dateData}</small>
                                </div>
                                <div className='list-projects_data-extra'>
                                        <span></span>
                                        {project.projectManager}</div>
                                <div className='list-projects_data-extra'>
                                        <span></span>
                                    {project.assignedTo}</div>
                                <button className='list-projects_data-status'>{project.status}</button>
                                <button onClick={() => handleOpenModal(index)} className='list-projects_container-boxes_edit-projects'>
                                    . . .
                                </button>
                            </div>
                            <div>
                                <span className='list-projects_container-boxes_photo'></span>
                                <p>Ignacio Tuffa</p>
                            </div>
                        </div>            
                    ))  }
                </aside>
        </section>
    );
}
