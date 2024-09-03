
import { useState } from 'react'
import './App.css'
import NavBarForOptions from './components/nav-bar/nav-bar-options'
import AddNewProject from './components/add-project/add-new-project';
import EditCurrentProject from './components/edit-project/edit-project';
import ListCurrentProjects from './components/list-projects/list-projects';
import EmptyListProjects from './components/empty-list/empty-list';
import OptionsAviableToTrello from './components/assign-project/modal-options';
function App() {
  const[action,setAction]=useState(null)
  const[currentProjects,setCurrentProjects]=useState([])
  const [projectData, setProjectData] = useState({
    projectName: '',
    description: '',
    projectManager: '',
    assignedTo: '',
    status: ''
});
const[assignProject,setAssignProject]=useState(false)



const handleAddNewProjects=(newProjectAddIt)=>{
  setCurrentProjects([...currentProjects,newProjectAddIt])
}
let content;
const handleSetActionType=(value)=>{
    setAction(value)
  }
const handleEditedProjects=(data)=>{
  setCurrentProjects([...data].flat())
}
const handleDeleteProjects=(data)=>{
  setCurrentProjects([...data].flat())
}
const handleAssignProject=()=>{
  setAssignProject(true)
}
  switch (action) {
    case 'add':
      content=<AddNewProject 
                newProjectData={projectData}
                setCurrentProjectData={setProjectData}
                onFormSubmit={handleAddNewProjects}/>
      break;
    case 'update':
      content=<EditCurrentProject 
                projectToEdit={currentProjects}
                setCurrentEdited={handleEditedProjects}
                setActionType={handleSetActionType}
                />
      break;
    default:
      content=currentProjects.length === 0 ? <EmptyListProjects/> : 
                                    <ListCurrentProjects 
                                          currentData={currentProjects}
                                          setActionType={handleSetActionType}
                                          deleteAnyProjects={handleDeleteProjects}
                                          assignCurrentProject={handleAssignProject}
                                          />
      break;
  }
  

  return (
    <>
    {
      assignProject === false ? 
      <div className='container-page'>
        <NavBarForOptions 
           setActionType={handleSetActionType}
           typeAction={action}
           />
        <div>
            {content}
        </div>
      </div>
      :
      <div className='container-page_assign'>
        <span style={{position:'fixed',top:'30px',left:'50%',transform: 'translate(-50%, -50%)',fontSize:'20px',cursor:'pointer'}}
          onClick={()=>setAssignProject(false)}
        >Volver al panel</span>
        <OptionsAviableToTrello/>
      </div>
    }      
    </>
  )
}

export default App
