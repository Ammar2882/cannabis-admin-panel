import { Link } from "react-router-dom"
import logo from '../assets/nav-logo.svg'
export const Login = () => {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-lg text-black w-full">
                    <img className='w-12 mx-auto' src={logo} alt="logo" />
                    <h1 className="mb-8 text-md my-4 text-center text-2xl">SIGN IN</h1>
                    <h2 className="text-sm my-2.5">Email</h2>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="email"
                        placeholder="Email" />
                    <h2 className="text-sm my-2.5">Password</h2>
                    <input
                        type="password"
                        className="block border border-grey-light w-full p-2 rounded mb-4"
                        name="password"
                        placeholder="Password" />

                    <button
                        type="submit"
                        className="w-full text-center py-2 rounded bg-[#E9C95D] hover:bg-green-dark focus:outline-none my-1"
                    >Login</button>

                    <div className="text-left text-sm text-grey-dark mt-4 my-4">
                        Do not  have an account? <span className="text-blue-600"><Link to='/'>Sign Up</Link></span>

                    </div>
                </div>
            </div>
        </div>
    )
}