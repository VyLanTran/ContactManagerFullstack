import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className='bg-[#0f1a28] h-[64px] flex items-center justify-between px-7 w-full fixed top-0 z-10'>
            {/* <Link to='/'> */}
                <h1 className='text-[#55c7d4] font-bold text-md md:text-lg lg:text-2xl'>CONNECT</h1>
            {/* </Link> */} 

            <div>
                <Link to='/'><button className='text-white text-sm pr-4'>Login</button></Link>
                <Link to='/register'><button className='bg-[#55c7d4] text-sm px-6 py-2 rounded'>Register</button></Link>
            </div>
        </div>

    )
}


