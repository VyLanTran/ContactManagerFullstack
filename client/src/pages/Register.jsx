import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        try {
            const res = await axios.post("http://localhost:3001/register", {
                email,
                password,
            });
            navigate(`/${res.data["id"]}/contacts`)
        }
        catch (error) {
            setMessage(error.response.data["message"])
        }
    }


    return (
        <div className='w-full h-screen flex flex-col items-center'>
            <div className='fixed w-[450px] h-[580px] border border-gray-300   mt-[30px]'>

                <div className='w-[320px] mx-auto py-10'>
                    <div className='flex justify-between text-[20px] pb-12'>
                        <Link to='/register'><div className='font-bold'>Register</div></Link>
                        <Link to='/'><div className='text-gray-500'>Login</div></Link>
                    </div>

                    <div className='mb-10 flex items-center justify-center '>
                        <a href="https://github.com/VyLanTran/ContactManagerFullstack"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer', fontSize: '16px' }}>Github code</a>
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
                            <button type='submit' className='bg-[#55c7d4] py-3 my-6 rounded-[20px] font-bold'>Register</button>
                            <div className='flex justify-between items-center text-sm'>
                                <p className='text-white'>A</p>
                            </div>
                        </form>
                    </div>
                    <div className='text-xs flex flex-col justify-center items-center pt-[120px]'>Privacy &nbsp;&nbsp;&nbsp; Terms &nbsp;&nbsp;&nbsp; About</div>
                </div>
            </div>
        </div>
    )
}

