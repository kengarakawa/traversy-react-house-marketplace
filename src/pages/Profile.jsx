import { getAuth , updateProfile} from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate , Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { updateDoc , doc } from 'firebase/firestore'
import {db} from '../firebase.config'

const Profile = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  
  const [changeDetails , setChangeDetails] = useState(false) 

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  
  const { name , email } = formData
  
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  
  const onChange = (e) => {
    setFormData( (prevData) => ({
      ...formData , 
      [e.target.id] : e.target.value 
      
    }))
          
  }
  
  const onSubmit = async () => {
    try {
      
      if(auth.currentUser.displayName !== name ) {        
        await updateProfile( auth.currentUser , {
          displayName : name 
        } )        
      }
      
      // update in firestore
      const userRef = doc( db , 'users' , auth.currentUser.uid )
      await updateDoc( userRef , {
        name 
      })
      
    } catch(error) {
      toast.error('Error while precessing request') 
    }
  }

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        
        <button className="logOut" type="button" onClick={onLogout}>Logout</button>
      </header>
      
      
      <main><div className="profileDetailsHeader">
      <p className="profileDetailsText">
      Personal Details
      </p>
      
      <p className="changePersonalDetails" onClick={()=> {
        changeDetails && onSubmit()
        setChangeDetails( prevState => !prevState)
        
      }}>
       {changeDetails ? 'done' : 'change'}
      </p>
      </div>
      
      <div className="profileCard">
      <form >
        <input type="text" id="name" className={ !changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails} value={name} onChange={onChange}/>
        <input type="email" id="email" className={ !changeDetails ? 'profileEmail' : 'profileEmailActive'}  disabled={!changeDetails} value={email} onChange={onChange}/>
      </form>
      </div>
      
      </main>
      
      <h1>Profile</h1>
    </div>
  )
}

export default Profile
