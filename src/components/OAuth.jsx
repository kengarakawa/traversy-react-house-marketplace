import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config.js"
import { toast } from "react-toastify"

import googleIcon from "../assets/svg/googleIcon.svg"

const OAuth = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onGoogleClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)

      const user = result.user

      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)

      // not exists, Sign up
      if (!docSnap.exists()) {
        setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp,
        })
      }
      navigate("/")
    } catch (error) {
      console.log(error)
      toast.error(error.stringify())
    }
  }

  return (
    <div className="socialLogin">
      <p> {location.pathname === "/sign-up" ? "Sign Up" : "Sing In"} with </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="googel" />
      </button>
    </div>
  )
}

export default OAuth
