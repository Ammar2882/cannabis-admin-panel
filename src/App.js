
import DashboardHeroSection from "./components/major-components/DashboardHeroSection";
import { Signup } from "./screen/Signup";
import { Login } from "./screen/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SideAndNavbar } from "./components/major-components/SideAndNavbar";
import { Products } from './components/major-components/Products'
import { Orders } from "./components/major-components/Orders";
import { Drivers } from "./components/major-components/Drivers";
import { Tax } from "./components/major-components/Tax";
import { Radius } from "./components/major-components/Radius";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "./redux/Actions/ProfileActions";
import { useJsApiLoader} from "@react-google-maps/api";
import { Account } from "./components/major-components/Account";
const places = ["places"]
function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyASE7MqDo7TNZ_4fmORznk_JMBFm0d_pKY',
    libraries: places,
  });
  const dispatch = useDispatch()
  const token = useSelector(
    (state) => state.ProfileReducer
  );
  useEffect(() => {
    getToken()
  })
  const getToken = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(adminLogin(token))
    }
  }
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path='/' element={<Signup />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/' element={localStorage.getItem('token') ? <SideAndNavbar /> : <Login />} >
            <Route index element={<DashboardHeroSection />} />
            <Route path='products' element={<Products />} />
            <Route path='orders' element={<Orders />} />
            <Route path='drivers' element={<Drivers />} />
            <Route path='tax' element={<Tax />} />
            <Route path='radius' element={<Radius />} />
            {/* <Route path='account' element={<Account />} /> */}
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
