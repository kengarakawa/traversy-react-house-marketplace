import { useRef, useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"

import Spinner from "../components/Spinner"

const CreateListing = () => {
  const [loading, setLoading] = useState(false)
  const [geoLocationEnabled, setGeolocationEnabled] = useState(true)
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  })

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData

  const navigate = useNavigate()
  const auth = getAuth()
  const isMounted = useRef(true)

  const onSubmit = (e) => {
    e.preventDefault()
  }
  
  const onMutate = (e) => {
    
  }

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid })
        } else {
          navigate("/sign-in")
        }
      })
    }

    return () => {
      isMounted.current = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted])

  return loading ? (
    <Spinner />
  ) : (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label className="formLabel">Sale /Rent</label>
          <div className="formButtons">
            <button
              type="button"
              className={type === "sale" ? "formButtonActive" : "formButton"}
              id="type"
              value="sale"
              onClick={onMutate}
            >
              Sell
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default CreateListing
