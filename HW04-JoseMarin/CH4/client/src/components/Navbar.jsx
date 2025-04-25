import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {

    const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-4'>
        <Link to={'/'}>
            <p>CYBER4</p>
        </Link>

        <div className='flex items-center gap-2 sm:gap-5'>
            <button onClick={()=> navigate('/login')} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer'>Log in</button> 
        </div>
        

    </div>

  )
}

export default NavBar