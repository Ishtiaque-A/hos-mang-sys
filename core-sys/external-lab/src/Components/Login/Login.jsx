import { useContext, useState } from 'react';
import logo from '../../../public/logo.png';
import { authContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
    const {setLoggedIn} = useContext(authContext)
    const navigate = useNavigate();
    const pass = "123456";
    const email = 'admin@gmail.com';
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    })
    const handleLogin = (e)=>{
        e.preventDefault();
        if(userInput.email === email && userInput.password === pass){
            setLoggedIn(true);
            navigate('/upload-report');
        }else {
            toast.error('Invalid Credentials', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }
    return (
        <div>
            <ToastContainer />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-20 w-auto"
                        src={logo}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                                    className="block w-full rounded-md ps-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-[#69b128] focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div> */}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                                    className="block w-full ps-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 focus:outline-none ring-inset ring-[#69b128] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#69b128] sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#69b128] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#69b128] focus-visible:outline focus-visible:outline-2 focus-visible:outline--2 focus-visible:outline-[#69b128]"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Start a 14 day free trial
                        </a>
                    </p> */}
                </div>
            </div>
        </div>
    )
}
