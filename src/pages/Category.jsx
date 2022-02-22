import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore"
import { db } from "../firebase.config.js"

import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"

const Category = () => {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const [ lastFetchedListing , setLastFetchedListing] = useState(null)
  const params = useParams()

  useEffect(() => {
      const fetchListings = async () => {
      try {
        const listingsRef = collection(db, "listings")
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(1) ,
        )
        
        const querySnapshot = await getDocs(q)
        const lastVisible = querySnapshot.docs[ querySnapshot.docs.length - 1]
        setLastFetchedListing( lastVisible )
        
        const listings = []

        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(listings)
        setLoading(false)
      } catch (error) {
        toast.error("error while fetching listings")
      }
    }

    fetchListings()
  }, [params.categoryName])
  
  
    const onFetchMoreListings = async () => {
      try {
        const listingsRef = collection(db, "listings")
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(1) ,
          startAfter(lastFetchedListing)
        )
        

        const querySnapshot = await getDocs(q)
        const lastVisible = querySnapshot.docs[ querySnapshot.docs.length - 1]
        setLastFetchedListing( lastVisible )


        
        const listings = []

        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })

        setListings(prevState => [...prevState , ...listings])
        setLoading(false)
      } catch (error) {
        toast.error("error while fetching listings")
      }
    }
    

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id}  key={listing.id} />
              ))}
            </ul>
          </main>
          
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>
            Load More
            </p>
          )}
        </>
      ) : (
        <>
          <p>No Listing for {params.categoryName}</p>
        </>
      )}
    </div>
  )
}

export default Category
