import Link from 'next/link'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

export default function Navbar() {
    return (
        <div className='flex justify-between items-center p-4 '>
            <div className='text-3xl font-bold w-1/6'>
                logo
            </div>
            <div className='flex gap-4 text-xl w-3/6 justify-around'>
                <Link href="/">Home</Link>
                <Link href="/books">Books</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/order/status">Track order</Link>
            </div>
            <div className='relative w-2/6 border border-gray-300 rounded'>
                <input type="text"  className='w-full h-full p-2'/>
                <FaSearch className='absolute right-2 top-1/2 -translate-y-1/2'/>
            </div>
        </div>
    )
}
