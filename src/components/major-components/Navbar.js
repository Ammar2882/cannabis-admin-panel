import { IconBgRound } from '../minor-components/IconBgRound'
import search from '../../assets/search.svg'
import notification from '../../assets/notification.svg'
import mail from '../../assets/mail.svg'
import cart from '../../assets/cart.svg'
import profile from '../../assets/profile.png'
export const Navbar = () => {
    return (
        <div className="w-[82%] ml-[18%] fixed top-0 bg-white flex  items-center z-10">
            <div className="flex w-full justify-between px-8 py-6 items-center">
                <div className="flex items-center w-60">
                    <li className='block z-10 mr-[-40px] hover:cursor-pointer'>
                        <IconBgRound svg={search} bg="bg-myBg" />
                    </li>
                    <input className="h-10 pl-14 bg-blue-50 rounded-full w-full text-xs outline-0  hover:outline-0 focus:outline-none " type="text" name="search" placeholder="search here..." />
                </div>
                <div className="flex items-center justify-around">
                    <li className='block mx-4 hover:cursor-pointer'>
                        <IconBgRound svg={notification} bg="bg-blue-50" />
                    </li>
                    <li className='block mx-4 hover:cursor-pointer'>
                        <IconBgRound svg={mail} bg="bg-blue-50" />
                    </li>
                    <li className='block mx-4 hover:cursor-pointer'>
                        <IconBgRound svg={cart} bg="bg-blue-50" />
                    </li>
                    <li className='block ml-4 flex items-center'>
                        <p className='block h-12 w-[2px] bg-blue-50 mr-8'>
                        </p>
                        <img className="w-12 hover:cursor-pointer" src={profile} alt="nav" />
                    </li>
                </div>
            </div>
        </div>
    )
}