
import DashboardHeroSection from "./components/major-components/DashboardHeroSection";
import { Signup } from "./screen/Signup";
import { Login } from "./screen/Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { SideAndNavbar } from "./components/major-components/SideAndNavbar";
import { Products } from './components/major-components/Products'
import { Orders } from "./components/major-components/Orders";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path='main' element={<SideAndNavbar />} >
            <Route index element={<DashboardHeroSection />} />
            <Route path='products' element={<Products />} />
            <Route path='orders' element={<Orders />} />
          </Route>
        </Routes>
      </Router>

    </>
  );
}

export default App;
