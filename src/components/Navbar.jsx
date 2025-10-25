import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-around bg-violet-800 px-10 py-4 md:text-2xl text-sm'>
            <span className='hover:font-bold cursor-pointer w-1/2'>iTask</span>
            <ul className='flex w-1/2'>
                <li className='hover:font-bold cursor-pointer w-1/2'>Home</li>
                <li className='hover:font-bold cursor-pointer w-1/2'>Your Task</li>
            </ul>
        </nav>
    )
}

export default Navbar