
import { useState,useEffect } from 'react'
import './App.css'
import NavBarForOptions from './components/nav-bar/nav-bar-options'
import AddNewProject from './components/add-project/add-new-project';
import EditCurrentProject from './components/edit-project/edit-project';
import ListCurrentProjects from './components/list-projects/list-projects';
import EmptyListProjects from './components/empty-list/empty-list';
import { getAuthData } from './utils/urls-trello-api';
import OptionsAviableToTrello from './components/assign-project/modal-options';
//token test
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

const myownApiKey='f9669717296754d072e61e0f236945f7'
const myTestToken='ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127'

useEffect(()=>{
  const fetchData = async () => {
    try {
      const urlApi=`https://api.trello.com/1/boards/66c430b8bab73f67189077db/cards?key=f9669717296754d072e61e0f236945f7&token=ATTAfe4ce7ced8dee969dcad5b24eb679dbe96f8eba33881914bb0af30658c3b130a29B05127`
      const data=await fetch(urlApi,{
       method: 'GET'        
      })
      if (!data.ok) {
          throw new Error(`HTTP error! Status: ${data.status}`);
      }
       const response=await data.json()
       console.log(response)
       return response
     } catch (error) {
       throw error
     }      
  };
  //fetchData();
})
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
        >Volver</span>
        <OptionsAviableToTrello/>
      </div>
    }      
    </>
  )
}

export default App
