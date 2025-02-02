import React from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react'


export default function Register() {

    const {addUser} = useContext(UserContext)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    // ====> To Handle form submission
  const  handleSubmit = (e) => {
    e.preventDefault();
    if(password !== repeatPassword)
    {
      alert("Password doesn't match!!")
    }

     addUser(name, email, password)
     
    };
  return (
    <div>
    <section className="bg-neutral-900 text-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
                        Create An Account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Username</label>
                            <input type="text" name="username" id="username"
                            value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Input a unique username!" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                            <input type="email" name="email" id="email" 
                            value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                            <input type="password" name="password" id="password" 
                            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <div>
                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">Confirm password</label>
                            <input type="password" name="confirm-password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} id="confirm-password" placeholder="••••••••" className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Account</button>
                        <p className="text-sm font-light">
                            Already have an account? <Link  to="/login" className="font-medium text-primary-600 hover:underline">Login here</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</div>
  )
}