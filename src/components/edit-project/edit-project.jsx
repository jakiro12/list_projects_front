import '../styles-components.css';

export default function EditCurrentProject({ projectToEdit, setCurrentEdited, setActionType}) {
    let currentProjectToEditPosition = localStorage.getItem('indexArr'); // posición de objeto dentro del arr
    let projectData = {
        projectName: projectToEdit[currentProjectToEditPosition].projectName,
        description: projectToEdit[currentProjectToEditPosition].description,
        projectManager: projectToEdit[currentProjectToEditPosition].projectManager,
        assignedTo: projectToEdit[currentProjectToEditPosition].assignedTo,
        status: projectToEdit[currentProjectToEditPosition].status,
    };

    
    const setCurrentProjectData=(value,name)=>{
        projectData[name]=value
    }
    const editSelectedProject = (e) => {
        e.preventDefault();
        let updateData = [...projectToEdit];
        updateData.splice(currentProjectToEditPosition, 1);
        updateData.splice(currentProjectToEditPosition, 0, projectData);
        setCurrentEdited([updateData])
        setActionType(null)
    };

    return (
        <section className='add-project_container'>
            <form onSubmit={editSelectedProject}>
                <div className='add-project_form_sections'>
                    <label htmlFor="projectName">Nombre del proyecto</label>
                    <input
                        placeholder={projectToEdit[currentProjectToEditPosition].projectName}
                        type="text"
                        name="projectName"
                        onChange={(e)=>setCurrentProjectData(e.target.value,"projectName")}
                        required
                    />
                </div>
                <div className='add-project_form_sections'>
                    <label htmlFor="description">Descripcion</label>
                    <input
                        placeholder={projectToEdit[currentProjectToEditPosition].description}
                        type="text"
                        name="description"
                        onChange={(e)=>setCurrentProjectData(e.target.value,"description")}
                        required
                    />
                </div>
                <div className='add-project_form_sections'>
                    <label htmlFor="projectManager">Project Manager</label>
                    <select
                        name="projectManager"
                        onChange={(e)=>setCurrentProjectData(e.target.value,"projectManager")}                        
                        required
                    >
                        <option value="">{projectToEdit[currentProjectToEditPosition].projectManager}</option>
                        <option value="manager1">Manager 1</option>
                        <option value="manager2">Manager 2</option>
                    </select>
                </div>
                <div className='add-project_form_sections'>
                    <label htmlFor="assignedTo">Asignar persona</label>
                    <select
                        name="assignedTo"
                        onChange={(e)=>setCurrentProjectData(e.target.value,"assignedTo")}
                        required
                    >
                        <option value="">{projectToEdit[currentProjectToEditPosition].assignedTo}</option>
                        <option value="user1">User 1</option>
                        <option value="user2">User 2</option>
                    </select>
                </div>
                <div className='add-project_form_sections'>
                    <label htmlFor="status">Estado</label>
                    <select
                        name="status"
                        onChange={(e)=>setCurrentProjectData(e.target.value,"status")}
                        required
                    >
                        <option value="">{projectToEdit[currentProjectToEditPosition].status}</option>
                        <option value="enabled">Habilitar</option>
                        <option value="disabled">Dishabilitar</option>
                    </select>
                </div>
                <div className='add-project_form_sections_submit'>
                    <button type="submit">Actualizar</button>
                </div>
            </form>
        </section>
    );
}
