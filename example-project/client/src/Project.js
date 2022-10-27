import { useParams } from 'react-router-dom'
import React, {useEffect, useState} from "react";
import Images from './Images';
import { useHistory } from 'react-router-dom'
import './Project.css'
import NavigationBar from "./NavigationBar";



function Project(){
    const { id } = useParams()
    const [ project, setProject ] = useState([])
    const [ userData, setUserData ] = useState({username: "", project_id: id})
    const [ errors , setErrors] = useState([])
    const [ collaborators, setCollaborators ] = useState([])
    const [ showCollab, setShowCollab ] = useState(false)
    const [ images, setImages ] = useState([])
    const history = useHistory()
    const [colors, setColors] = useState ({red: "", green: "", blue: ""})
    const [colorBox, setColorBox] = useState("#D3D3D3")
    // const [ showCollab, setShowCollab ] = useState([])
    
       
            document.documentElement.style.setProperty('--color-one', project.red )
            document.documentElement.style.setProperty('--color-two', project.green )
            document.documentElement.style.setProperty('--color-three', project.blue ) 
       
   

    useEffect(() => {
        fetch(`/projects/${id}`)
        .then(res => res.json())
        .then(project => {
        setProject(project)
        
        // project.users.map((user) => {
           
        //     setCollaborators([...collaborators, user.username])
        //     console.log(user.username)
        // })
        setCollaborators(project.users)
        setImages(project.images)
        })
      }, [])

    function editColor (e) {
        setColorBox(e.target.value)
        var compColors = require('complementary-colors');
         const chosenColor = new compColors(e.target.value)
         const colorArray = chosenColor.primary()
         const c = colorArray[0] 

        setColors({red: c.r, green: c.g, blue: c.b})
    }

    function patchColor () {
            fetch(`/projects/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json" 
                    },
                    body: JSON.stringify(colors)
                })
                .then(res => res.json())
                .then(data => console.log(data))
               
        }
    
    
      const updateImages = (image) => {
        setImages([...images, image])
      }

     const handleChange = (event) => {
        const name = event.target.name
        let value = event.target.value

        setUserData({...userData, [name]: value})
     }



     async function handleSubmit (event) {
        event.preventDefault()
       
        const response = await fetch('/user_projects', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (response.ok){
            console.log("Collab created:", data);
            setErrors([])
           
            let newUser = { username: userData.username}
            setCollaborators([...collaborators, newUser])
            setUserData({...userData})
            setShowCollab(false)
        } else {
          setErrors(data.errors);
        }

     }

     const deleteProject = (id) => {
        fetch(`/projects/${id}`, {
            method: "DELETE",
        }).then((res) => {
            history.push('/projects')
        })
    }   
   


    function handleLogout(){
        history.push(`/`)
    }
    function handleDelete(){
        fetch("/logout", {
            method: "DELETE",
        })
        .then((r) => r.json())
        .then(data => {console.log(data)
        handleLogout()})
    }

    return(
        <div className = "projectCont">
        <div>
        <NavigationBar handleDelete={handleDelete}/>
            {/* <div> <img className ="navImage" src ="https://i.postimg.cc/7PRHmXfx/Visualize-logo.png"/> </div> */}
            <div className = "topPage">
            <h1 className = "heading">{project.name}</h1>
            <div>
                <Images images={images} projectId={project.id} updateImages={updateImages}/>
            </div>
            </div>
            <div className= "bottomPage">
            <button class = "btn-primary" onClick={() => setShowCollab(true)}>Add Collaborators</button>
            <div>
                {showCollab ?
                <div>  
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="username" value={userData.username} onChange={handleChange} placeholder="Username"/>
                        <input type="submit" value="Add"/>
                    </form>
                    {errors.map((err) => (
                        <p key={err} style={{ color: "red" }}>
                            {err}
                        </p>
                    ))}
                </div>
                : null }
            </div>
            <div className = "descript">
            <h5>{project.description}</h5>
            <p>Collaborators:{collaborators.map((user) => `${user.username} `)}</p>
            </div>
            <div className = "colorDelete">
                
                <input onChange = {editColor} type="color" id ="input" name = "color" value={colorBox}  className="color" ></input>
                <button class = "btn-primary" onClick={patchColor}> Edit Color </button>
                <button  class = "btn-primary" onClick={() => deleteProject(project.id)}>Delete</button> 
            </div>
        </div>
        </div>
        </div>
    )
}


export default Project;