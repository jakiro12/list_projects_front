import { useState } from 'react';
import '../styles-components.css';

export default function ListCurrentProjects({ currentData, setActionType, deleteAnyProjects }) {
    const [openModal, setOpenModal] = useState(Array(currentData.length).fill(false));

    const handleOpenModal = (index) => {
        const newModals = [...openModal];
        newModals[index] = true;
        setOpenModal(newModals);
    };
    const setIndexProject=(position)=>{
        localStorage.setItem('indexArr',position)
        setActionType('update')
    }
    const deleteProject=(index)=>{
        let updateData = [...currentData];
        updateData.splice(index, 1);
        deleteAnyProjects([updateData])
    }
    return (
        <section className='list-projects_container'>
            <div className='list-projects-header'>
                    <span>Project Info</span>
                    <span>Project Manager</span>
                    <span>Assigned To</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>
            { currentData?.map((project, index) => (
                <div key={index} className='list-projects_container-boxes'>
                    <div>
                        <article className='list-projects_container-boxes-modal' style={{ display: openModal[index] ? 'block' : 'none' }}>
                            <div 
                                onClick={() =>setIndexProject(index) }>&#9998; Edit</div>
                            <div 
                                onClick={()=>deleteProject(index)}>&#10006; Delete</div>
                        </article>
                        <div className='list-projects_data-name'>
                            <p style={{ fontWeight: '500' }}>{project.projectName}</p>
                            <small style={{ color: '#0000004d' }}>Creation date: 09/09/2020 10:30 am</small>
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
        </section>
    );
}
