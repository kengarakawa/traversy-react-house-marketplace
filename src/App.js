import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'

import NavBar from './components/NavBar'


function App() {
  return (
    <>
    <Router>      
      <Routes >
        <Route path="/" exact element={<Explore />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/profile" element={<Signin />} />
        <Route path="/sign-in"  element={<Signin />} />
        <Route path="/sign-up"  element={<Signup />} />
        <Route path="/forgot-password"  element={<ForgotPassword />} />
      </Routes>
      
      <NavBar />
    </Router>
    
    {/* NavBar */}
    
    </>
  );
}

export default App;
