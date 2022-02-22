import { useState, useEffect } from "react"
import { useParams, useSearchParams  } from "react-router-dom"

import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"

const Contact = () => {
  const [message, setMessage] = useState("")
  const [landlord, setLandlord] = useState(null)

  const [searchParams, ] = useSearchParams()
  const params = useParams()
  
  searchParams.forEach((item ,  key) => {
      console.log(item  , key)
  })

  useEffect(() => {
    const fetchLandlord = async () => {
        
       console.log(params.landlordId) 
      const docRef = doc(db, "users", params.landlordId)
      const docSnapshot = await getDoc(docRef)

      if (docSnapshot.exists()) {
        setLandlord(docSnapshot.data())
      } else {
        toast.error("Could not load landlord info")
      }
    }
    fetchLandlord()
  }, [params.landlordId])
  
  
  const onChange = (e) => {
      setMessage(e.target.value)
  }

  return (
    <div className="pageContainer">
      <header className="pageHeader">Contact Landlord</header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
            <label htmlFor="message" className="messageLabel">Message</label>
            
            <textarea name="message" id="message" className="textarea" value={message} onChange={onChange}></textarea>
            
            </div>
                <a href={`mailto:${landlord.email}?subject=${searchParams.get('listingName')}&body=${message}}`}>
                <button type="button" className="primaryButton">Send Message</button>
                </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
