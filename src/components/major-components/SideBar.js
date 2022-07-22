import logo from '../../assets/nav-logo.svg'
// import { ReactComponent as dashboardHome } from '../../assets/dashboard-home.svg'
import dashboardHome from '../../assets/dashboard-home.svg'
import product from '../../assets/product.svg'
import order from '../../assets/order.svg'
import driver from '../../assets/driver.svg'
import customer from '../../assets/customer.svg'
import category from '../../assets/category.svg'
import account from '../../assets/account.svg'
import salesPromotion from '../../assets/sales-promotion.svg'
import storeLocator from '../../assets/store-locator.svg'
import websiteSetting from '../../assets/website-setting.svg'
import logout from '../../assets/logout.svg'
import { IconBg } from '../minor-components/IconBg'
import rightArrow from '../../assets/right-arrow.svg'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'


const SideBar = () => {
    const navigate = useNavigate()
    const sidebarData = [
        {
            title: 'Dashboard',
            path: '/',
            svg: dashboardHome,


        },
        {
            title: 'Products',
            path: '/products',
            svg: product,

        },
        {
            title: 'Orders',
            path: '/orders',
            svg: order,

        },
        {
            title: 'Drivers',
            path: '/drivers',
            svg: driver
        },
        {
            title: 'Tax',
            path: '/tax',
            svg: category
        },
        // {
        //     title: 'Customers',
        //     path: '/customers',
        //     svg: customer
        // },
        // {
        //     title: 'Sales-Promotions',
        //     path: '/salespromotions',
        //     svg: salesPromotion
        // },
        // {
        //     title: 'Account',
        //     path: '/account',
        //     svg: account
        // },
        {
            title: 'Radius',
            path: '/radius',
            svg: storeLocator
        },
        // {
        //     title: 'Website Setting',
        //     path: '/websitesettings',
        //     svg: websiteSetting
        // },
        {
            title: 'Logout',
            path: '/logout',
            svg: logout
        }
    ]

    return (
        <>

            <div style={{ scrollbarWidth: 'thin' }} className=' shadow-xl bg-white fixed overflow-y-auto scroll-thin top-0 h-full left-0 w-[18%] 
             md:hidden'>
                <div className=' h-24 bg-gray-50 flex justify-center items-center p-0 m-0'>
                    <img className='mx-auto mt-0 w-14' src={logo} alt='logo' />
                </div>
                <ul className='flex flex-col'>
                    {sidebarData.map((item, index) => (
                        <li key={index} className={` font-semibold p-5 flex justify-between items-center cursor-pointer`}>
                            <IconBg svg={item.svg} />
                            <div className='flex-1 flex justify-between items-center flex-shrink-0 pl-[20%] text-xs'>
                                {item.path === '/logout' ? (
                                    <p className='text-gray-800' onClick={()=>{
                                        localStorage.removeItem('token')
                                        navigate('/login')
                                    }}>{item.title}</p>
                                ):(
                                <NavLink end to={item.path}   className={({ isActive }) => (isActive ? 'text-myBg' : 'text-gray-800')}>
                                     {item.title}
                                </NavLink>
                                )}
                            
                                <img className='w-[5px]' src={rightArrow} alt='rightarrow' />
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}
export default SideBar