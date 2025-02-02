import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export default function Login() {

    const {login} = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // ====> To Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault(); 

     login(email, password)

    };

  return (
    <div>
    <section className="bg-neutral-900 text-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
            <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Your email</label>
                            <input type="email" name="email" value={email}  onChange={(e) => setEmail(e.target.value)} id="email" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder="••••••••" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                        <p className="text-sm font-light">
                            Don't have an account yet? <Link to="/register" href="#" className="font-medium text-primary-600 hover:underline">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}