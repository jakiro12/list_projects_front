import AlertForProjectAdd from '../modal-actions/successful-adding';
import '../styles-components.css'
import { regexPatterns } from '../../utils/regex-form';
import { useState, useEffect } from 'react';
export default function AddNewProject({newProjectData,setCurrentProjectData,onFormSubmit}){
    const [alertAction,setAlertAction]=useState(false)
    const [messageAlert, setMessageAlert]=useState('')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProjectData({...newProjectData,[name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(regexPatterns.checkProjectName.test(newProjectData.projectName) === false){
            setMessageAlert('Solo nombres de 5 a 15 letras')
            setAlertAction(true)
            return
        }
        if(regexPatterns.checkDescription.test(newProjectData.description) === false){
            setMessageAlert('Debe contener entre 5 y 30 caracteres')
            setAlertAction(true)
            return
        }
        console.log(newProjectData)
        onFormSubmit(newProjectData)
        setCurrentProjectData({
            projectName: '',
            description: '',
            projectManager: '',
            assignedTo: '',
            status: ''
        });
        setAlertAction(true)
    };
     useEffect(()=>{
        setTimeout(() => {
            setAlertAction(false)
        },4000);
        return () => clearTimeout()
    },[alertAction])
    return(
        <section className='add-project_container'>
            {alertAction === false ? null : <AlertForProjectAdd actionMessage={messageAlert}/>}
        <form onSubmit={handleSubmit}>
            <div className='add-project_form_sections'>
                <label htmlFor="projectName">Project Name</label>
                <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={newProjectData.projectName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={newProjectData.description}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="projectManager">Project Manager</label>
                <select
                    id="projectManager"
                    name="projectManager"
                    value={newProjectData.projectManager}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a person</option>
                    <option value="manager1">Manager 1</option>
                    <option value="manager2">Manager 2</option>
                </select>
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="assignedTo">Assigned To</label>
                <select
                    id="assignedTo"
                    name="assignedTo"
                    value={newProjectData.assignedTo}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a person</option>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                </select>
            </div>
            <div className='add-project_form_sections'>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    value={newProjectData.status}
                    onChange={handleInputChange}
                    required
                >
                    <option value="">Select a status</option>
                    <option value="enabled" >Enabled</option>
                    <option value="disabled">Disabled</option>
                </select>
            </div>
            <div className='add-project_form_sections_submit'>
                <button type="submit">Create Project</button>
            </div>
        </form>
    </section>
    )
}