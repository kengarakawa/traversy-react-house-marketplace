import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Explore from './pages/Explore'
import Category from './pages/Category'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Listing from './pages/Listing'
import Contact from './pages/Contact'

import ForgotPassword from './pages/ForgotPassword'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'

import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar'


import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <>
    <Router>      
      <Routes >
        <Route path="/" exact element={<Explore />} />
        
        
        <Route path="/offers" element={<Offers />} />
        <Route path="/category/:categoryName" exact element={<Category />} />
        <Route path="/category/:categoryName/:listingId" exact element={<Listing />} />
                
        
        <Route path="/profile" element={<PrivateRoute  />} >
          <Route path="/profile" element={<Profile />} />                    
        </Route>
        <Route path="/sign-in"  element={<Signin />} />
        <Route path="/sign-up"  element={<Signup />} />
        <Route path="/forgot-password"  element={<ForgotPassword />} />
        <Route path="/create-listing"  element={<CreateListing />} />
        <Route path="/edit-listing/:listingId"  element={<EditListing />} />
        <Route path="/contact/:landlordId"  element={<Contact  />} />
        
      </Routes>
      
      <NavBar />
    </Router>
    
    <ToastContainer 
     position="top-center" 
     autoClose={3000}
    >
    </ToastContainer>
    
    </>
  );
}

export default App;
