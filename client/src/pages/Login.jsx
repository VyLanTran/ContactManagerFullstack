import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        try {
            const res = await axios.post("http://localhost:3001/", {
                email,
                password,
            });
            navigate(`/${res.data["id"]}/contacts`)
        }
        catch (error) {
            setMessage(error.response.data["message"])
            // console.log(error)
        }
    }

    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <div className='fixed w-[450px] h-[580px] border border-gray-300   mt-[30px]'>

                <div className='w-[320px] mx-auto py-10'>
                    <div className='flex justify-between text-[20px] pb-24'>
                        <Link to='/register'><div className='text-gray-500'>Register</div></Link>
                        <Link to='/'><div className='font-bold'>Login</div></Link>
                    </div>
                    <div>
                        {message ? <p className='py-3 text-red-600'>{message}</p> : null}
                        <form onSubmit={handleSubmit} className='flex flex-col'>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg mb-4 block h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                type="email"
                                placeholder='Email'
                                autoComplete='email' />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                type="password"
                                placeholder='Password'
                                autoComplete='current-password' />
                            <button className='bg-[#55c7d4] py-3 my-6 rounded-[20px] font-bold'>Login</button>
                            <div className='flex justify-between items-center text-sm'>
                                <p><input className='mr-2' type="checkbox" />Remember me</p>
                                <p className='text-[#55c7d4]'>Forgot password?</p>
                            </div>
                        </form>
                    </div>
                    <div className='text-xs flex flex-col justify-center items-center pt-[150px]'>Privacy &nbsp;&nbsp;&nbsp; Terms &nbsp;&nbsp;&nbsp; About</div>
                </div>
            </div>
        </div>
    )
}

