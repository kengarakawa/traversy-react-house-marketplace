import { getAuth } from 'firebase/auth'
import { useEffect , useState } from 'react'

const Profile = () => {
  const [ user, setUser ] = useState(null)
  const auth = getAuth()  
  
  useEffect( () => {
    console.log(auth.currentUser)
    setUser(auth.currentUser)
  }, [])
  
  
  return user ? (
    <h1>{user.displayName}</h1>
  ) : 
  (
    <div>
      <h1>Not Login</h1>
    </div>
  )
}

export default Profile
